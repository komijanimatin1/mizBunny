import React, { useRef, useState } from 'react';
import { useInAppBrowser } from '../hooks/useInAppBrowser';
import './FacilitiesScroll.css';
import ConfirmationModal from './ConfirmationModal';

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

  const handleItemClick = (url: string, title: string) => {
    setModalState({
      isOpen: true,
      url,
      title
    });
  };

  const handleConfirmOpen = async () => {
    try {
      await openBrowser(modalState.url, '_blank', `location=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,footertitle=${modalState.title},closebuttoncolor=#5d5d5d,menu=yes,hardwareback=yes`);
    } catch (err) {
      console.error('Failed to open:', err);
    }
    setModalState({ isOpen: false, url: '', title: '' });
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