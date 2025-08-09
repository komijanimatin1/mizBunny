import { IonContent, IonPage } from '@ionic/react';
import HomeElements from '../components/HomeElements';
import './Home.css';

const Home: React.FC = () => {
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
