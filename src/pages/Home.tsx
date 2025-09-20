import { IonContent, IonHeader, IonPage, IonTitle } from '@ionic/react';
import HomeElements from '../components/home/HomeElements';
import { useBackButton } from '../hooks/useBackButton';

const Home: React.FC = () => {
  // Handle hardware back button to close app when on home route
  useBackButton();

  return (
    <IonPage>
      {/* <IonHeader>
        <IonTitle>
        hola
        </IonTitle>
      </IonHeader> */}
      <IonContent scrollY={false}>
        <div className="w-full h-full bg-[#E0E0E0] px-4 pb-24 text-lg text-[#333] pt-16">
          <HomeElements />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
