import { useInAppBrowser } from '../hooks/useInAppBrowser';
import './ServicesSection.css';
import { Icon } from '@iconify/react';

const ServicesSection = () => {
  const { openBrowser } = useInAppBrowser();

  const handleKartableClick = async (url: string, title: string) => {
    try {
      await openBrowser(url, '_blank', `location=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,footertitle=${title},menu=yes,hardwareback=yes`);
    } catch (err) {
      console.error('Failed to open:', err);
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
        <div className="service-card main-service" onClick={() => handleKartableClick('https://cazieh-front.linuxchi.ir/', 'کارتابل')} style={{ cursor: 'pointer' }}>
        <Icon icon="fluent:notepad-person-20-filled" width="32 " height="32" />
          <div className="service-name">کارتابل</div>
        </div>
        <div className="service-card main-service" onClick={() => handleKartableClick('https://library-front.linuxchi.ir/', 'رسانه')} style={{ cursor: 'pointer' }}>
          <Icon icon="fluent:video-clip-multiple-24-filled" width="32" height="32"   />
          <div className="service-name">رسانه</div>
        </div>
      </div>
      {/* Additional Services - Three cards in a row */}
      <div className="additional-services">
        <div className="service-card additional-service" onClick={() => handleKartableClick('https://cazieh-front.linuxchi.ir/services/counseling', 'مشاوره')} style={{ cursor: 'pointer' }}>
          <Icon icon="fluent:person-support-32-filled" width="24" height="24" />
          <div className="service-name">مشاوره</div>
        </div>
        <div className="service-card additional-service" onClick={() => handleKartableClick('https://cazieh-front.linuxchi.ir/services/course', 'آموزش')} style={{ cursor: 'pointer' }}>
          <Icon icon="fluent:chart-person-48-filled" width="24" height="24"  />
          <div className="service-name">آموزش</div>
        </div>
        <div className="service-card additional-service" onClick={() => handleKartableClick('https://cazieh-front.linuxchi.ir/services/event', 'رویداد')} style={{ cursor: 'pointer' }}>
          <Icon icon="bi:calendar-check-fill" width="20" height="20" />
          <div className="service-name">رویداد</div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection; 