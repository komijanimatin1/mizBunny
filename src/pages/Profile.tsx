import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useBackButton } from '../hooks/useBackButton';
import './Home.css';

const Profile: React.FC = () => {
  // Handle hardware back button navigation
  useBackButton();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="home-content">
          <div className="content-container">
            <div className="content-slide slide-in">
              <div className="profile-placeholder">پروفایل</div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;


