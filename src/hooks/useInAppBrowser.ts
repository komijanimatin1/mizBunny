import { useState, useCallback } from 'react';
import { inAppBrowserService } from '../services/InAppBrowserService';

export const useInAppBrowser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openBrowser = useCallback(async (
    url: string, 
    target: string = '_blank', 
    options: string = 'location=yes'
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await inAppBrowserService.open(url, target, options);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to open browser';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const closeBrowser = useCallback(() => {
    inAppBrowserService.close();
  }, []);

  const showBrowser = useCallback(() => {
    inAppBrowserService.show();
  }, []);

  const hideBrowser = useCallback(() => {
    inAppBrowserService.hide();
  }, []);

  const executeScript = useCallback((script: { file?: string; code?: string }) => {
    inAppBrowserService.executeScript(script);
  }, []);

  const insertCSS = useCallback((css: { file?: string; code?: string }) => {
    inAppBrowserService.insertCSS(css);
  }, []);

  const isAvailable = useCallback(() => {
    return inAppBrowserService.isAvailable();
  }, []);

  return {
    openBrowser,
    closeBrowser,
    showBrowser,
    hideBrowser,
    executeScript,
    insertCSS,
    isAvailable,
    isLoading,
    error
  };
}; 