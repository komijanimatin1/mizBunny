import { IonContent, IonPage } from '@ionic/react';
import HomeElements from '../components/HomeElements';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="home-content">
          <HomeElements />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
