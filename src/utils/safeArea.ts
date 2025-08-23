/**
 * Safe Area Detection and Fallback Utilities
 * Provides cross-device safe area support for Samsung and other Android devices
 */

interface SafeAreaValues {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

class SafeAreaManager {
  private static instance: SafeAreaManager;
  private safeAreaValues: SafeAreaValues = { top: 0, bottom: 0, left: 0, right: 0 };

  private constructor() {
    this.initializeSafeArea();
    this.setupEventListeners();
  }

  public static getInstance(): SafeAreaManager {
    if (!SafeAreaManager.instance) {
      SafeAreaManager.instance = new SafeAreaManager();
    }
    return SafeAreaManager.instance;
  }

  private initializeSafeArea(): void {
    // Try to get safe area values from CSS environment variables
    const top = this.getSafeAreaValue('safe-area-inset-top');
    const bottom = this.getSafeAreaValue('safe-area-inset-bottom');
    const left = this.getSafeAreaValue('safe-area-inset-left');
    const right = this.getSafeAreaValue('safe-area-inset-right');

    this.safeAreaValues = { top, bottom, left, right };

    // Set CSS custom properties for fallback
    this.setCSSVariables();
    
    // Log detected values for debugging
    console.log('Safe Area Values:', this.safeAreaValues);
  }

  private getSafeAreaValue(property: string): number {
    // Try multiple methods to get safe area values
    const methods = [
      () => this.getCSSEnvValue(property),
      () => this.getCSSConstantValue(property),
      () => this.getIonicSafeAreaValue(property),
      () => this.getDeviceSpecificFallback(property)
    ];

    for (const method of methods) {
      try {
        const value = method();
        if (value > 0) {
          return value;
        }
      } catch (error) {
        console.warn(`Failed to get ${property} using method:`, error);
      }
    }

    return 0;
  }

  private getCSSEnvValue(property: string): number {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(`env(${property})`);
    return parseInt(value) || 0;
  }

  private getCSSConstantValue(property: string): number {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(`constant(${property})`);
    return parseInt(value) || 0;
  }

  private getIonicSafeAreaValue(property: string): number {
    const ionProperty = property.replace('safe-area-inset-', 'ion-safe-area-');
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${ionProperty}`);
    return parseInt(value) || 0;
  }

  private getDeviceSpecificFallback(property: string): number {
    // Device-specific fallbacks
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (property.includes('top')) {
      // Samsung One UI and Android devices
      if (userAgent.includes('samsung') || userAgent.includes('android')) {
        return 24; // Default Android status bar height
      }
      // iOS devices
      if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        return 44; // Default iOS status bar height
      }
    }
    
    if (property.includes('bottom')) {
      // Samsung One UI and Android devices
      if (userAgent.includes('samsung') || userAgent.includes('android')) {
        return 24; // Default Android navigation bar height
      }
      // iOS devices
      if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        return 34; // Default iOS home indicator height
      }
    }

    return 0;
  }

  private setCSSVariables(): void {
    const root = document.documentElement;
    
    // Set fallback safe area values
    root.style.setProperty('--safe-area-top-fallback', `${this.safeAreaValues.top}px`);
    root.style.setProperty('--safe-area-bottom-fallback', `${this.safeAreaValues.bottom}px`);
    root.style.setProperty('--safe-area-left-fallback', `${this.safeAreaValues.left}px`);
    root.style.setProperty('--safe-area-right-fallback', `${this.safeAreaValues.right}px`);
    
    // Set enhanced safe area values
    root.style.setProperty('--safe-area-top', `${this.safeAreaValues.top}px`);
    root.style.setProperty('--safe-area-bottom', `${this.safeAreaValues.bottom}px`);
    root.style.setProperty('--safe-area-left', `${this.safeAreaValues.left}px`);
    root.style.setProperty('--safe-area-right', `${this.safeAreaValues.right}px`);
  }

  private setupEventListeners(): void {
    // Listen for orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.initializeSafeArea(), 100);
    });

    // Listen for resize events
    window.addEventListener('resize', () => {
      this.initializeSafeArea();
    });

    // Listen for visual viewport changes (keyboard appearance)
    if ('visualViewport' in window) {
      (window as any).visualViewport.addEventListener('resize', () => {
        this.initializeSafeArea();
      });
    }
  }

  public getSafeArea(): SafeAreaValues {
    return { ...this.safeAreaValues };
  }

  public getTop(): number {
    return this.safeAreaValues.top;
  }

  public getBottom(): number {
    return this.safeAreaValues.bottom;
  }

  public getLeft(): number {
    return this.safeAreaValues.left;
  }

  public getRight(): number {
    return this.safeAreaValues.right;
  }

  public updateSafeArea(): void {
    this.initializeSafeArea();
  }
}

// Export singleton instance
export const safeAreaManager = SafeAreaManager.getInstance();

// Export utility functions
export const getSafeArea = () => safeAreaManager.getSafeArea();
export const getSafeAreaTop = () => safeAreaManager.getTop();
export const getSafeAreaBottom = () => safeAreaManager.getBottom();
export const getSafeAreaLeft = () => safeAreaManager.getLeft();
export const getSafeAreaRight = () => safeAreaManager.getRight();
export const updateSafeArea = () => safeAreaManager.updateSafeArea();

// Export default instance
export default safeAreaManager;
