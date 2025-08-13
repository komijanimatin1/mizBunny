import { IonContent, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [logoAnimation, setLogoAnimation] = useState(false);

  useEffect(() => {
    // Start logo animation after a small delay
    const logoTimer = setTimeout(() => {
      setLogoAnimation(true);
    }, 100);

    // Start fade out after logo animation completes
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Increased to 2 seconds for smoother animation

    // Complete the splash screen after fade out
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2300); // 2.3 seconds total

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <IonPage className={`bg-white fixed top-0 left-0 w-full h-full z-[9999] transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <IonContent fullscreen className="flex items-center justify-center h-screen w-screen" style={{ '--background': 'white' } as any}>
        <div className="flex flex-col items-center justify-center text-center w-full h-full">
          <div className={`flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
            logoAnimation 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-20 opacity-0'
          }`}>
            <img 
              src="/room-logo.png" 
              alt="اتاق ديجيتال" 
              className="max-w-[200px] h-auto block md:max-w-[150px] sm:max-w-[120px]"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen; 