import { useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { useLocation, useHistory } from 'react-router-dom';

export const useBackButton = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    let backButtonListener: any;

    const setupBackButton = async () => {
      const handleBackButton = () => {
        // If we're on the home route, exit the app immediately
        if (location.pathname === '/home') {
          CapacitorApp.exitApp();
        } else {
          // For other routes, navigate back to home
          history.push('/home');
        }
      };

      // Register the back button listener
      backButtonListener = await CapacitorApp.addListener('backButton', handleBackButton);
    };

    setupBackButton();

    // Cleanup function to remove the listener
    return () => {
      if (backButtonListener && backButtonListener.remove) {
        backButtonListener.remove();
      }
    };
  }, [location.pathname, history]);
};
