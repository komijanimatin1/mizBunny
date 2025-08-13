import { Icon } from '@iconify/react';

function ServiceDetails() {
  return (
    <div className="w-full mx-auto bg-[#E4F2FF] rounded-xl p-4 flex flex-col items-end gap-2">
      <div className="flex justify-around items-center w-full">
        <div className="flex items-center gap-2">
          <img src="/room-logo.png" width={32} height={32} alt="اتاق دیجیتال" className="sm:w-10 sm:h-10" />
          <span className="text-sm sm:text-base font-semibold font-size-14">اتاق دیجیتال</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-semibold font-size-12">خدمات دریافتی</span>
          <Icon icon="fluent:chevron-left-12-filled" width="14" height="14" className="sm:w-4 sm:h-4" />
        </div>
      </div>
      
      {/* Blue line from Figma */}
      <div className="w-full h-[1px] bg-[#D5EBFF] self-center"></div>
      
      <div className="flex justify-around w-full">
        <div className="flex flex-col items-center justify-between gap-1">
          <span className="text-xs sm:text-sm mb-2 text-gray-700">اشتراک شما</span>
          <span className="text-xs sm:text-sm px-3 py-1.5 bg-[#CBE7FE] rounded-full text-center text-[#003FB8]">234 روز باقی مانده</span>  
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm mb-2 text-gray-700">میزان سود شما</span>
          <span className="text-xs sm:text-sm px-3 py-1.5 bg-[#CBE7FE] rounded-full text-center text-[#003FB8]">۱۰۰,۰۰۰,۰۰۰ تومان</span>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails