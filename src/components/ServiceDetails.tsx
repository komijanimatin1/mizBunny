import './ServiceDetails.css';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';

function ServiceDetails() {
  return (
    <div className="service-details">
      <div className="detail-titles">
        <div>
          <img src="/room-logo.png" width={40} height={40} alt="اتاق دیجیتال" />
        <span>اتاق دیجیتال</span>
        </div>
        <div>
        <span>خدمات دریافتی</span>
        <IonIcon icon={chevronBackOutline} className="back-icon"></IonIcon>
        </div>
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