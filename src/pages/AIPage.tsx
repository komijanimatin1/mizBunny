import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import AIComponent from '../components/AIComponent';
import { useBackButton } from '../hooks/useBackButton';
import './Home.css';

const AIPage: React.FC = () => {
  // Handle hardware back button navigation
  useBackButton();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="home-content">
          <div className="content-container">
            <div className="content-slide slide-in">
              <AIComponent />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AIPage;


