import React, { useRef } from 'react';
import { useIonRouter } from '@ionic/react';

const FacilitiesScroll: React.FC<{ facilities: any }> = ({ facilities }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const ionRouter = useIonRouter();


  const handleItemClick = (url: string, title: string) => {
    // Find the facility data to pass to the transfer page
    const facility = facilities.facilities.find((f: any) => f.url === url);
    if (facility) {
      const queryParams = new URLSearchParams();
      queryParams.append('url', facility.url);
      queryParams.append('title', facility.title);
      queryParams.append('icon', facility.icon);
      queryParams.append('color', facility.color);
      ionRouter.push(`/transfer?${queryParams.toString()}`, 'forward');
    }
  };




  return (
    <div className="w-full">



      {/* title of facilities */}
      <div className="text-right rtl mb-3">
        <span className="text-sm font-semibold mb-3 text-[#1f2937]">{facilities.title}</span>
      </div>
      
      <div 
        className="flex overflow-x-scroll scrollbar-hide scroll-smooth gap-2.5 [&::-webkit-scrollbar]:hidden w-full"
        ref={scrollRef}
      >
        {facilities.facilities.map((facility: any) => (
          <div 
            key={facility.id} 
            className="flex-col w-[136px] min-w-[136px] max-w-[136px] flex-shrink-0 rounded-xl flex items-center cursor-pointer"
          >
            {/* Color box with icon */}
            <div 
              className="w-full h-16 md:h-30 rounded-xl mb-1.5 flex items-center justify-center"
              style={{ backgroundColor: facility.color }}
              onClick={() => handleItemClick(facility.url, facility.title)}
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center relative">
                <img 
                  src={facility.icon} 
                  alt={facility.title}
                  className=" h-8 object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              </div>
            </div>
            
            {/* Facility details */}
            <div className="flex flex-col gap-1 w-full">
              <div
                className="text-[#000000] text-[14px] font-medium leading-normal"
              >
                {facility.title}
              </div>
              <div 
                className="text-[#454545] text-[12px] font-medium leading-normal"
              >
                {facility.details}
              </div>
            </div>
          </div>
        ))}
      </div>
      


    </div>
  );
};

export default FacilitiesScroll;