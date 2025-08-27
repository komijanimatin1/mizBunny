import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import AIComponent from '../components/ai/AIComponent';
import { useBackButton } from '../hooks/useBackButton';

const AIPage: React.FC = () => {
  // Handle hardware back button navigation
  useBackButton();

  return (
    <IonPage>
      <IonContent scrollY={false} fullscreen>
        <div className="w-full h-full bg-[#E0E0E0] p-4 pb-28 text-lg text-[#333]">
          <AIComponent />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AIPage;


