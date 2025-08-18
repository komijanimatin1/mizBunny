import React, { useEffect, useRef, useState } from 'react';
import { IonIcon, useIonRouter } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { Keyboard } from '@capacitor/keyboard';
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const activeTab: TabKey = pathname.startsWith('/ai')
    ? 'ai'
    : pathname.startsWith('/profile')
    ? 'profile'
    : 'home';

  const prevTabRef = useRef<TabKey>(activeTab);

  useEffect(() => {
    prevTabRef.current = activeTab;
  }, [activeTab]);

  // Recalculate position when layout changes (orientation, resize, etc.)
  useEffect(() => {
    const handleLayoutChange = () => {
      // Force re-render to recalculate position
      setKeyboardHeight(prev => prev);
    };

    window.addEventListener('resize', handleLayoutChange);
    window.addEventListener('orientationchange', handleLayoutChange);

    return () => {
      window.removeEventListener('resize', handleLayoutChange);
      window.removeEventListener('orientationchange', handleLayoutChange);
    };
  }, []);

  useEffect(() => {
    // Listen for keyboard events
    let keyboardWillShow: any;
    let keyboardWillHide: any;
    let keyboardDidShow: any;
    let keyboardDidHide: any;

    const setupListeners = async () => {
      try {
        keyboardWillShow = await Keyboard.addListener('keyboardWillShow', (info) => {
          setKeyboardHeight(info.keyboardHeight);
          setIsKeyboardVisible(true);
        });

        keyboardWillHide = await Keyboard.addListener('keyboardWillHide', () => {
          setKeyboardHeight(0);
          setIsKeyboardVisible(false);
        });

        keyboardDidShow = await Keyboard.addListener('keyboardDidShow', (info) => {
          setKeyboardHeight(info.keyboardHeight);
          setIsKeyboardVisible(true);
        });

        keyboardDidHide = await Keyboard.addListener('keyboardDidHide', () => {
          setKeyboardHeight(0);
          setIsKeyboardVisible(false);
        });
      } catch (error) {
        console.warn('Keyboard API not available, using CSS fallback:', error);
        // Fallback: Use CSS-only approach for devices without Keyboard API
        setIsKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    };

    setupListeners();

    // Additional fallback: Listen for viewport resize events
    const handleResize = () => {
      // If viewport height changes significantly, it might be due to keyboard
      const currentHeight = window.innerHeight;
      const previousHeight = (window as any).visualViewport?.height || currentHeight;
      
      if (Math.abs(currentHeight - previousHeight) > 150) {
        // Significant height change, likely keyboard appeared/disappeared
        setIsKeyboardVisible(currentHeight < previousHeight);
        setKeyboardHeight(Math.abs(currentHeight - previousHeight));
      }
    };

    window.addEventListener('resize', handleResize);
    if ((window as any).visualViewport) {
      (window as any).visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      if (keyboardWillShow) keyboardWillShow.remove();
      if (keyboardWillHide) keyboardWillHide.remove();
      if (keyboardDidShow) keyboardDidShow.remove();
      if (keyboardDidHide) keyboardDidHide.remove();
      
      window.removeEventListener('resize', handleResize);
      if ((window as any).visualViewport) {
        (window as any).visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const handleTabClick = (tab: TabKey) => {
    const target = tab === 'home' ? '/home' : `/${tab}`;
    if (pathname === target) return;

    const order: TabKey[] = ['home', 'profile', 'ai'];
    const fromIndex = order.indexOf(prevTabRef.current);
    const toIndex = order.indexOf(tab);
    const direction = toIndex > fromIndex ? 'forward' : 'back';

    router.push(target, direction);
  };

  // Calculate bottom position based on keyboard state
  const getBottomPosition = () => {
    if (isKeyboardVisible && keyboardHeight > 0) {
      // Hide toolbar below the keyboard by positioning it off-screen
      // Move it down by the keyboard height plus some extra space
      return `-${keyboardHeight + 100}px`;
    }
    // When keyboard is hidden, use normal positioning
    return '1rem'; // equivalent to bottom-4
  };

  return (
    <div 
      ref={toolbarRef}
      className="fixed bottom-4 left-4 right-4 z-[1000] bg-black flex justify-around items-center py-3 px-0 rounded-xl transition-all duration-300 ease-in-out keyboard-aware"
      style={{
        bottom: getBottomPosition(),
        // Use CSS custom property for dynamic viewport height fallback
        '--keyboard-height': `${keyboardHeight}px`,
        // Ensure the toolbar stays above the keyboard on all devices
        position: 'fixed' as const,
        // Add safe area bottom padding for devices with home indicators
        paddingBottom: 'env(safe-area-inset-bottom)',
        // Fallback positioning using CSS custom properties
        '--fallback-bottom': '1rem',
        '--dynamic-bottom': isKeyboardVisible && keyboardHeight > 0 ? `-${keyboardHeight + 100}px` : 'var(--fallback-bottom)'
      } as React.CSSProperties}
    >
      {/* Debug indicator - remove this in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute -top-8 left-0 right-0 text-xs text-white bg-red-500 px-2 py-1 rounded text-center">
          KB: {isKeyboardVisible ? 'ON' : 'OFF'} | Height: {keyboardHeight}px | Hidden: {isKeyboardVisible ? 'YES' : 'NO'}
        </div>
      )}
      
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
