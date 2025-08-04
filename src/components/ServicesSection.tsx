import React from 'react';
import './ServicesSection.css';

const ServicesSection = () => {
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
          <div className="service-name">رسانه</div>
        </div>
        <div className="service-card main-service">
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