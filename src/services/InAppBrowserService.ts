export class InAppBrowserService {
  private browserRef: any = null;

  /**
   * Opens a URL in the InAppBrowser
   * @param url - The URL to open
   * @param target - The target ('_blank', '_self', '_system')
   * @param options - Browser options (location, toolbar, etc.)
   * @returns Promise that resolves when the browser is ready
   */
  open(url: string, target: string = '_blank', options: string = 'location=yes'): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (typeof window !== 'undefined' && window.cordova && window.cordova.InAppBrowser) {
          this.browserRef = window.cordova.InAppBrowser.open(url, target, options);
          
          // Add event listeners
          this.browserRef.addEventListener('loadstart', () => {
            console.log('InAppBrowser: Load started');
          });

          this.browserRef.addEventListener('loadstop', () => {
            console.log('InAppBrowser: Load completed');
            resolve(this.browserRef);
          });

          this.browserRef.addEventListener('loaderror', (event: any) => {
            console.error('InAppBrowser: Load error', event);
            reject(new Error(`Failed to load URL: ${event.message}`));
          });

          this.browserRef.addEventListener('exit', () => {
            console.log('InAppBrowser: Browser closed');
            this.browserRef = null;
          });

        } else {
          // Fallback for web development
          console.warn('InAppBrowser not available, opening in new tab');
          window.open(url, target);
          resolve(null);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Closes the InAppBrowser
   */
  close(): void {
    if (this.browserRef) {
      this.browserRef.close();
      this.browserRef = null;
    }
  }

  /**
   * Shows the InAppBrowser (if hidden)
   */
  show(): void {
    if (this.browserRef) {
      this.browserRef.show();
    }
  }

  /**
   * Hides the InAppBrowser
   */
  hide(): void {
    if (this.browserRef) {
      this.browserRef.hide();
    }
  }

  /**
   * Executes JavaScript in the InAppBrowser
   * @param script - The script to execute (either file path or code)
   * @param callback - Optional callback function
   */
  executeScript(script: { file?: string; code?: string }, callback?: (result: any) => void): void {
    if (this.browserRef) {
      this.browserRef.executeScript(script, callback);
    }
  }

  /**
   * Inserts CSS into the InAppBrowser
   * @param css - The CSS to insert (either file path or code)
   * @param callback - Optional callback function
   */
  insertCSS(css: { file?: string; code?: string }, callback?: (result: any) => void): void {
    if (this.browserRef) {
      this.browserRef.insertCSS(css, callback);
    }
  }

  /**
   * Checks if InAppBrowser is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && 
           !!window.cordova && 
           !!window.cordova.InAppBrowser;
  }
}

// Export a singleton instance
export const inAppBrowserService = new InAppBrowserService(); 