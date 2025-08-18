export * from './cordova-inappbrowser';

// Extend existing DOM types for better visualViewport support
declare global {
  interface VisualViewport {
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
  }
}
