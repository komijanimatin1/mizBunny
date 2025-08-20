import { useInAppBrowser } from '../../hooks/useInAppBrowser';
 

const ServicesSection = () => {
  const { openBrowser } = useInAppBrowser();

  const handleServiceClick = async (url: string, title: string) => {
    try {
      await openBrowser(
        url,
        '_blank',
        `showurl=no,navigationbuttons=no,backbutton=yes,location=no,toolbar=no,zoom=no,fullscreen=yes,footercolor=#F0F0F0,footer=yes,footertitle=${title},menu=yes,hardwareback=yes,closebutton=yes,footerheight=86`
      );
    } catch (err) {
      console.error('Failed to open:', err);
    }
  };

  return (
    <div className="w-full">
      {/* Services Title */}
      <div className="text-right mb-2.5 relative">
        <span className="text-14px font-bold text-14px mb-3 text-[#1f2937]">خدمات</span>
      </div>
      
      {/* Main Services - Two cards side by side */}
      <div className="flex flex-row justify-between mb-2.5 w-full">
        <div className="bg-[#F6F6F6] rounded-xl text-center transition-transform duration-200 ease-in-out flex-shrink-0 cursor-pointer hover:-translate-y-0.5 w-[49%] min-h-[90px] flex flex-col justify-center items-center gap-3" onClick={() => handleServiceClick('https://casie.dccim.ir/', 'کارتابل')}>
          <img src="/icons/کارتابل.png" alt="کارتابل" className="w-8 h-8 aspect-square object-contain" />
          <div className="text-[14px] font-medium text-[#333]" style={{ fontStyle: 'normal', fontWeight: 500 }}>کارتابل</div>
        </div>
        <div className="bg-[#F6F6F6] rounded-xl text-center transition-transform duration-200 ease-in-out flex-shrink-0 cursor-pointer hover:-translate-y-0.5 w-[49%] min-h-[90px] flex flex-col justify-center items-center gap-3" onClick={() => handleServiceClick('https://Media.dccim.ir/', 'رسانه')}>
          <img src="/icons/رسانه.png" alt="رسانه" className="w-8 h-8 aspect-square object-contain" />
          <div className="text-[14px] font-medium text-[#333]" style={{ fontStyle: 'normal', fontWeight: 500 }}>رسانه</div>
        </div>
      </div>
      {/* Additional Services - Three cards in a row */}
      <div className="flex flex-row justify-between rounded-xl w-full">
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://service.tccim.ir/jobs', 'کاریابی')}>
          <img src="/icons/کاریابی.png" alt="کاریابی" className="w-8 h-8 aspect-square object-contain" />
          <div className="text-[12px] text-[#333]" style={{ fontStyle: 'normal', fontWeight: 400 }}>کاریابی</div>
        </div>
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://service.tccim.ir/business_opportunities', 'فرصت های تجاری')}>
          <img src="/icons/فرصت های تجاری.png" alt="فرصت های تجاری" className="w-8 h-8 aspect-square object-contain" />
          <div className="text-[12px] text-[#333]" style={{ fontStyle: 'normal', fontWeight: 400 }}>فرصت های تجاری</div>
        </div>
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://casie.dccim.ir/services/event', 'تقویم')}>
          <img src="/icons/تقویم.png" alt="تقویم" className="w-8 h-8 aspect-square object-contain" />
          <div className="text-[12px] text-[#333]" style={{ fontStyle: 'normal', fontWeight: 400 }}>تقویم</div>
        </div>
      </div>

      <div className="flex flex-row justify-between rounded-xl w-full mt-2.5">
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://casie.dccim.ir/services/counseling', 'مشاوره')}>
          <img src="/icons/مشاوره.png" alt="مشاوره" className="w-8 h-8 aspect-square object-contain" />
          <div className="text-[12px] text-[#333]" style={{ fontStyle: 'normal', fontWeight: 400 }}>مشاوره</div>
        </div>
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://dir.tccim.ir/', 'راهنمای تجاری')}>
          <img src="/icons/راهنمای تجاری.png" alt="راهنمای تجاری" className="w-8 h-8 aspect-square object-contain" />
          <div className="text-[12px] text-[#333]" style={{ fontStyle: 'normal', fontWeight: 400 }}>راهنمای تجاری</div>
        </div>
        <div className="w-[32%] bg-[#F6F6F6] rounded-xl min-h-20 flex gap-2 flex-col justify-center items-center cursor-pointer hover:-translate-y-0.5 transition-transform duration-200 ease-in-out" onClick={() => handleServiceClick('https://casie.dccim.ir/services/course', 'دوره ها')}>
          <img src="/icons/دوره ها.png" alt="دوره ها" className="w-8 h-8 aspect-square object-contain" />
          <div className="text-[12px] text-[#333]" style={{ fontStyle: 'normal', fontWeight: 400 }}>دوره ها</div>
        </div>
      </div>
    </div>
  );

};

export default ServicesSection; 