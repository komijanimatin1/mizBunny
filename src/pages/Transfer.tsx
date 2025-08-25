import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonPage, IonContent } from '@ionic/react';
import { useInAppBrowser } from '../hooks/useInAppBrowser';

// Custom CSS Spinner Component
const CustomSpinner: React.FC<{ color: string; loading: boolean }> = ({ color, loading }) => {
  if (!loading) return null;
  
  // Make the color more vibrant
  const vibrantColor = color;
  
  return (
    <div className="w-32 h-32 border-4 border-gray-200 border-t-current rounded-full animate-spin"
      style={{ 
        borderTopColor: vibrantColor,
        borderWidth: '4px'
      }}
    />
  );
};

interface FacilityData {
  url: string;
  title: string;
  icon: string;
  color: string;
}

interface LocationState {
  facility?: FacilityData;
}

interface TransferPageProps {
  // This will be a route component, so no props needed
}

const Transfer: React.FC<TransferPageProps> = () => {
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

    if (url && title && icon && color) {
      setFacilityData({
        url,
        title,
        icon,
        color
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
    openBrowser(facilityData.url, '_blank', `location=no,toolbar=no,backbutton=no,hidden=yes,footer=yes,footertitle=${facilityData.title},footercolor=#F0F0F0,closebutton=yes,closebuttoncolor=#5d5d5d,menu=yes,zoom=no,footerheight=86`)
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
            <p className="text-lg font-medium text-[#0D0026]">در حال بارگذاری...</p>
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
              
              {/* Spinner overlay around logo - positioned outside the logo */}
              <div className="absolute -inset-2 flex items-center justify-center">
                <CustomSpinner color={facilityData.color} loading={!pageLoaded} />
              </div>
            </div>
            
            {/* Transfer message */}
            <p className="text-xs font-medium text-[#0D0026] leading-none">
              شما در حال انتقال به سرویس {facilityData.title} هستید...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full gap-2 max-w-xs px-4">
            {/* Transfer Button - Disabled until loaded */}
            <button
              onClick={handleConfirmOpen}
              disabled={!pageLoaded}
              className={`flex h-8 p-2 justify-center items-center gap-2 flex-[1_0_0] rounded-lg transition-all duration-300 ${
                pageLoaded ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ backgroundColor: pageLoaded ? facilityData.color : '#bfbfbf' }}
            >
              <span className="text-xs font-medium text-white leading-none">انتقال</span>
            </button>

            {/* Return to Digital Room Button */}
            <button
              onClick={handleCancelOpen}
              className="flex h-8 p-2 justify-center items-center gap-2 flex-[1_0_0] rounded-lg"
              style={{ border: '1px solid #E0E0E0' }}
            >
              <span className="text-xs font-medium text-[#0D0026] leading-none">بازگشت به اتاق دیجیتال</span>
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Transfer;
