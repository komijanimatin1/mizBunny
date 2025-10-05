import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import { useTranslations } from 'next-intl';
import { useInAppBrowser } from '../hooks/useInAppBrowser';
import ProgressBar from 'progressbar.js';

// Progress circle using progressbar.js
const ProgressCircle: React.FC<{ color: string; loading: boolean }> = ({ color, loading }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const barRef = React.useRef<any>(null);
  const rafRef = React.useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!barRef.current) {
      barRef.current = new (ProgressBar as any).Circle(containerRef.current, {
        strokeWidth: 4,
        trailWidth: 0,
        trailColor: 'transparent',
        color: color,
        duration: 300,
        easing: 'linear',
        svgStyle: { width: '110px', height: '110px', overflow: 'visible' },
      });
      barRef.current.set(0);
    } else {
      barRef.current.path.setAttribute('stroke', color);
    }

    return () => {
      if (barRef.current) {
        try {
          barRef.current.destroy();
        } catch (e) { }
        barRef.current = null;
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [color]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (loading) {
      // ✅ اجرای انیمیشن مرحله‌ای
      const steps = [
        { target: 0.5, duration: 2000 },  // تا 50% طی 2 ثانیه
        { target: 0.75, duration: 3000 }, // تا 75% طی 2 ثانیه
        { target: 0.9, duration: 4000 },  // تا 90% طی 1 ثانیه
      ];

      let currentStep = 0;
      let startTime = Date.now();
      let startValue = 0;

      const animateStep = () => {
        const step = steps[currentStep];
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / step.duration, 1);
        const value = startValue + (step.target - startValue) * progress;
        bar.set(value);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animateStep);
        } else {
          // مرحله بعدی
          currentStep++;
          if (currentStep < steps.length) {
            startValue = step.target;
            startTime = Date.now();
            rafRef.current = requestAnimationFrame(animateStep);
          }
        }
      };

      animateStep();
    } else {
      // ✅ وقتی loading = false → سریع تا 100% ببر
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      bar.animate(1.0, { duration: 400 });
    }
  }, [loading]);

  return <div ref={containerRef} className="flex items-center justify-center" />;
};




interface FacilityData {
  url: string;
  title: string;
  icon: string;
  color: string;
  backgroundColor: string;
}

interface LocationState {
  facility?: FacilityData;
}

interface TransferPageProps {
  // This will be a route component, so no props needed
}

const Transfer: React.FC<TransferPageProps> = () => {
  const t = useTranslations('transfer');
  const history = useHistory();
  const location = useLocation<LocationState>();
  const { openBrowser, showBrowser, pageLoaded } = useInAppBrowser();

  const [facilityData, setFacilityData] = useState<FacilityData | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const url = params.get('url');
    const title = params.get('title');
    const icon = params.get('icon');
    const color = params.get('color');
    const backgroundColor = params.get('backgroundColor');

    if (url && title && icon && color) {
      setFacilityData({
        url,
        title,
        icon,
        color,
        backgroundColor: backgroundColor || color
      });
    } else {
      // If required data is missing from query params, redirect to home
      history.replace('/home');
    }
  }, [location.search, history]); // Depend on location.search and history

  // Start loading the in-app browser hidden when facilityData becomes available
  useEffect(() => {
    if (!facilityData) return;

    // Use openHidden to get footer and proper options
    openBrowser(facilityData.url, '_blank', `location=no,toolbar=no,backbutton=yes,hidden=yes,footer=yes,footertitle=${facilityData.title},footercolor=#F0F0F0,closebutton=yes,closebuttoncolor=#5d5d5d,menu=yes,zoom=no,footerheight=86,disallowoverscroll=yes,bouncescroll=no`)
      .catch((err) => console.warn('IAB hidden load failed', err));
  }, [facilityData, openBrowser]);

  const handleConfirmOpen = async () => {
    if (!facilityData || !pageLoaded) return;

    try {
      // Show the already loaded hidden browser
      showBrowser();
      // Redirect to home immediately after showing the browser
      history.replace('/home');
    } catch (err) {
      console.error('Failed to show browser:', err);
      // If showing fails, still redirect to home
      history.replace('/home');
    }
  };

  const handleCancelOpen = () => {
    history.push('/home');
  };

  if (!facilityData) {
    // Show a loading state or nothing while facilityData is being set
    // Or if the redirect to home is in progress
    return (
      <IonPage className="bg-white fixed top-0 left-0 w-full h-full z-[9999]">
        <IonContent fullscreen className="flex items-center justify-center h-screen w-screen" style={{ '--background': 'white' } as any}>
          <div className="w-full h-full bg-white flex flex-col items-center justify-center">
            <p className="text-lg font-medium text-[#0D0026]">{t('loading')}</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="bg-white fixed top-0 left-0 w-full h-full z-[9999]">
      <IonContent fullscreen className="flex items-center justify-center h-screen w-screen" style={{ '--background': 'white' } as any}>
        <div className="w-full h-full bg-white flex flex-col items-center justify-center">
          {/* Main Logo Section */}
          <div className="w-full flex flex-col items-center mb-8">
            {/* Circular Logo Container */}
            <div className="relative mb-6">
              {/* Main circle with facility color */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center relative"
                style={{ backgroundColor: facilityData.color }}
              >
                {/* Facility Icon */}
                <img
                  src={facilityData.icon}
                  alt={facilityData.title}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Progress circle overlay around logo - positioned outside the logo */}
              <div className="absolute -inset-3 flex items-center justify-center">
                <ProgressCircle color={facilityData.color} loading={!pageLoaded} />
              </div>

            </div>

            {/* Transfer message */}
            <p className="text-xs font-medium text-[#0D0026] leading-none">
              {t('transferringTo', { service: facilityData.title })}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full gap-2 max-w-xs px-4">
            {/* Transfer Button - Disabled until loaded */}
            <button
              onClick={handleConfirmOpen}
              disabled={!pageLoaded}
              className={`flex h-8 p-2 justify-center items-center gap-2 flex-[1_0_0] rounded-lg transition-all duration-300 ${pageLoaded ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
                }`}
              style={{ backgroundColor: pageLoaded ? facilityData.color : '#bfbfbf' }}
            >
              <span className="text-xs font-medium text-white leading-none">{t('transfer')}</span>
            </button>

            {/* Return to Digital Room Button */}
            <button
              onClick={handleCancelOpen}
              className="flex h-8 p-2 justify-center items-center gap-2 flex-[1_0_0] rounded-lg"
              style={{ border: '1px solid #E0E0E0' }}
            >
              <span className="text-xs font-medium text-[#0D0026] leading-none">{t('backToRoom')}</span>
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Transfer;
