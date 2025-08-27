// Type declarations for cordova-plugin-clear-data
interface ClearDataPlugin {
  cache(success?: () => void, error?: (err: string) => void): void;
}

declare const ClearData: ClearDataPlugin;

export {};


