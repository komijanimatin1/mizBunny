import React, { useRef, useState, useEffect } from 'react';
import { useInAppBrowser } from '../../hooks/useInAppBrowser';
import ConfirmationModal from '../ui/ConfirmationModal';

const FacilitiesScroll: React.FC<{ facilities: any }> = ({ facilities }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { openBrowser } = useInAppBrowser();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
  }>({
    isOpen: false,
    url: '',
    title: ''
  });

  // Reset modal state when web view is closed
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && modalState.isOpen) {
        // Web view was likely closed, reset modal state
        setModalState({ isOpen: false, url: '', title: '' });
      }
    };

    const handleFocus = () => {
      // When app regains focus, check if modal should be closed
      if (modalState.isOpen) {
        // Small delay to ensure web view is fully closed
        setTimeout(() => {
          setModalState({ isOpen: false, url: '', title: '' });
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [modalState.isOpen]);

  const handleItemClick = (url: string, title: string) => {
    setModalState({
      isOpen: true,
      url,
      title
    });
  };

  const handleConfirmOpen = async () => {
    // Close modal immediately when confirm button is clicked
    setModalState({ isOpen: false, url: '', title: '' });
    
    try {
      await openBrowser(
        modalState.url,
        '_blank',
        `showurl=no,navigationbuttons=yes,backbutton=yes,toolbar=no,toolbarheight=80,toolbarcolor=#5d5d5d,fullscreen=yes,footer=yes,menu=yes,hardwareback=yes,closebutton=yes,zoom=no,footertitle=${modalState.title},footercolor=#F0F0F0,closebuttoncolor=#5d5d5d,gestures=no,footerheight=86`
      );
    } catch (err) {
      console.error('Failed to open:', err);
      // Modal is already closed, no need to handle error state
    }
  };

  const handleCancelOpen = () => {
    setModalState({ isOpen: false, url: '', title: '' });
  };


  return (
    <div className="w-full">

      {/* title of facilities */}
      <div className="text-right rtl mb-3">
        <span className="text-sm font-semibold mb-3 text-[#1f2937]">{facilities.title}</span>
      </div>
      
      <div 
        className="flex overflow-x-scroll scrollbar-hide scroll-smooth gap-2.5 pl-4 [&::-webkit-scrollbar]:hidden w-full"
        ref={scrollRef}
      >
        {facilities.facilities.map((facility: any) => (
          <div 
            key={facility.id} 
            className="flex-col w-[136px] min-w-[136px] max-w-[136px] flex-shrink-0 rounded-xl flex items-center cursor-pointer hover:scale-105 transition-all duration-300"
          >
            {/* Color box with icon */}
            <div 
              className="w-full h-16 md:h-30 rounded-xl mb-1.5 flex items-center justify-center"
              style={{ backgroundColor: facility.color }}
              onClick={() => handleItemClick(facility.url, facility.title)}
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center relative">
                <img 
                  src={facility.icon} 
                  alt={facility.title}
                  className=" h-8 object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              </div>
            </div>
            
            {/* Facility details */}
            <div className="flex flex-col gap-1 w-full">
              <div
                className="text-[#000000] text-[14px] font-medium leading-normal"
              >
                {facility.title}
              </div>
              <div 
                className="text-[#454545] text-[12px] font-medium leading-normal"
              >
                {facility.details}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onConfirm={handleConfirmOpen}
        onCancel={handleCancelOpen}
        siteName={modalState.title}
      />

    </div>
  );
};

export default FacilitiesScroll;