declare module 'scroll-snap' {
  export type EasingFunction = (t: number) => number;

  export interface ScrollSnapOptions {
    snapDestinationX?: string | number;
    snapDestinationY?: string | number;
    timeout?: number;
    duration?: number;
    threshold?: number;
    snapStop?: boolean;
    showArrows?: boolean;
    enableKeyboard?: boolean;
    easing?: EasingFunction;
  }

  export interface ScrollSnapInstance {
    bind: () => void;
    unbind: () => void;
  }

  export default function createScrollSnap(
    element: Element,
    options?: ScrollSnapOptions
  ): ScrollSnapInstance;
}


