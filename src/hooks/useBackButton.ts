import { useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';
import { useLocation, useHistory } from 'react-router-dom';
import { inAppBrowserService } from '../services/InAppBrowserService';

export const useBackButton = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    let listener: PluginListenerHandle;

    const addListener = async () => {
      listener = await CapacitorApp.addListener('backButton', () => {
        if (location.pathname === '/home') {
          CapacitorApp.exitApp();
        } else {
          history.goBack();
        }
      });
    };

    addListener();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [location.pathname, history]);

  const handleInAppBrowserBack = () => {
    inAppBrowserService.close();
  };

  return { handleInAppBrowserBack };
};
