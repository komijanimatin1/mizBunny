import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import AIComponent from '../components/ai/AIComponent';
import { useBackButton } from '../hooks/useBackButton';

const AIPage: React.FC = () => {
  // Handle hardware back button navigation
  useBackButton();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="w-full h-full bg-[#E0E0E0] p-4 pb-32 text-lg text-[#333] flex flex-col relative overflow-hidden">
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform transform translate-x-0">
              <AIComponent />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AIPage;


