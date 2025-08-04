import React, { useRef } from 'react';
import './FacilitiesScroll.css';

const FacilitiesScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const facilities = [
    {
      id: 1,
      name: "پادرو",
      icon: "https://s3.eseminar.tv/upload/host/1692004879-favicon.jpg",
      color: "#D9C5FF"
    },
    {
      id: 2,
      name: "کاریزما",
      icon: "https://iranbroker.net/wp-content/uploads/2023/02/charisma.png",
      color: "#FFE6E6"
    },
    {
      id: 3,
      name: "فرادرس",
      icon: "https://logoyab.com/wp-content/uploads/2024/07/Faradars-Logo-1030x1030.png",
      color: "#D1E0FE"
    }
  ];



  return (
    <div className="facilities-scroll-container">
      <div className="facilities-title">
        <h2>رفاهیات</h2>
      </div>
      
      <div 
        className="facilities-scroll"
        ref={scrollRef}
      >
        {facilities.map((facility) => (
          <div 
            key={facility.id} 
            className="facility-card"
            style={{ backgroundColor: facility.color }}
          >
            <div className="facility-content">
              <div className="facility-icon">
                <img 
                  src={facility.icon} 
                  alt={facility.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="fallback-icon hidden">
                  {facility.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      

    </div>
  );
};

export default FacilitiesScroll;