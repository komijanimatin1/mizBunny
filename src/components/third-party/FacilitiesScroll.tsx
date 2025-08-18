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
      await openBrowser(modalState.url, '_blank', `showurl=no,navigationbuttons=yes,backbutton=yes,toolbar=no,toolbarheight=80,toolbarcolor=#5d5d5d,fullscreen=yes,footer=yes,menu=yes,hardwareback=yes,closebutton=yes,zoom=yes,footertitle=${modalState.title},closebuttoncolor=#5d5d5d,gestures=no`);
    } catch (err) {
      console.error('Failed to open:', err);
      // Modal is already closed, no need to handle error state
    }
  };

  const handleCancelOpen = () => {
    setModalState({ isOpen: false, url: '', title: '' });
  };


  return (
    <div className="w-full my-4">
      <div className="mb-2 text-right rtl">
        <h2 className="text-lg font-semibold m-0 text-[#1f2937]">{facilities.title}</h2>
      </div>
      
      <div 
        className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-2.5 pl-4 [&::-webkit-scrollbar]:hidden"
        ref={scrollRef}
      >
        {facilities.facilities.map((facility: any) => (
                  <div 
          key={facility.id} 
                     className="flex-none w-[calc(50%-8px)] h-30 md:h-30 bg-white rounded-xl p-4 md:p-4 flex items-center shadow-md border border-[#e5e7eb]"
          style={{ backgroundColor: facility.color }}
        >
            <div className="flex items-center justify-center w-full h-full" onClick={() => handleItemClick(facility.url, facility.title)}>
              <div className="flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center bg-transparent relative">
                <img 
                  src={facility.icon} 
                  alt={facility.title}
                  className="w-15 h-15 object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-10 h-10 bg-[#3b82f6] text-white rounded-lg flex items-center justify-center font-semibold text-lg hidden">
                  {facility.title.charAt(0)}
                </div>
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