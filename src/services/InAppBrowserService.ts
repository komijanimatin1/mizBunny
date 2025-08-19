export class InAppBrowserService {
  private browserRef: any = null;

  open(url: string, target: string = '_blank', options: string = 'location=yes'): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (typeof window !== 'undefined' && window.cordova && window.cordova.InAppBrowser) {
          this.browserRef = window.cordova.InAppBrowser.open(url, target, options);
          // Resolve immediately so callers can attach listeners (e.g., 'message')
          // before any early events (like toolbar back) are fired.
          resolve(this.browserRef);

          // Keep useful listeners for logging/cleanup
          try {
            this.browserRef.addEventListener('exit', () => {
              console.log('InAppBrowser: Browser closed');
              this.browserRef = null;
            });
          } catch {
            /* no-op */
          }

          try {
            this.browserRef.addEventListener('loadstop', (e: any) => {
              console.log('InAppBrowser: Load completed', e && e.url);
            });
          } catch {
            /* no-op */
          }
          
        } else {
          console.warn('InAppBrowser not available, opening in new tab');
          window.open(url, target);
          resolve(null);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  close(): void {
    if (this.browserRef) {
      this.browserRef.close();
      this.browserRef = null;
    }
  }

  show(): void {
    if (this.browserRef) {
      this.browserRef.show();
    }
  }

  hide(): void {
    if (this.browserRef) {
      this.browserRef.hide();
    }
  }

  executeScript(script: { file?: string; code?: string }, callback?: (result: any) => void): void {
    if (this.browserRef) {
      this.browserRef.executeScript(script, callback);
    }
  }

  insertCSS(css: { file?: string; code?: string }, callback?: (result: any) => void): void {
    if (this.browserRef) {
      this.browserRef.insertCSS(css, callback);
    }
  }

  isAvailable(): boolean {
    return typeof window !== 'undefined' && 
           !!window.cordova && 
           !!window.cordova.InAppBrowser;
  }
}

export const inAppBrowserService = new InAppBrowserService(); 