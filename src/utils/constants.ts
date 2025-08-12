// App-wide constants
export const APP_NAME = 'اتاق دیجیتال';
export const APP_VERSION = '0.0.1';

// API endpoints
export const API_BASE_URL = 'https://cazieh-front.linuxchi.ir';
export const MEDIA_URL = 'https://Media.dccim.ir';

// Service URLs
export const SERVICE_URLS = {
  KARTABEL: `${API_BASE_URL}/`,
  MEDIA: MEDIA_URL,
  COUNSELING: `${API_BASE_URL}/services/counseling`,
  COURSE: `${API_BASE_URL}/services/course`,
  EVENT: `${API_BASE_URL}/services/event`,
} as const;

// Browser options
export const BROWSER_OPTIONS = {
  DEFAULT: 'location=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,menu=yes,hardwareback=yes',
  FULLSCREEN: 'location=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,menu=yes,hardwareback=yes',
} as const;
