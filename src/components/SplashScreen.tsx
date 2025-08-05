import { IonContent, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Small delay for fade out animation
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <IonPage className={`splash-screen ${isVisible ? 'visible' : 'fade-out'}`}>
      <IonContent fullscreen className="splash-content">
        <div className="splash-container">
          <div className="logo-container">
            <img 
              src="/room-logo.png" 
              alt="اتاق ديجيتال" 
              className="splash-logo"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen; 