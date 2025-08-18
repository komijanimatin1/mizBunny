import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useBackButton } from '../hooks/useBackButton';
import { useAuthStore } from '../stores/authStore';

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
          <div className="w-full h-full bg-[#E0E0E0] p-4 pb-24 text-lg text-[#333] flex flex-col relative overflow-hidden">
            <div className="flex-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform transform translate-x-0">
                <div className="flex items-center justify-center h-full">
                  <div className="text-2xl font-semibold text-[#333]">پروفایل</div>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="w-full h-full bg-[#E0E0E0] p-4 pb-24 text-lg text-[#333] flex flex-col relative overflow-hidden">
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform transform translate-x-0">
              <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
                <h2 className="text-2xl font-semibold mb-4">پروفایل</h2>
                <div className="space-y-2 text-sm">
                  <div><strong>Full name:</strong> {user.name} {user.lastName}</div>
                  <div><strong>Username:</strong> {user.username}</div>
                  <div><strong>Email:</strong> {user.email}</div>
                  <div><strong>Phone:</strong> {user.phoneNumber}</div>
                  <div><strong>Position:</strong> {user.position}</div>
                  <div><strong>Roles:</strong> {user.roles?.join(', ')}</div>
                  <div><strong>Bucket:</strong> {user.bucketName}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  خروج از حساب
                </button>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;


