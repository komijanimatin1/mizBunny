import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useTranslations } from 'next-intl';
import { useBackButton } from '../hooks/useBackButton';
import { useAuthStore } from '../stores/authStore';
import UserDetails from '../components/profile/UserDetails';
import ProfileMenu from '../components/profile/ProfileMenu';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Preferences } from '@capacitor/preferences';
import { useInAppBrowser } from '../hooks/useInAppBrowser';
// ClearData plugin (cordova-plugin-clear-data) is exposed as a global
declare const ClearData: {
  cache: (success?: () => void, error?: (err: string) => void) => void;
};



const Profile: React.FC = () => {
  // Handle hardware back button navigation
  const t = useTranslations('auth');
  const { openBrowser, closeBrowser } = useInAppBrowser();
  useBackButton();
  const { user, isAuthenticated, logout } = useAuthStore();
  const history = useHistory();

  async function resetAppDataSimple() {
    try {
      console.log('[RESET] شروع پاک‌سازی داده‌ها...');
  
      // پاک کردن localStorage
      localStorage.clear();
  
      // پاک کردن sessionStorage
      sessionStorage.clear();
  
      // پاک کردن IndexedDB
      if (window.indexedDB && indexedDB.databases) {
        try {
          const dbs = await indexedDB.databases();
          for (const db of dbs) {
            if (db.name) {
              await new Promise((resolve, reject) => {
                const request = indexedDB.deleteDatabase(db.name!);
                request.onsuccess = () => resolve(true);
                request.onerror = () => reject();
                request.onblocked = () => reject();
              });
            }
          }
        } catch (err) {
          console.warn('[RESET] IndexedDB پاک نشد یا پشتیبانی نمی‌شود', err);
        }
      }
  
      console.log('[RESET] تمام داده‌ها پاک شد.');
      
      // clear webview cache and persistent data via native plugin when available
      openBrowser('about:blank', '_blank', 'clearcache=yes,clearsessioncache=yes,cleardata=yes');
      closeBrowser();

    } catch (error) {
      console.error('[RESET] خطا در فرآیند پاک‌سازی:', error);
    }
  }
  
  const handleLogout = () => {
    logout();
    // clear webview cache and persistent data via native plugin when available
    try {
      if (typeof ClearData !== 'undefined' && ClearData.cache) {
        ClearData.cache(() => {
          console.info('[CLEARDATA] native cache cleared');
        }, (err) => {
          console.warn('[CLEARDATA] failed to clear native cache', err);
        });
      }
    } catch (err) {
      console.warn('[CLEARDATA] plugin not available or error invoking it', err);
    }

    resetAppDataSimple();
    Preferences.clear();
    history.replace('/splash');
  };

  if (!isAuthenticated || !user) {
    return (
      <IonPage>
        <IonContent>
          <div className="w-full h-full bg-[#E0E0E0] p-4 text-lg text-[#333]">
            <div className="bg-white w-full h-[calc(100%-4rem)] p-4 rounded-2xl flex items-center justify-center pb-28">
              <div className="text-xl font-semibold text-[#666]">{t('loginRequired')}</div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  

  return (
    <IonPage>
      <IonContent>
        <div className="w-full h-full bg-[#E0E0E0] p-4 pb-24 text-lg text-[#333] pt-16">
          <div className="bg-white w-full h-full pt-0 px-4 rounded-2xl overflow-auto [&::-webkit-scrollbar]:hidden flex flex-col gap-4 pb-4">
            <UserDetails />
            <div className="flex justify-end py-2">
              <LanguageSwitcher />
            </div>
            <ProfileMenu onLogout={handleLogout} />
          </div>
        </div>
      </IonContent>
      
    </IonPage>
  );
};

export default Profile;


