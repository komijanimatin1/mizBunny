import { Redirect, Route, useLocation } from 'react-router-dom';
import { IonApp, IonFooter, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Splash from './pages/Splash';
import AIPage from './pages/AIPage';
import Profile from './pages/Profile';
import ToolbarSection from './components/home/ToolbarSection';
import { useAuthStore } from './stores/authStore';

/* Theme variables */
import './theme/variables.css';

import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { StatusBar, Style } from '@capacitor/status-bar';
import { useEffect } from 'react';

setupIonicReact();

// Ensure overlay keyboard behavior (no resize/pan)
Keyboard.setResizeMode({ mode: KeyboardResize.None }).catch(() => {});

const AppContent: React.FC = () => {
  const location = useLocation();
  const showToolbar = location.pathname !== '/splash';
  const { isAuthenticated, token } = useAuthStore();

  // Prevent content under status bar and match platform backgrounds
  useEffect(() => {
    (async () => {
      try {
        await StatusBar.setOverlaysWebView({ overlay: true });
      } catch {}
      // style adjustments optional
    })();
  }, []);

  return (
    <>
      <IonRouterOutlet>
        <Route exact path="/splash" render={() => <Splash key={`splash-${isAuthenticated}-${token}`} />} />
        <Route exact path="/home" render={() => (isAuthenticated || token ? <Home /> : <Redirect to="/splash" />)} />
        <Route exact path="/ai" component={AIPage} />
        <Route exact path="/profile" component={Profile} />
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
    <IonApp>
      <IonReactRouter>
        <AppContent />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
