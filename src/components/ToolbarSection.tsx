import React, { useEffect, useRef } from 'react';
import { IonIcon, useIonRouter } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import {
  colorWandOutline,
  colorWand,
  personOutline,
  person,
  homeOutline,
  home
} from 'ionicons/icons';
import './ToolbarSection.css';

type TabKey = 'ai' | 'profile' | 'home';

const ToolbarSection: React.FC = () => {
  const router = useIonRouter();
  const { pathname } = useLocation();

  const activeTab: TabKey = pathname.startsWith('/ai')
    ? 'ai'
    : pathname.startsWith('/profile')
    ? 'profile'
    : 'home';

  const prevTabRef = useRef<TabKey>(activeTab);

  useEffect(() => {
    prevTabRef.current = activeTab;
  }, [activeTab]);

  const handleTabClick = (tab: TabKey) => {
    const target = tab === 'home' ? '/home' : `/${tab}`;
    if (pathname === target) return;

    const order: TabKey[] = ['home', 'profile', 'ai'];
    const fromIndex = order.indexOf(prevTabRef.current);
    const toIndex = order.indexOf(tab);
    const direction = toIndex > fromIndex ? 'forward' : 'back';

    router.push(target, direction);
  };

  return (
    <div className="toolbar-section">
      <div
        className={`toolbar-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => handleTabClick('home')}
      >
        <IonIcon
          icon={activeTab === 'home' ? home : homeOutline}
          className="toolbar-icon"
        />
        <span className="toolbar-text">خانه</span>
      </div>

      <div
        className={`toolbar-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => handleTabClick('profile')}
      >
        <IonIcon
          icon={activeTab === 'profile' ? person : personOutline}
          className="toolbar-icon"
        />
        <span className="toolbar-text">پروفایل</span>
      </div>

      <div
        className={`toolbar-item ${activeTab === 'ai' ? 'active' : ''}`}
        onClick={() => handleTabClick('ai')}
      >
        <IonIcon
          icon={activeTab === 'ai' ? colorWand : colorWandOutline}
          className="toolbar-icon"
        />
        <span className="toolbar-text">AI</span>
      </div>

    </div>
  );
};

export default ToolbarSection;
