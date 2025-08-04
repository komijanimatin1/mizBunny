import React from 'react';
import './ServiceDetails.css';

function ServiceDetails() {
  return (
    <div className="service-details">
      <div className="detail-titles">
        <span>خدمات دریافتی</span>
        <span>اتاق دیجیتال</span>
      </div>
      <div className="user-informations">
        <div>
          <span>اشتراک شما</span>
          <span className='user-information-numbers'>234 روز باقی مانده</span>
        </div>
        <div>
          <span>میزان سود شما</span>
          <span className='user-information-numbers'>۱۰۰,۰۰۰,۰۰۰ تومان</span>
        </div>
      </div>

    </div>
  )
}

export default ServiceDetails