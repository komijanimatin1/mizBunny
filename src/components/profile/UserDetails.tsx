import { useAuthStore } from '../../stores/authStore';

function UserDetails() {
  const { user } = useAuthStore();

  return (
    <div className="relative w-full flex justify-center mt-[38px]">
      <div
        className="absolute -top-4 w-10 h-10 rounded-full bg-[#F3F4F6] border border-[#E5E7EB]"
      >
        {user?.avatar ? (
          <img src={user.avatar} alt="user-avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="w-full h-full flex items-center justify-center text-lg text-[#1E1E1E]">
            {(user?.name?.[0] || '') + '\u200C' + (user?.lastName?.[0] || '')}
          </span>
        )}
      </div>

      <div
        className="w-full bg-[#E4F2FF] rounded-xl flex flex-col items-center p-4 gap-4"
        // style={{ width: 342, height: 130, padding: '32px 16px 16px 16px', gap: 24 }}
      >
        <div
          className="text-[12px] text-[#1E1E1E] mt-2"
          // style={{ color: '#1E1E1E', fontFamily: 'IRANYekanX', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal' }}
        >
          {user?.name || ''} {user?.lastName || ''}
        </div>

        <div className="w-full flex justify-around">
          <div className="flex flex-col items-center text-xs font-normal leading-normal ">
            <span
              className="mb-1 text-[12px] text-[#1E1E1E]"
              // style={{ color: '#1E1E1E', fontFamily: 'IRANYekanX', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal' }}
            >
              میزان سود
            </span>
            <span
              className="px-3 py-1 rounded-full text-[12px] bg-[#CBE7FE] text-[#003FB8]"
              // style={{ background: '#CBE7FE', color: '#003FB8', fontFamily: 'IRANYekanXFaNum', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}
            >
              ۱,۰۰۰,۰۰۰ تومان
            </span>
          </div>
          <div className="flex flex-col items-center text-xs font-normal leading-normal">
            <span
              className="mb-1 text-[12px] text-[#1E1E1E]"
              // style={{ color: '#1E1E1E', fontFamily: 'IRANYekanX', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal' }}
            >
              اشتراک شما
            </span>
            <span
              className="px-3 py-1 rounded-full text-[12px] bg-[#CBE7FE] text-[#003FB8]"
              // style={{ background: '#CBE7FE', color: '#003FB8', fontFamily: 'IRANYekanXFaNum', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}
            >
              ۲۳۴ روز باقی مانده
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;


