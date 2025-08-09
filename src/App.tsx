import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState } from 'react';
import Home from './pages/Home';
import SplashScreen from './components/SplashScreen';
import AIPage from './pages/AIPage';
import Profile from './pages/Profile';
import ToolbarSection from './components/ToolbarSection';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <IonApp>
        <SplashScreen onComplete={handleSplashComplete} />
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/ai">
            <AIPage />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        {/* Persistent custom toolbar over all routes */}
        <ToolbarSection />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
