import React from 'react';
import { useLocale } from '../i18n/I18nProvider';

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useLocale();

  const toggleLanguage = () => {
    setLocale(locale === 'fa' ? 'en' : 'fa');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 bg-white rounded-lg shadow-md text-sm font-medium text-[#0070F0] hover:bg-gray-50 transition-colors"
    >
      {locale === 'fa' ? 'English' : 'فارسی'}
    </button>
  );
};

export default LanguageSwitcher;

