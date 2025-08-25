import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import { useAuthStore } from '../stores/authStore';
import UserDetails from '../components/profile/UserDetails';
import ProfileMenu from '../components/profile/ProfileMenu';



const Profile: React.FC = () => {
  // Handle hardware back button navigation
  useBackButton();
  const { user, isAuthenticated, logout } = useAuthStore();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.replace('/splash');
  };

  if (!isAuthenticated || !user) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <div className="w-full h-full bg-[#E0E0E0] p-4 text-lg text-[#333]">
            <div className="bg-white w-full h-[calc(100%-theme(spacing.14))] p-4 rounded-2xl flex items-center justify-center pb-28 mt-16">
              <div className="text-xl font-semibold text-[#666]">برای مشاهده پروفایل وارد شوید</div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="w-full h-full bg-[#E0E0E0] p-4 pb-28 text-lg text-[#333]">
          <div className="bg-white w-full h-[calc(100%-theme(spacing.14))] pt-0 px-4 rounded-2xl overflow-auto [&::-webkit-scrollbar]:hidden flex flex-col gap-4 pb-4 mt-16">
            <UserDetails />
            <ProfileMenu onLogout={handleLogout} />
          </div>
        </div>
      </IonContent>
      
    </IonPage>
  );
};

export default Profile;


