declare global {
  interface Window {
    cordova?: {
      InAppBrowser?: {
        open: (url: string, target?: string, options?: string) => any;
        close: () => void;
        show: () => void;
        hide: () => void;
        executeScript: (script: { code?: string; file?: string }) => Promise<any>;
        insertCSS: (css: { code?: string; file?: string }) => Promise<any>;
      };
    };
  }
}

export {}; 