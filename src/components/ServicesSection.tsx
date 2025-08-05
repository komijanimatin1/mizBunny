import React from 'react';
import { useInAppBrowser } from '../hooks/useInAppBrowser';
import './ServicesSection.css';

const ServicesSection = () => {
  const { openBrowser } = useInAppBrowser();

  const handleKartableClick = async (url: string, title: string) => {
    try {
      await openBrowser(url, '_blank', `location=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,footertitle=${title},closebuttoncaption=Close,closebuttoncolor=#5d5d5d,menu=yes,hardwareback=yes`);
    } catch (err) {
      console.error('Failed to open Google:', err);
    }
  };

  return (
    <div className="services-section">
      {/* Services Title */}
      <div className="services-title">
        <h2>خدمات</h2>
      </div>
      
      {/* Main Services - Two cards side by side */}
      <div className="main-services">
        <div className="service-card main-service">
          <div className="service-icon su-icon">Su</div>
          <div className="service-name" onClick={() => handleKartableClick('https://vigiato.net/', 'رسانه')} style={{ cursor: 'pointer' }}>رسانه</div>
        </div>
        <div className="service-card main-service" onClick={() => handleKartableClick('https://digiato.com/', 'کارتابل')} style={{ cursor: 'pointer' }}>
          <div className="service-icon k-icon">K</div>
          <div className="service-name">کارتابل</div>
        </div>
      </div>
      
      {/* Additional Services - Three cards in a row */}
      <div className="additional-services">
        <div className="service-card additional-service">
          <div className="service-icon v-icon">V</div>
          <div className="service-name">خدمت ۱</div>
        </div>
        <div className="service-card additional-service">
          <div className="service-icon v-icon">V</div>
          <div className="service-name">خدمت ۲</div>
        </div>
        <div className="service-card additional-service">
          <div className="service-icon v-icon">V</div>
          <div className="service-name">خدمت ۳</div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection; 