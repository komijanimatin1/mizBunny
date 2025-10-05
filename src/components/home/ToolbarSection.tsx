import React, { useRef } from 'react';
import { IonIcon, useIonRouter } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('navigation');
  const router = useIonRouter();
  const { pathname } = useLocation();
  const toolbarRef = useRef<HTMLDivElement>(null);

  const activeTab: TabKey = pathname.startsWith('/ai')
    ? 'ai'
    : pathname.startsWith('/profile')
      ? 'profile'
      : 'home';

  const prevTabRef = useRef<TabKey>(activeTab);

  prevTabRef.current = activeTab;

  const handleTabClick = (tab: TabKey) => {
    const target = tab === 'home' ? '/home' : `/${tab}`;
    if (pathname === target) return;

    const order: TabKey[] = ['home', 'profile', 'ai'];
    const fromIndex = order.indexOf(prevTabRef.current);
    const toIndex = order.indexOf(tab);
    const direction = toIndex > fromIndex ? 'forward' : 'back';

    router.push(target, direction);
  };

  // No keyboard-driven positioning; rely on OS overlay behavior

  return (
    <div
      ref={toolbarRef}
      className="fixed bottom-4 left-4 right-4 z-[1000] bg-black flex gap-4 justify-around items-center py-2 px-4 rounded-xl transition-all duration-300 ease-in-out"
    >


      <div
        className={`flex flex-col flex-1 items-center cursor-pointer transition-all duration-300 ease-in-out py-1 px-4 rounded-lg ${activeTab === 'home' ? 'bg-white bg-opacity-15' : 'hover:bg-white hover:bg-opacity-10'}`}
        onClick={() => handleTabClick('home')}
      >
        <IonIcon
          icon={activeTab === 'home' ? home : homeOutline}
          className={`text-2xl mb-1 transition-all duration-300 ease-in-out ${activeTab === 'home' ? 'text-white scale-110' : 'text-[#D9D9D9]'}`}
        />
        <span className={`text-xs text-white font-medium text-center transition-all duration-300 ease-in-out ${activeTab === 'home' ? 'font-semibold' : 'font-medium'}`}>{t('home')}</span>
      </div>
      <div
        className={`flex flex-col flex-1 items-center cursor-pointer transition-all duration-300 ease-in-out py-1 px-4 rounded-lg ${activeTab === 'ai' ? 'bg-white bg-opacity-15' : 'hover:bg-white hover:bg-opacity-10'}`}
        onClick={() => handleTabClick('ai')}
      >
        <IonIcon
          icon={activeTab === 'ai' ? colorWand : colorWandOutline}
          className={`text-2xl mb-1 transition-all duration-300 ease-in-out ${activeTab === 'ai' ? 'text-white scale-110' : 'text-[#D9D9D9]'}`}
        />
        <span className={`text-xs text-white font-medium text-center transition-all duration-300 ease-in-out ${activeTab === 'ai' ? 'font-semibold' : 'font-medium'}`}>{t('assistant')}</span>
      </div>

      <div
        className={`flex flex-col flex-1 items-center cursor-pointer transition-all duration-300 ease-in-out py-1 px-4 rounded-lg ${activeTab === 'profile' ? 'bg-white bg-opacity-15' : 'hover:bg-white hover:bg-opacity-10'}`}
        onClick={() => handleTabClick('profile')}
      >
        <IonIcon
          icon={activeTab === 'profile' ? person : personOutline}
          className={`text-2xl mb-1 transition-all duration-300 ease-in-out ${activeTab === 'profile' ? 'text-white scale-110' : 'text-[#D9D9D9]'}`}
        />
        <span className={`text-xs text-white font-medium text-center transition-all duration-300 ease-in-out ${activeTab === 'profile' ? 'font-semibold' : 'font-medium'}`}>{t('profile')}</span>
      </div>

    </div>
  );
};

export default ToolbarSection;
