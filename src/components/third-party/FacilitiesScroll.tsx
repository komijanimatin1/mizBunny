import React, { useRef, useState, useEffect } from 'react';
import { useInAppBrowser } from '../../hooks/useInAppBrowser';
import './FacilitiesScroll.css';
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
      await openBrowser(modalState.url, '_blank', `location=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,footertitle=${modalState.title},closebuttoncolor=#5d5d5d,menu=yes,hardwareback=yes`);
    } catch (err) {
      console.error('Failed to open:', err);
      // Modal is already closed, no need to handle error state
    }
  };

  const handleCancelOpen = () => {
    setModalState({ isOpen: false, url: '', title: '' });
  };


  return (
    <div className="facilities-scroll-container">
      <div className="facilities-title">
        <h2>{facilities.title}</h2>
      </div>
      
      <div 
        className="facilities-scroll"
        ref={scrollRef}
      >
        {facilities.facilities.map((facility: any) => (
          <div 
            key={facility.id} 
            className="facility-card"
            style={{ backgroundColor: facility.color }}
          >
            <div className="facility-content" onClick={() => handleItemClick(facility.url, facility.title)}>
              <div className="facility-icon">
                <img 
                  src={facility.icon} 
                  alt={facility.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="fallback-icon hidden">
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