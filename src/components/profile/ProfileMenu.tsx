import React from 'react';

type ProfileMenuProps = {
  onLogout: () => void;
  onOpenDetails?: () => void;
  onOpenCertificates?: () => void;
  onOpenReceipts?: () => void;
  onOpenSettings?: () => void;
};

type MenuItem = {
  title: string;
  iconSrc: string;
  onClick?: () => void;
  isDestructive?: boolean;
};

const arrowLeftSrc = '/fluent--arrow-left-24-filled.svg';

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  onLogout,
  onOpenDetails,
  onOpenCertificates,
  onOpenReceipts,
  onOpenSettings,
}) => {
  const items: MenuItem[] = [
    {
      title: 'اطلاعات تکمیلی',
      iconSrc: '/icons/profile-icons/Person%20Info.svg',
      onClick: onOpenDetails,
    },
    {
      title: 'گواهی ها',
      iconSrc: '/icons/profile-icons/Certificate.svg',
      onClick: onOpenCertificates,
    },
    {
      title: 'رسید خدمات',
      iconSrc: '/icons/profile-icons/Receipt.svg',
      onClick: onOpenReceipts,
    },
    {
      title: 'تنظیمات',
      iconSrc: '/icons/profile-icons/Settings.svg',
      onClick: onOpenSettings,
    },
  ];

  return (
    <div className="rounded-xl bg-white overflow-hidden border border-[#F4F4F4]">
      {items.map((item, index) => (
        <React.Fragment key={item.title}>
          <button
            type="button"
            onClick={item.onClick}
            className="w-full flex items-center justify-between p-4 bg-white"
          >
            <span className="flex items-center gap-3">
              <img src={item.iconSrc} alt="" className="w-5 h-5" />
              <span className="text-[15px] text-[#111827]">{item.title}</span>
            </span>
            <img src={arrowLeftSrc} alt="" className="w-5 h-5 opacity-50" />
          </button>
          <div className={index === items.length - 1 ? 'hidden' : 'w-4/5 h-px bg-[#F4F4F4] mx-auto'} />
        </React.Fragment>
      ))}

      <div className="w-4/5 h-px bg-[#F4F4F4] mx-auto" />
      <button
        type="button"
        onClick={() => {
          if (window.confirm('آیا مطمئن هستید می‌خواهید خارج شوید؟')) {
            onLogout();
          }
        }}
        className="w-full flex items-center justify-between p-4 bg-white text-red-600"
      >
        <span className="flex items-center gap-3">
          <img src={'/icons/profile-icons/Sign%20Out.svg'} alt="" className="w-5 h-5" />
          <span className="text-[15px]">خروج از حساب</span>
        </span>
        <img src={arrowLeftSrc} alt="" className="w-5 h-5 opacity-70" />
      </button>
    </div>
  );
};

export default ProfileMenu;


