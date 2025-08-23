import { useInAppBrowser } from '../../hooks/useInAppBrowser';
 

const ServicesSection = () => {
  const { openBrowser } = useInAppBrowser();

  const handleServiceClick = async (url: string, title: string) => {
    try {
      await openBrowser(
        url,
        '_blank',
        `showurl=no,navigationbuttons=no,backbutton=yes,location=no,toolbar=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,footertitle=${title},menu=yes,hardwareback=yes,closebutton=yes,footerheight=80`
      );
    } catch (err) {
      console.error('Failed to open:', err);
    }
  };

  return (
    <div className="w-full">
      {/* Services Title */}
      <div className="text-right mb-2.5 relative">
        <span className="text-sm font-semibold mb-3 text-[#1f2937]" >خدمات</span>
      </div>
      
      {/* Main Services - Two cards side by side */}
      <div className="flex flex-row justify-between mb-2.5 w-full">
        <div className="h-28 bg-[#F6F6F6] rounded-xl text-center transition-transform duration-200 ease-in-out flex-shrink-0 cursor-pointer hover:-translate-y-0.5 w-[49%] min-h-[90px] flex flex-col justify-center items-center gap-3" onClick={() => handleServiceClick('https://casie.dccim.ir/', 'کارتابل')}>
          <div className="flex flex-col items-center">
            <img src="/icons/services-icons/کارتابل.png" alt="کارتابل" className="w-8 h-8 aspect-square object-contain" />
            <div className="text-[14px] font-medium text-[#333] font-normal" >کارتابل</div>
          </div>
        </div>
        <div className="h-28 bg-[#F6F6F6] rounded-xl text-center transition-transform duration-200 ease-in-out flex-shrink-0 cursor-pointer hover:-translate-y-0.5 w-[49%] min-h-[90px] flex flex-col justify-center items-center gap-3" onClick={() => handleServiceClick('https://Media.dccim.ir/', 'رسانه')}>
          <div className="flex flex-col items-center">
            <img src="/icons/services-icons/رسانه.png" alt="رسانه" className="w-8 h-8 aspect-square object-contain" />
            <div className="text-[14px] font-medium text-[#333] font-normal" >رسانه</div>
          </div>
        </div>
      </div>
      {/* Additional Services - Three cards in a row */}
      <div className="flex flex-row justify-between rounded-xl w-full">
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://service.tccim.ir/jobs', 'کاریابی')}>
          <div className="flex flex-col items-center">
            <img src="/icons/services-icons/کاریابی.png" alt="کاریابی" className="w-8 h-8 aspect-square object-contain" />
            <div className="text-[12px] text-[#333] font-normal" >کاریابی</div>
          </div>
        </div>
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://service.tccim.ir/business_opportunities', 'فرصت های تجاری')}>
          <div className="flex flex-col items-center">
            <img src="/icons/services-icons/فرصت های تجاری.png" alt="فرصت های تجاری" className="w-8 h-8 aspect-square object-contain" />
            <div className="text-[12px] text-[#333] font-normal" >فرصت های تجاری</div>
          </div>
        </div>
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://casie.dccim.ir/services/event', 'تقویم')}>
          <div className="flex flex-col items-center">
            <img src="/icons/services-icons/تقویم.png" alt="تقویم" className="w-8 h-8 aspect-square object-contain" />
            <div className="text-[12px] text-[#333] font-normal" >تقویم</div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between rounded-xl w-full mt-2.5">
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://casie.dccim.ir/services/counseling', 'مشاوره')}>
          <div className="flex flex-col items-center">
            <img src="/icons/services-icons/مشاوره.png" alt="مشاوره" className="w-8 h-8 aspect-square object-contain" />
            <div className="text-[12px] text-[#333] font-normal" >مشاوره</div>
          </div>
        </div>
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://dir.tccim.ir/', 'راهنمای تجاری')}>
          <div className="flex flex-col items-center">
            <img src="/icons/services-icons/راهنمای تجاری.png" alt="راهنمای تجاری" className="w-8 h-8 aspect-square object-contain" />
            <div className="text-[12px] text-[#333] font-normal" >راهنمای تجاری</div>
          </div>
        </div>
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://casie.dccim.ir/services/course', 'دوره ها')}>
          <div className="flex flex-col items-center">
            <img src="/icons/services-icons/دوره ها.png" alt="دوره ها" className="w-8 h-8 aspect-square object-contain" />
            <div className="text-[12px] text-[#333] font-normal" >دوره ها</div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ServicesSection; 