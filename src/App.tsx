import { Redirect, Route, useLocation } from 'react-router-dom';
import { IonApp, IonFooter, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Splash from './pages/Splash';
import AIPage from './pages/AIPage';
import Profile from './pages/Profile';
import Transfer from './pages/Transfer';
import ToolbarSection from './components/home/ToolbarSection';
import { useAuthStore } from './stores/authStore';

/* Theme variables */
import './theme/variables.css';

import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { StatusBar } from '@capacitor/status-bar';
// Initialize safe area manager (restores safe-area CSS variables/fallbacks)
import './utils/safeArea';
import { useEffect } from 'react';

setupIonicReact();

// Ensure overlay keyboard behavior (no resize/pan)
Keyboard.setResizeMode({ mode: KeyboardResize.None }).catch(() => {});

const AppContent: React.FC = () => {
  const location = useLocation();
  const showToolbar = location.pathname !== '/splash' && location.pathname !== '/transfer';
  const { isAuthenticated, token } = useAuthStore();

  // Preserve native safe area spacing by disabling StatusBar overlay
  useEffect(() => {
    (async () => {
      try {
        await StatusBar.setOverlaysWebView({ overlay: false });
      } catch {}
    })();
  }, []);

  return (
    <>
      <IonRouterOutlet>
        <Route exact path="/splash" render={() => <Splash key={`splash-${isAuthenticated}-${token}`} />} />
        <Route exact path="/home" render={() => (isAuthenticated || token ? <Home /> : <Redirect to="/splash" />)} />
        <Route exact path="/ai" render={() => (isAuthenticated || token ? <AIPage /> : <Redirect to="/splash" />)} />
        <Route exact path="/profile" render={() => (isAuthenticated || token ? <Profile /> : <Redirect to="/splash" />)} />
        <Route exact path="/transfer" render={() => <Transfer />} />
        <Route exact path="/">
          <Redirect to="/splash" />
        </Route>
      </IonRouterOutlet>
      {showToolbar && (
        <IonFooter className="footer-safe">
          <ToolbarSection />
        </IonFooter>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <IonApp className="ion-safe-area-top">
      <IonReactRouter>
        <AppContent />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
