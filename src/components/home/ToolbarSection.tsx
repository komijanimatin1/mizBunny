import React, { useEffect, useRef } from 'react';
import { IonIcon, useIonRouter } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import {
  homeOutline,
  home,
  personOutline,
  person,
  colorWandOutline,
  colorWand
} from 'ionicons/icons';

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
    <div className="fixed bottom-4 left-4 right-4 z-[1000] bg-black flex justify-around items-center py-3 px-0 rounded-xl">
      <div
        className={`flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out py-2 px-4 rounded-lg ${activeTab === 'home' ? 'bg-white bg-opacity-15' : 'hover:bg-white hover:bg-opacity-10'}`}
        onClick={() => handleTabClick('home')}
      >
        <IonIcon
          icon={activeTab === 'home' ? home : homeOutline}
          className={`text-2xl mb-1 transition-all duration-300 ease-in-out ${activeTab === 'home' ? 'text-white scale-110' : 'text-[#D9D9D9]'}`}
        />
        <span className={`text-xs text-white font-medium text-center transition-all duration-300 ease-in-out ${activeTab === 'home' ? 'font-semibold' : 'font-medium'}`}>خانه</span>
      </div>

      <div
        className={`flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out py-2 px-4 rounded-lg ${activeTab === 'profile' ? 'bg-white bg-opacity-15' : 'hover:bg-white hover:bg-opacity-10'}`}
        onClick={() => handleTabClick('profile')}
      >
        <IonIcon
          icon={activeTab === 'profile' ? person : personOutline}
          className={`text-2xl mb-1 transition-all duration-300 ease-in-out ${activeTab === 'profile' ? 'text-white scale-110' : 'text-[#D9D9D9]'}`}
        />
        <span className={`text-xs text-white font-medium text-center transition-all duration-300 ease-in-out ${activeTab === 'profile' ? 'font-semibold' : 'font-medium'}`}>پروفایل</span>
      </div>

      <div
        className={`flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out py-2 px-4 rounded-lg ${activeTab === 'ai' ? 'bg-white bg-opacity-15' : 'hover:bg-white hover:bg-opacity-10'}`}
        onClick={() => handleTabClick('ai')}
      >
        <IonIcon
          icon={activeTab === 'ai' ? colorWand : colorWandOutline}
          className={`text-2xl mb-1 transition-all duration-300 ease-in-out ${activeTab === 'ai' ? 'text-white scale-110' : 'text-[#D9D9D9]'}`}
        />
        <span className={`text-xs text-white font-medium text-center transition-all duration-300 ease-in-out ${activeTab === 'ai' ? 'font-semibold' : 'font-medium'}`}>AI</span>
      </div>

    </div>
  );
};

export default ToolbarSection;
