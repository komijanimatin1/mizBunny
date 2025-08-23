/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      spacing: {
        // Enhanced safe area spacing with fallbacks
        'safe-bottom': 'max(var(--ion-safe-area-bottom, 0px), env(safe-area-inset-bottom, 0px), var(--safe-area-bottom-fallback, 0px))',
        'safe-top': 'max(var(--ion-safe-area-top, 0px), env(safe-area-inset-top, 0px), var(--safe-area-top-fallback, 0px))',
        'safe-left': 'max(var(--ion-safe-area-left, 0px), env(safe-area-inset-left, 0px), var(--safe-area-left-fallback, 0px))',
        'safe-right': 'max(var(--ion-safe-area-right, 0px), env(safe-area-inset-right, 0px), var(--safe-area-right-fallback, 0px))',
        // Fallback safe area spacing
        'safe-bottom-fallback': 'var(--safe-area-bottom-fallback, 24px)',
        'safe-top-fallback': 'var(--safe-area-top-fallback, 24px)',
        'safe-left-fallback': 'var(--safe-area-left-fallback, 0px)',
        'safe-right-fallback': 'var(--safe-area-right-fallback, 0px)',
      },
      height: {
        'dvh': '100dvh',
        'screen-dvh': '100dvh',
      },
      minHeight: {
        'dvh': '100dvh',
        'screen-dvh': '100dvh',
      }
    },
  },
  plugins: [],
  // This ensures Tailwind doesn't conflict with Ionic's CSS
  corePlugins: {
    preflight: true,
  },
}
