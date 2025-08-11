import { IonContent, IonPage } from '@ionic/react';
import HomeElements from '../components/HomeElements';
import { useBackButton } from '../hooks/useBackButton';
import './Home.css';

const Home: React.FC = () => {
  // Handle hardware back button to close app when on home route
  useBackButton();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="home-content">
          <div className="content-container">
            <div className="content-slide slide-in">
              <HomeElements />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
