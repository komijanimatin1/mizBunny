// Electron API types for renderer process
export interface ElectronAPI {
  // Window controls
  minimize: () => void;
  close: () => void;
  closeWindow: () => void;
  toggleMaximize: () => void;
  minimizeWindow: () => void;
  toggleFullscreen: () => void;

  // WebView context menu
  showWebviewContextMenu: (params: Record<string, unknown>) => void;

  // Session management
  clearSession: () => void;
  clearPartition: (partition: string) => void;

  // Communication
  sendToMain: (message: string) => void;
  receiveMessage: (
    callback: (message: Record<string, unknown>) => void
  ) => void;

  // App path
  getAppPath: () => void;
  receiveAppPath: (callback: (path: string) => void) => void;

  // AI context menu
  onAiContextMenuSelectText: (
    callback: (data: { selectionText: string }) => void
  ) => void;

  // New tab handling
  onNewTab: (callback: (url: string) => void) => void;

  // Main process messages
  onMainProcessMessage: (callback: (message: string) => void) => void;

  // Login success
  notifyLoginSuccess: () => void;

  // New tab handling
  newTab: (callback: (url: string) => void) => void;
}

// Webview element types
export interface WebviewTag extends HTMLElement {
  src: string;
  partition: string;
  preload: string;
  nodeintegration: boolean;
  webpreferences: string;
  allowpopups: boolean;
  send: (channel: string, ...args: unknown[]) => void;
  addEventListener: (event: string, listener: EventListener) => void;
  removeEventListener: (event: string, listener: EventListener) => void;
  reload: () => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: () => boolean;
  canGoForward: () => boolean;
}

// IPC message event types
export interface IpcMessageEvent extends Event {
  args: unknown[];
}

// SysBunny types
export interface SysBunnyTeam {
  _id: string;
  name: string;
  logo?: string;
}

export interface SysBunnyUnit {
  _id: string;
  name: string;
  logo?: string;
}

export interface MenuItem {
  id?: string;
  name?: string;
  title: string;
  icon?: string;
  url: string;
  type: string;
  displayName: string;
  logoUrl?: string;
  logo?: string;
}

// Global window interface
declare global {
  interface Window {
    launchAI: () => void;
    electronAPI: ElectronAPI;
    sysBunny?: {
      token?: string;
      refreshToken?: string | null;
      getProfile: () => Promise<{
        name: string;
        lastName: string;
        phoneNumber: string;
        username: string;
        email: string;
        password: string;
        bucketName: string;
        position: string;
        roles: string[];
      }>;
      getTeams: () => Promise<SysBunnyTeam[]>;
      getUnits: () => Promise<SysBunnyUnit[]>;
      getTeamApps: (teamId: string) => Promise<MenuItem[]>;
      appLogin: (appId: string, teamId: string) => Promise<string>;
    };
    ipcRenderer?: {
      clearPartition: (partition: string) => void;
      close: () => void;
      toggleFullscreen: () => void;
      minimize: () => void;
      receiveMessage: (
        callback: (data: {
          origin: string;
          data: { token: string; refreshToken: string };
        }) => void
      ) => void;
    };
  }
}

export {};
