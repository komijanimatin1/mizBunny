import { IonContent, IonPage } from '@ionic/react';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { useInAppBrowser } from '../hooks/useInAppBrowser';

const LOGIN_URL = 'https://tccim.mizbunny.com?isLauncherLogin=true&launcherProfileUpdated=true';

const Login: React.FC = () => {
  const { openBrowser, isAvailable } = useInAppBrowser();
  const history = useHistory();
  const cleanupRef = useRef<() => void>(() => {});
  const isAfterLoginRef = useRef<boolean>(false);
  const listenerAttachedRef = useRef<boolean>(false);

  useEffect(() => {
    let browserRef: any = null;

    const open = async () => {
      try {
        // Open with custom options: hide toolbar/footer and any custom buttons
        const options = [
          'location=no',
          'toolbar=no',
          'footer=no',
          'menu=no',
          'injectbutton=no',
          'hideurlbar=yes',
          'hidenavigationbuttons=yes',
          'hardwareback=yes',
          'zoom=no',
          'clearsessioncache=yes',
          'clearcache=yes'
        ].join(',');

        browserRef = await openBrowser(LOGIN_URL, '_blank', options);

        const handleMessage = (event: any) => {
          const raw = (event && (event.data ?? event)) as any;
          let parsed: any = raw;
          if (typeof raw === 'string') {
            try { parsed = JSON.parse(raw); } catch { parsed = raw; }
          }
          console.log('[Host] IAB message:', parsed);
          if (!isAfterLoginRef.current) {
            // Ignore messages until we've detected post-login navigation
            return;
          }
          if (parsed && typeof parsed === 'object' && parsed.origin === 'mizBunnyApp') {
            const payloadForAlert = typeof raw === 'string' ? raw : JSON.stringify(parsed);
            alert(`GOT MESSAGE : ${payloadForAlert}`);
            // Close the InAppBrowser and navigate to home after successful message
            setTimeout(() => {
              try {
                if (browserRef && typeof browserRef.close === 'function') {
                  browserRef.close();
                }
                history.push('/home');
              } catch (e) {
                console.error('Error closing browser or navigating:', e);
                history.push('/home');
              }
            }, 500); // Small delay to show the alert
          }
        };

        if (browserRef && typeof browserRef.addEventListener === 'function') {
          // Bridge window.parent.postMessage → cordova_iab.postMessage so existing site code works in IAB
          const bridgeCode = `
            (function(){
              try {
                function toJSONString(message){
                  try { return (typeof message === 'string') ? message : JSON.stringify(message); } catch(e) { return String(message); }
                }
                function forwardToHost(message){
                  var payload = toJSONString(message);
                  try {
                    if (window.cordova_iab && typeof window.cordova_iab.postMessage === 'function') {
                      window.cordova_iab.postMessage(payload);
                      return;
                    }
                  } catch(e) {}
                  try {
                    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.cordova_iab && typeof window.webkit.messageHandlers.cordova_iab.postMessage === 'function') {
                      window.webkit.messageHandlers.cordova_iab.postMessage(payload);
                      return;
                    }
                  } catch(e) {}
                }
                // Wrap parent.postMessage only (site uses this to talk to host)
                try {
                  var p = window.parent; var _pPost = p && p.postMessage;
                  if (_pPost) {
                    p.postMessage = function(msg, origin){ try { forwardToHost(msg); } catch(e) {} try { return _pPost.call(p, msg, origin); } catch(e) {} };
                  }
                } catch(e) {}
                // Wrap site helper sendMessageToParent(action, data)
                function wrapSender(){
                  try {
                    var original = window.sendMessageToParent;
                    if (typeof original === 'function' && !original.__wrapped) {
                      var wrapped = function(action, data){
                        try { forwardToHost({ origin: 'mizBunnyApp', action: action, data: data }); } catch(e) {}
                        try { return original.apply(this, arguments); } catch(e) {}
                      };
                      wrapped.__wrapped = true;
                      window.sendMessageToParent = wrapped;
                    }
                  } catch(e) {}
                }
                wrapSender();
                var tries = 0; var maxTries = 50; // ~5s
                var i = setInterval(function(){
                  try { wrapSender(); if (++tries >= maxTries) clearInterval(i); } catch(e) { clearInterval(i); }
                }, 100);
                // Expose helper for manual calls from devtools
                window.sendMessageToHost = forwardToHost;
              } catch(e) {}
            })();
          `;

          const evaluateLoginAndAttach = (url?: string) => {
            try {
              const currentUrl = url || '';
              const isLoginUrl = currentUrl.includes('isLauncherLogin=true');
              if (!isLoginUrl) {
                isAfterLoginRef.current = true;
              }
              if (isAfterLoginRef.current && !listenerAttachedRef.current) {
                browserRef.addEventListener('message', handleMessage);
                listenerAttachedRef.current = true;
              }
            } catch {}
          };

          browserRef.addEventListener('loadstop', (e: any) => {
            try { browserRef.executeScript({ code: bridgeCode }); } catch {}
            evaluateLoginAndAttach(e && e.url);
          });

          cleanupRef.current = () => {
            try {
              if (listenerAttachedRef.current) {
                browserRef.removeEventListener?.('message', handleMessage);
              }
            } catch {}
            browserRef = null;
            listenerAttachedRef.current = false;
            isAfterLoginRef.current = false;
          };
        } else if (!isAvailable()) {
          // Fallback in web: listen to window messages
          window.addEventListener('message', handleMessage);
          cleanupRef.current = () => {
            window.removeEventListener('message', handleMessage);
            // For web fallback, also navigate to home
            if (isAfterLoginRef.current) {
              history.push('/home');
            }
          };
        }
      } catch (e) {
        console.error('Failed to open login InAppBrowser', e);
      }
    };

    open();

    return () => {
      cleanupRef.current?.();
    };
  }, [openBrowser, isAvailable, history]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <span>در حال اتصال به صفحه ورود…</span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;


