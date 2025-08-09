import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import AIComponent from '../components/AIComponent';
import './Home.css';

const AIPage: React.FC = () => {
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


