import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import AIComponent from '../components/ai/AIComponent';
import { useBackButton } from '../hooks/useBackButton';

const AIPage: React.FC = () => {
  // Handle hardware back button navigation
  useBackButton();

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <div className="w-full h-full bg-[#E0E0E0] px-4 pb-24 text-lg text-[#333] pt-16">
          <AIComponent />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AIPage;


