import { useTranslations } from 'next-intl';
import ServicesSection from '../my-services/ServicesSection';
import HorizontalScroll from '../ui/HorizontalScroll';
import FacilitiesScroll from '../third-party/FacilitiesScroll';
import Banner from './Banner';

const HomeElements = () => {
    const t = useTranslations('thirdParty');
    const facilities = {
        title: t('title'),
        facilities: [
            {
                id: 1,
                title: t('services.internationalTrade'),
                details: t('services.internationalTradeDesc'),
                icon: "/third-party logos/faratak.png",
                url: "https://faratak.com/business-services/",
                color: "#FFE6E6"
            },
            {
                id: 2,
                title: t('services.business'),
                details: t('services.businessDesc'),
                icon: "/third-party logos/padro.svg",
                url: "https://panel.podro.shop/auth/register",
                color: "#D9C5FF"
            },
        // {
        //     id: 2,
        //     title: "تامین مالی و سرمایه گذاری",
        //     details: "سرمایه گذاری",
        //     icon: "/third-party logos/charisma.png",
        //     url: "https://auth.charisma.ir",
        //     color: "#FFE6E6"
        // }

        // {
        //     id: 3,
        //     title: "فرادرس",  
        //     details: "مرجع آموزشی",
        //     icon: "/third-party logos/Faradars-Logo.png",
        //     url: "https://faradars.org/register",
        //     color: "#D1E0FE"
        // }
            ,
            {
                id: 1,
                title: t('services.financing'),
                details: t('services.financingDesc'),
                icon: "/third-party logos/investoran.webp",
                url: "https://www.investorun.com/login",
                color: "#fff5c5"
            }
            // ,
            // {
            //     id: 3,
            //     title: "همافرین",
            //     details: "فرایند سرمایه گذاری",
            //     icon: "/third-party logos/logo.f921aa91.png",
            //     url: "https://hamafarin.ir/account/login",
            //     color: "#f9c0c0"
            // },
            // {
            //     id: 2,
            //     title: "",
            //     details: "خدمات سرمایه‌گذاری",
            //     icon: "/third-party logos/karencrowd.png",
            //     url: "https://www.karencrowd.com/accept-term/login",
            //     color: "#e6faff"
            // }
        ]
    };

    return (
        <div className="overflow-auto scrollbar-hide scroll-smooth bg-white w-full h-full rounded-2xl [&::-webkit-scrollbar]:hidden flex flex-col">
            <Banner />
            <div className="flex flex-col gap-4 p-4 bg-transparent">
                <ServicesSection />
                <HorizontalScroll />
                <div className="flex flex-col gap-3 border border-[#F4F4F4] p-3 rounded-xl">
                    <FacilitiesScroll facilities={facilities} />
                </div>
                {/* <div className="flex flex-col gap-3 border border-[#F4F4F4] p-3 rounded-xl">
                    <FacilitiesScroll facilities={financialServices} />
                </div> */}
            </div>
        </div>
    )
}

export default HomeElements;
