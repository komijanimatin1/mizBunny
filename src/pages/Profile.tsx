import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import { useAuthStore } from '../stores/authStore';

const getInitials = (first?: string, last?: string) => {
  const f = (first || '').trim();
  const l = (last || '').trim();
  if (!f && !l) return '؟';
  const fi = f ? f[0] : '';
  const li = l ? l[0] : '';
  return `${fi}${li}` || fi || li;
};

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
            <div className="bg-white w-full h-[calc(100%-theme(spacing.14))] mt-14 p-4 rounded-2xl flex items-center justify-center">
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
          <div className="bg-white w-full h-[calc(100%-theme(spacing.14))] mt-14 p-4 rounded-2xl overflow-auto [&::-webkit-scrollbar]:hidden flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center text-xl font-bold text-[#4B5563] border border-[#E5E7EB]">
                {getInitials(user.name, user.lastName)}
              </div>
              <div className="flex-1">
                <div className="text-xl font-bold">{user.name} {user.lastName}</div>
                <div className="text-sm text-[#6B7280]">@{user.username}</div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px]">
              <div className="rounded-xl border border-[#F1F1F1] p-3">
                <div className="text-xs text-[#9CA3AF] mb-1">ایمیل</div>
                <div className="font-medium break-all">{user.email || '-'}</div>
              </div>
              <div className="rounded-xl border border-[#F1F1F1] p-3">
                <div className="text-xs text-[#9CA3AF] mb-1">شماره تماس</div>
                <div className="font-medium">{user.phoneNumber || '-'}</div>
              </div>
              <div className="rounded-xl border border-[#F1F1F1] p-3">
                <div className="text-xs text-[#9CA3AF] mb-1">سمت</div>
                <div className="font-medium">{user.position || '-'}</div>
              </div>
              <div className="rounded-xl border border-[#F1F1F1] p-3">
                <div className="text-xs text-[#9CA3AF] mb-1">نقش‌ها</div>
                <div className="font-medium">{user.roles?.length ? user.roles.join(', ') : '-'}</div>
              </div>
              <div className="rounded-xl border border-[#F1F1F1] p-3 sm:col-span-2">
                <div className="text-xs text-[#9CA3AF] mb-1">Bucket</div>
                <div className="font-medium break-all">{user.bucketName || '-'}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2.5 rounded-xl hover:bg-red-600 active:scale-[0.99] transition"
              >
                خروج از حساب
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;


