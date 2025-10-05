import React from 'react'
import { useTranslations } from 'next-intl'

export default function Banner() {
    const t = useTranslations('app');
    return (
        <div
            className="w-full h-32 p-4 flex flex-row justify-between items-center "
            style={{
                height: '144px !important',
                background: 'linear-gradient(0deg, #F2F8FF 0%, #FFF 0%, #CDE4FF 75.96%)'
            }}
        >

            {/* company details */}
            <div className="flex flex-col gap-4">

                {/* company logo */}
                <img src="/room-logo.png" alt="room-logo" className="w-12 h-12 rounded-full" />

                <div className="flex flex-col gap-2 text-xs line-height-normal">
                    {/* company name */}
                    <span className='font-medium text-[#0070F0]'>
                        {t('name')}
                    </span>
                    <p className=' font-bold text-[#003777]'>
                        {t('tagline')}
                    </p>
                </div>

            </div>

            {/* company illustration */}
            {/* <img src="/banner-illustration.png" alt="room-logo" style={{ width: '128px', height: '88px' }} /> */}
            <img src="/2.png" alt="room-logo" />

        </div>
    )
}
