import { IonContent, IonPage } from '@ionic/react';
import HomeElements from '../components/home/HomeElements';
import { useBackButton } from '../hooks/useBackButton';

const Home: React.FC = () => {
  // Handle hardware back button to close app when on home route
  useBackButton();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="w-full h-full bg-[#E0E0E0] p-4 pb-28 text-lg text-[#333]">
          <HomeElements />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
