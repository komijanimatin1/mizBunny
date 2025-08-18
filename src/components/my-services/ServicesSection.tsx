import { useInAppBrowser } from '../../hooks/useInAppBrowser';
import { Icon } from '@iconify/react';

const ServicesSection = () => {
  const { openBrowser } = useInAppBrowser();

  const handleServiceClick = async (url: string, title: string) => {
    try {
      await openBrowser(url, '_blank', `showurl=no,navigationbuttons=no,backbutton=yes,location=no,toolbar=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,footertitle=${title},menu=yes,hardwareback=yes,closebutton=yes`);
    } catch (err) {
      console.error('Failed to open:', err);
    }
  };

  return (
    <div className="w-full mt-2.5">
      {/* Services Title */}
      <div className="text-right mb-2.5 relative">
        <h2 className="text-xl font-bold text-[#333] m-0 inline-block bg-transparent px-2.5 relative z-10">خدمات</h2>
      </div>
      
      {/* Main Services - Two cards side by side */}
      <div className="flex flex-row justify-between mb-2.5 w-full">
        <div className="bg-[#F6F6F6] rounded-xl text-center transition-transform duration-200 ease-in-out flex-shrink-0 cursor-pointer hover:-translate-y-0.5 w-[49%] min-h-[90px] flex flex-col justify-center items-center gap-3" onClick={() => handleServiceClick('https://casie.dccim.ir/', 'کارتابل')}>
        <Icon icon="fluent:notepad-person-20-filled" width={32} height={32} />
          <div className="text-sm font-medium text-[#333]">کارتابل</div>
        </div>
        <div className="bg-[#F6F6F6] rounded-xl text-center transition-transform duration-200 ease-in-out flex-shrink-0 cursor-pointer hover:-translate-y-0.5 w-[49%] min-h-[90px] flex flex-col justify-center items-center gap-3" onClick={() => handleServiceClick('https://Media.dccim.ir/', 'رسانه')}>
          <Icon icon="fluent:video-clip-multiple-24-filled" width={32} height={32} />
          <div className="text-sm font-medium text-[#333]">رسانه</div>
        </div>
      </div>
      {/* Additional Services - Three cards in a row */}
      <div className="flex flex-row justify-between rounded-xl w-full">
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://cazieh-front.linuxchi.ir/services/counseling', 'مشاوره')}>
          <Icon icon="fluent:person-support-32-filled" width={24} height={24} className="w-10 h-10 text-base mb-2" />
          <div className="text-xs">مشاوره</div>
        </div>
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://cazieh-front.linuxchi.ir/services/course', 'آموزش')}>
          <Icon icon="fluent:chart-person-48-filled" width={24} height={24} />
          <div className="text-xs">آموزش</div>
        </div>
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://cazieh-front.linuxchi.ir/services/event', 'رویداد')}>
          <Icon icon="bi:calendar-check-fill" width={20} height={20} />
          <div className="text-xs">رویداد</div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection; 