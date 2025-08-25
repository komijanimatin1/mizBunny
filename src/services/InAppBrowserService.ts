export class InAppBrowserService {
  private browserRef: any = null;
  private loadStoppedCallback: ((url?: string) => void) | null = null;
  private exitCallback: (() => void) | null = null;

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
              if (this.exitCallback) this.exitCallback();
            });
          } catch {
            /* no-op */
          }

          try {
            this.browserRef.addEventListener('loadstop', (e: any) => {
              console.log('InAppBrowser: Load completed', e && e.url);
              if (this.loadStoppedCallback) this.loadStoppedCallback(e && e.url);
            });
          } catch {
            /* no-op */
          }
          
        } else {
          console.warn('InAppBrowser not available, opening in new tab');
          // Fall back to window.open but keep a reference so we can close it later
          try {
            // window.open returns a Window | null
            this.browserRef = window.open(url, target) as any;
            resolve(this.browserRef);
            // if we opened a window fallback, attach unload handler to simulate exit
            try {
              if (this.browserRef && typeof this.browserRef.addEventListener === 'function') {
                this.browserRef.addEventListener('unload', () => {
                  this.browserRef = null;
                  if (this.exitCallback) this.exitCallback();
                });
              }
            } catch {}
          } catch (err) {
            // If popup blocked or other error, still resolve null
            console.warn('Failed to open fallback window:', err);
            this.browserRef = null;
            resolve(null);
          }
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

  /**
   * Open hidden and resolve when the reference is created. Use onLoad to be notified when loadstop occurs.
   */
  openHidden(url: string, target: string = '_blank', options: string = 'location=yes,hidden=yes,footer=yes,footertitle=سرویس,footercolor=#F0F0F0,closebutton=yes,closebuttoncolor=#5d5d5d,footerheight=86'): Promise<any> {
    return this.open(url, target, options);
  }

  onLoadStop(cb: (url?: string) => void) {
    this.loadStoppedCallback = cb;
  }

  onExit(cb: () => void) {
    this.exitCallback = cb;
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