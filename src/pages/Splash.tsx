import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useInAppBrowser } from '../hooks/useInAppBrowser';
import { useAuthStore } from '../stores/authStore';

const Splash: React.FC = () => {
  console.log('[DEBUG] Splash component rendering');
  const [logoAnimation, setLogoAnimation] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeAnimation, setWelcomeAnimation] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [isWebViewOpen, setIsWebViewOpen] = useState(false);

  const history = useHistory();
  const { openBrowser, closeBrowser, isAvailable } = useInAppBrowser();
  const { login, token, isAuthenticated } = useAuthStore();

  console.log('[DEBUG] Current auth state:', token, isAuthenticated, isWebViewOpen, successfulLogin);
  const cleanupRef = useRef<() => void>(() => {});
  const browserRef = useRef<any>(null);
  const listenerAttachedRef = useRef<boolean>(false);

  const LOGIN_URL = 'https://tccim.mizbunny.com?isLauncherLogin=true&launcherProfileUpdated=true';
  console.log('[DEBUG] LOGIN_URL:', LOGIN_URL);

  // --- finishLogin: قبول token و refreshToken و userData ---
  const finishLogin = (userData: any, authToken: string | null, refreshToken?: string | null) => {
    console.log('[DEBUG] ✅ Login success with token:', !!authToken);
    try {
      sessionStorage.setItem('session_started', 'true');
    } catch (err) {
      console.error('[DEBUG] Failed to set session_started:', err);
    }

    if (!authToken) {
      console.warn('[DEBUG] ❌ No auth token provided');
      return;
    }

    const loginData = {
      token: authToken,
      refreshToken: refreshToken ?? authToken,
      userId: userData?._id ?? userData?.id ?? userData?.userId ?? 'unknown'
    };

    // call zustand / store login
    try {
      login(userData, loginData);
      console.log('[DEBUG] ✅ Store login successful');
    } catch (err) {
      console.error('[DEBUG] ❌ Store login failed:', err);
    }

    setSuccessfulLogin(true);
    
    // close webview and cleanup listeners
    try {
      if (browserRef.current) {
        closeBrowser();
        browserRef.current = null;
      }
    } catch (e) {
      console.error('[DEBUG] ❌ Error closing browser:', e);
    } finally {
      setIsWebViewOpen(false);
      cleanupRef.current?.();
    }
  };

  // --- Robust message parser & handler ---
  const handleMessage = (eventOrPayload: any) => {
    console.log('[DEBUG] 📨 Message received');
    
    // eventOrPayload might be a MessageEvent or the raw payload (some IABs call back differently)
    let raw = (eventOrPayload && eventOrPayload.data !== undefined) ? eventOrPayload.data : eventOrPayload;
    let parsed: any = raw;

    // if raw is string try to parse JSON
    if (typeof raw === 'string') {
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        parsed = raw;
      }
    }

    // Some IABs wrap posted messages as { type: 'message', data: <payload> }
    if (parsed && typeof parsed === 'object' && parsed.type === 'message' && parsed.data) {
      parsed = parsed.data;
    }

    try {
      // Ensure it's an object with our origin marker
      if (!parsed || typeof parsed !== 'object') {
        return;
      }

      // Only accept messages that our web app sends
      if (parsed.origin !== 'mizBunnyApp') {
        console.log('[DEBUG] ❌ Wrong origin:', parsed.origin);
        return;
      }

      // handle login success action
      if (parsed.action === 'loginSuccess' && parsed.data) {
        console.log('[DEBUG] 🎯 Login success message received');
        const data = parsed.data;
        const tokenFromWeb = data.token ?? null;
        const refreshFromWeb = data.refreshToken ?? null;
        const userId = data.userId ?? data.user?.id ?? data.user?._id ?? null;

        const userData = data.user ?? { id: userId, userId };

        if (tokenFromWeb && (userId || userData)) {
          console.log('[DEBUG] ✅ Calling finishLogin');
          finishLogin(userData, tokenFromWeb, refreshFromWeb);
          return;
        } else {
          console.warn('[DEBUG] ❌ Missing token or userId');
          return;
        }
      }

      console.log('[DEBUG] 🔄 Unhandled action:', parsed.action);
    } catch (err) {
      console.error('[DEBUG] ❌ Message handling error:', err);
    }
  };

  const closeBrowserAndCleanup = () => {
    console.log('[DEBUG] 🚪 Closing browser...');
    try {
      if (browserRef.current) {
        closeBrowser();
        browserRef.current = null;
      }
    } catch (e) {
      console.error('[DEBUG] ❌ Error closing browser:', e);
    } finally {
      setIsWebViewOpen(false);
      try {
        cleanupRef.current?.();
      } catch (err) {
        console.error('[DEBUG] ❌ Cleanup error:', err);
      }
    }
  };

  const openLoginBrowser = async () => {
    console.log('[DEBUG] 🔓 Opening login browser...');
    try {
      // If we have persisted auth in localStorage, skip opening the webview
      // This prevents reopening the login webview when the app was closed without logout
      const persisted = localStorage.getItem('auth-storage');
      if (persisted) {
        try {
          const parsed = JSON.parse(persisted);
          const state = parsed?.state || parsed;
          if (state && (state.isAuthenticated || state.token)) {
            console.log('[DEBUG] ✅ Persisted auth detected, skipping IAB and restoring store');
            if (!isAuthenticated && state.token) {
              try {
                // Restore zustand store synchronously to reflect persisted state
                login(state.user ?? null, { token: state.token, userId: state.userId ?? state.user?._id ?? 'unknown', refreshToken: state.refreshToken ?? state.token });
              } catch (err) {
                console.error('[DEBUG] Failed to restore auth store from persisted state', err);
              }
            }
            // Navigate directly into app
            history.replace('/home');
            return;
          }
        } catch (err) {
          console.error('[DEBUG] Failed to parse persisted auth:', err);
        }
      }
      const options = [
        'location=yes',
        'toolbar=yes',
        'toolbarposition=top',
        'footer=no',
        'backbutton=yes',
        'hidenavigationbuttons=no',
        'closebuttoncaption=بازگشت به صفحه اصلی',
        'closebuttoncolor=#000000',
        'toolbarcolor=#F0F0F0',
        'showurl=no',
        'gestures=no',
        'zoom=no',
        'clearcache=yes',
        'clearsessioncache=yes',
        'cleardata=yes'
      ].join(',');

      setIsFirstTime(false);
      browserRef.current = await openBrowser(LOGIN_URL, '_blank', options);
      console.log('[DEBUG] 🌐 Browser opened:', !!browserRef.current);
      console.log('[DEBUG] 🌐 local and session storage', localStorage.getItem('auth-storage'), sessionStorage.getItem('session_started'));
      setIsWebViewOpen(true);

      // If the returned object supports addEventListener, attach message listener to it
      if (browserRef.current?.addEventListener) {
        // avoid double attachments
        if (!listenerAttachedRef.current) {
          browserRef.current.addEventListener('message', handleMessage);
          listenerAttachedRef.current = true;
          console.log('[Splash] Added message listener to IAB instance.');
        }

        const onPageLoad = (e: any) => {
          console.log('[DEBUG] IAB loadstop:', e?.url);
          
        };

        const onBrowserExit = () => {
          console.log('[Splash] IAB exit/back detected');
          closeBrowserAndCleanup();
        };

        browserRef.current.addEventListener('loadstop', onPageLoad);
        browserRef.current.addEventListener('exit', onBrowserExit);
        browserRef.current.addEventListener('backbutton', onBrowserExit);

        cleanupRef.current = () => {
          try {
            if (listenerAttachedRef.current && browserRef.current) {
              browserRef.current.removeEventListener?.('message', handleMessage);
              console.log('[Splash] Removed message listener from IAB instance.');
            }
          } catch (err) {}
          try { browserRef.current?.removeEventListener?.('loadstop', onPageLoad); } catch {}
          try { browserRef.current?.removeEventListener?.('exit', onBrowserExit); } catch {}
          try { browserRef.current?.removeEventListener?.('backbutton', onBrowserExit); } catch {}
          listenerAttachedRef.current = false;
          browserRef.current = null;
        };
      } else {
        // Fallback (web): listen on window
        if (!listenerAttachedRef.current) {
          window.addEventListener('message', handleMessage);
          listenerAttachedRef.current = true;
          console.log('[Splash] Added message listener to window (web fallback).');
        }

        cleanupRef.current = () => {
          try {
            window.removeEventListener('message', handleMessage);
            console.log('[Splash] Removed message listener from window.');
          } catch (err) {}
          listenerAttachedRef.current = false;
        };
      }
    } catch (e) {
      console.error('Failed to open login InAppBrowser', e);
    }
  };

  // logo animation on mount
  useEffect(() => {
    const logoTimer = setTimeout(() => setLogoAnimation(true), 100);
    return () => clearTimeout(logoTimer);
  }, []);

  // cleanup listeners on unmount
  useEffect(() => {
    return () => {
      try {
        cleanupRef.current?.();
      } catch {}
    };
  }, []);

  // Drive login flow based on auth state (preserve original timings & UI)
  useEffect(() => {
    console.log('[DEBUG] 🔄 Auth state changed:', { isAuthenticated, token, isWebViewOpen });
    
    if (isAuthenticated || token) {
      console.log('[DEBUG] ✅ User authenticated, starting welcome flow');
      const welcomeTimer = setTimeout(() => {
        setShowWelcome(true);
        setTimeout(() => setWelcomeAnimation(true), 20);
      }, 1000);
      const navTimer = setTimeout(() => history.replace('/home'), 2000);
      return () => {
        clearTimeout(welcomeTimer);
        clearTimeout(navTimer);
      };
    } else {
      console.log('[DEBUG] 🔓 User not authenticated, opening login browser');
      // Open login webview shortly after logo animates
      const openTimer = setTimeout(() => {
        if (!isWebViewOpen) openLoginBrowser();
      }, 1000);
      return () => clearTimeout(openTimer);
    }
  }, [isAuthenticated, token]);

  // Reset splash states when auth state changes (e.g., after logout)
  useEffect(() => {
    if (!isAuthenticated && !token) {
      console.log('[DEBUG] 🔄 Resetting splash states (logout detected)');
      setShowWelcome(false);
      setWelcomeAnimation(false);
      setSuccessfulLogin(false);
      setIsFirstTime(true);
      setIsWebViewOpen(false);
      setLogoAnimation(false);

      try {
        cleanupRef.current?.();
        if (browserRef.current) {
          browserRef.current = null;
        }
      } catch {}

      const restartLogoTimer = setTimeout(() => setLogoAnimation(true), 100);
      return () => clearTimeout(restartLogoTimer);
    }
  }, [isAuthenticated, token]);

  const handleRetry = () => {
    console.log('[DEBUG] 🔄 Retry button clicked');
    if (!isWebViewOpen) {
      setShowWelcome(false);
      openLoginBrowser();
    }
  };

  return (
    <IonPage className="bg-white fixed top-0 left-0 w-full h-full z-[9999]">
      <IonContent fullscreen className="flex items-center justify-center h-screen w-screen" style={{ '--background': 'white' } as any}>
        <div className="flex flex-col items-center justify-center text-center w-full h-full">
          <div className={`flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
            logoAnimation ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <img 
              src="/room-logo.png" 
              alt="اتاق ديجيتال" 
              className="max-w-[200px] h-auto block md:max-w-[150px] sm:max-w-[120px]"
            />
            {/* Retry button positioned below the logo */}
            {!isFirstTime && !successfulLogin && !isWebViewOpen && (
              <div className="mt-8">
                <IonButton
                  onClick={handleRetry}
                  fill="clear"
                  className="bg-white text-black rounded-lg font-medium"
                  style={{ border: '2px solid black' }}
                >
                  ورود مجدد
                </IonButton>
              </div>
            )}
          </div>
          {/* Welcome message after successful login or when already authenticated */}
          {showWelcome && (
            <div className={`absolute bottom-40 transition-all duration-1000 ease-out antialiased ${
              welcomeAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <span className="text-xl">به میزبانی خوش آمدید</span>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
