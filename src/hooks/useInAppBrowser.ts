import { useState, useCallback, useEffect } from 'react';
import { inAppBrowserService } from '../services/InAppBrowserService';

export const useInAppBrowser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  const openBrowser = useCallback(async (
    url: string, 
    target: string = '_blank', 
    options: string = 'location=yes'
  ) => {
    setIsLoading(true);
    setError(null);
    setPageLoaded(false);
    try {
      const result = await inAppBrowserService.open(url, target, options);
      // attach loadstop handler
      try {
        inAppBrowserService.onLoadStop((u?: string) => {
          setPageLoaded(true);
          setIsLoading(false);
        });
      } catch {}
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

  // When browser exits, navigate to home (web fallback handled in service)
  useEffect(() => {
    try {
      inAppBrowserService.onExit(() => {
        // no-op here; navigation handled by caller if needed
      });
    } catch {}
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
    error,
    pageLoaded
  };
}; 