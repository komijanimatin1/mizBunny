import { Icon } from '@iconify/react';

function ServiceDetails() {
  return (
    <div className="w-full h-40 bg-[#E4F2FF] rounded-xl p-2.5 mx-auto shadow-sm flex flex-col gap-5">
      <div className="flex justify-around items-center">
        <div className="flex items-center gap-2.5">
          <img src="/room-logo.png" width={40} height={40} alt="اتاق دیجیتال" />
          <span>اتاق دیجیتال</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span>خدمات دریافتی</span>
          <Icon icon="fluent:chevron-left-12-filled" width="16" height="16" />
        </div>
      </div>
      <div className="pt-2.5 border-4 border-black flex justify-around">
        <div className="flex flex-col items-center justify-center">
          <span className="mb-2.5">اشتراک شما</span>
          <span className="text-base px-2 py-2 bg-[#CBE7FE] rounded-full text-center text-[#003FB8]">234 روز باقی مانده</span>  
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="mb-2.5">میزان سود شما</span>
          <span className="text-base px-2 py-2 bg-[#CBE7FE] rounded-full text-center text-[#003FB8]">۱۰۰,۰۰۰,۰۰۰ تومان</span>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails