import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useInAppBrowser } from '../hooks/useInAppBrowser';
import { useAuthStore } from '../stores/authStore';

const Splash: React.FC = () => {
  const [logoAnimation, setLogoAnimation] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeAnimation, setWelcomeAnimation] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [isWebViewOpen, setIsWebViewOpen] = useState(false);
  const history = useHistory();
  const { openBrowser, closeBrowser, isAvailable } = useInAppBrowser();
  const { login, token, isAuthenticated } = useAuthStore();
  const cleanupRef = useRef<() => void>(() => {});
  const browserRef = useRef<any>(null);
  const listenerAttachedRef = useRef<boolean>(false);

  // const LOGIN_URL = 'https://tccim.mizbunny.com?isLauncherLogin=true&launcherProfileUpdated=true';
  const LOGIN_URL = 'https://www.w3schools.com';
  const closeBrowserAndCleanup = () => {
    try {
      if (browserRef.current) {
        closeBrowser();
        browserRef.current = null;
      }
    } catch (e) {
      console.error('Error closing browser:', e);
    } finally {
      setIsWebViewOpen(false);
    }
  };

  const finishLogin = (userData: any, authToken: string | null) => {
    try {
      sessionStorage.setItem('session_started', 'true');
    } catch {}
    login(userData, authToken);
    setSuccessfulLogin(true);
    setShowWelcome(true);
    setTimeout(() => setWelcomeAnimation(true), 20);
    closeBrowserAndCleanup();
    setTimeout(() => history.replace('/home'), 1000);
  };

  const handleMessage = (event: any) => {
    const raw = event?.data ?? event;
    let parsed: any = raw;

    if (typeof raw === 'string') {
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = raw;
      }
    }

    // iOS IAB posts messages as { type: 'message', data: <payload> }
    if (parsed && typeof parsed === 'object' && parsed.type === 'message' && parsed.data) {
      parsed = parsed.data;
    }

    console.log('[Splash] IAB message received:', parsed);

    if (parsed && typeof parsed === 'object') {
      if (parsed.type === 'toolbarback') {
        console.log('[Splash] Toolbar back button pressed.');
        closeBrowserAndCleanup();
        return;
      }

      if (parsed.origin === 'mizBunnyApp') {
        console.log('[Splash] Received message from mizBunnyApp origin.');
        const payload = parsed.data && typeof parsed.data === 'object' ? parsed.data : parsed;

        if (payload && (payload._id || payload.username || payload.email)) {
          console.log('[Splash] Login payload accepted:', payload);
          finishLogin(payload, payload.refreshToken ?? null);
          return;
        }

        console.warn('[Splash] Invalid payload, using mock fallback');
        const mockUser = {
          id: 'mock-user-fallback',
          email: 'user@mizbunny.com',
          name: 'MizBunny User',
        };
        finishLogin(mockUser, 'mock-jwt-token-fallback');
      }
    } else {
      console.log('[Splash] Received message from unknown origin or invalid format:', parsed);
    }
  };

  const injectMockMessageScript = (iabRef: any) => {
    if (!iabRef?.executeScript && !iabRef?.injectScriptCode) return;

    const mockScript = `
      (function(){
        function send(){
          try {
            const mockMessage = {
              origin: 'mizBunnyApp',
              type: 'login_success',
              data: {
                _id: '508216cd-4ddf-4036-a08d-6f1c8e05fe2b',
                username: 'hamidqasemy',
                email: 'ghasemi1992@gmail.com',
                name: 'حمید',
                lastName: 'قاسمی',
                phoneNumber: '09384328756',
                roles: ['superAdmin'],
                refreshToken: 'mock-refresh-token'
              }
            };

            var payload = JSON.stringify(mockMessage);

            if (window.cordova_iab && typeof window.cordova_iab.postMessage === 'function') {
              window.cordova_iab.postMessage(payload);
            } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.cordova_iab) {
              window.webkit.messageHandlers.cordova_iab.postMessage(payload);
            } else if (window.parent && typeof window.parent.postMessage === 'function') {
              window.parent.postMessage(mockMessage, '*');
            } else if (window.dispatchEvent) {
              const e = new MessageEvent('message', { data: mockMessage });
              window.dispatchEvent(e);
            }
          } catch (err) {
            console.error('[Mock] failed to post message', err);
          }
        }
        // send immediately and retry a couple of times to survive redirects
        send();
        setTimeout(send, 1000);
        setTimeout(send, 3000);
      })();
    `;

    try {
      if (iabRef.executeScript) {
        iabRef.executeScript({ code: mockScript });
      } else if (iabRef.injectScriptCode) {
        iabRef.injectScriptCode(mockScript);
      }
      console.log('[Mock] injected script into IAB');
    } catch (err) {
      console.error('[Mock] injection error', err);
    }
  };

  // helper to simulate mock message on web fallback
  const postMockMessageToWindow = () => {
    const mockMessage = {
      origin: 'mizBunnyApp',
      type: 'login_success',
      data: {
        _id: '508216cd-4ddf-4036-a08d-6f1c8e05fe2b',
        username: 'hamidqasemy',
        email: 'ghasemi1992@gmail.com',
        name: 'حمید',
        lastName: 'قاسمی',
        phoneNumber: '09384328756',
        roles: ['superAdmin'],
        refreshToken: 'mock-refresh-token'
      }
    };
    try {
      window.postMessage(mockMessage, '*');
      setTimeout(() => window.postMessage(mockMessage, '*'), 1000);
      setTimeout(() => window.postMessage(mockMessage, '*'), 3000);
      console.log('[Mock] posted mock message to window');
    } catch (err) {
      console.error('[Mock] failed to post mock message to window', err);
    }
  };

  const openLoginBrowser = async () => {
    try {
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
        'zoom=no'
      ].join(',')

      setIsFirstTime(false);
      browserRef.current = await openBrowser(LOGIN_URL, '_blank', options);
      setIsWebViewOpen(true);

      if (browserRef.current?.addEventListener) {
        browserRef.current.addEventListener('message', handleMessage);
        listenerAttachedRef.current = true;
        console.log('[Splash] Added "message" event listener to IAB.');

        const onPageLoad = (e: any) => {
          console.log('[Splash] Page loaded:', e?.url);
          injectMockMessageScript(browserRef.current);
          // Keep listening to loadstop to reinject after redirects/navigation
        };

        browserRef.current.addEventListener('loadstop', onPageLoad);
        console.log('[Splash] Added "loadstop" event listener to IAB.');

        // Inject immediately as well in case initial loadstop already fired before listener attached
        injectMockMessageScript(browserRef.current);

        cleanupRef.current = () => {
          if (listenerAttachedRef.current && browserRef.current) {
            browserRef.current.removeEventListener?.('message', handleMessage);
            console.log('[Splash] Removed "message" event listener from IAB.');
          }
          browserRef.current = null;
          listenerAttachedRef.current = false;
        };
      } else if (!isAvailable()) {
        window.addEventListener('message', handleMessage);
        console.log('[Splash] Added "message" event listener to window.');
        cleanupRef.current = () => {
          window.removeEventListener('message', handleMessage);
          console.log('[Splash] Removed "message" event listener from window.');
        };
        // simulate a mock message on web fallback so login completes
        postMockMessageToWindow();
      }
    } catch (e) {
      console.error('Failed to open login InAppBrowser', e);
    }
  };

  useEffect(() => {
    const logoTimer = setTimeout(() => setLogoAnimation(true), 100);
    return () => clearTimeout(logoTimer);
  }, []);

  // Cleanup listeners on unmount
  useEffect(() => {
    return () => {
      try {
        cleanupRef.current?.();
      } catch {}
    };
  }, []);

  // Drive login flow based on auth state
  useEffect(() => {
    if (successfulLogin) return; // finishLogin already handles welcome + nav
    if (isAuthenticated || token) {
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
      // Open login webview shortly after logo animates
      const openTimer = setTimeout(() => {
        if (!isWebViewOpen) openLoginBrowser();
      }, 1000);
      return () => clearTimeout(openTimer);
    }
  }, [isAuthenticated, token, successfulLogin]);

  // Reset splash states when auth state changes (e.g., after logout)
  useEffect(() => {
    if (!isAuthenticated && !token) {
      // Reset all splash states when not authenticated
      setShowWelcome(false);
      setWelcomeAnimation(false);
      setSuccessfulLogin(false);
      setIsFirstTime(true);
      setIsWebViewOpen(false);
      setLogoAnimation(false); // Reset logo animation
      
      // Cleanup any existing browser references
      try {
        cleanupRef.current?.();
        if (browserRef.current) {
          browserRef.current = null;
        }
      } catch {}
      
      // Restart logo animation after a short delay
      const restartLogoTimer = setTimeout(() => setLogoAnimation(true), 100);
      return () => clearTimeout(restartLogoTimer);
    }
  }, [isAuthenticated, token]);

  const handleRetry = () => {
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
          </div>
          {/* Welcome message after successful login or when already authenticated */}
          {showWelcome && (
            <div className={`absolute bottom-40 transition-all duration-1000 ease-out ${
              welcomeAnimation ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <span className="text-xl">به میزبانی خوش آمدید</span>
            </div>
          )}
          {/* Retry button when user backed out without login */}
          {!isFirstTime && !successfulLogin && !isWebViewOpen && (
            <div className="absolute bottom-20">
              <IonButton
                onClick={handleRetry}
                fill="clear"
                className="text-red-500 hover:text-red-600 flex items-center gap-2"
              >
                <Icon icon="fluent:arrow-enter-16-regular" width="16" height="16" />
                تلاش مجدد
              </IonButton>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
