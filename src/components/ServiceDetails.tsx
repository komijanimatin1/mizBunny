import React from 'react';
import './ServiceDetails.css';

function ServiceDetails() {
  return (
    <div className="service-details">
      <div className="detail-titles">
        <h3>خدمات دریافتی</h3>
        <h3>اتاق دیجیتال</h3>
      </div>
      <div className="user-informations">
        <div>
          <h3>اشتراک شما</h3>
          <span>234 روز باقی مانده</span>
        </div>
        <div>
          <h3>میزان سود شما</h3>
          <span>۱۰۰,۰۰۰,۰۰۰ تومان</span>
        </div>
      </div>
      
    </div>
  )
}

export default ServiceDetails