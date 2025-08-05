import { IonContent, IonPage } from '@ionic/react';
import HomeElements from '../components/HomeElements';
import ToolbarSection from '../components/ToolbarSection';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="home-content">
          <HomeElements />
          <ToolbarSection />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
