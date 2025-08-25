
import ServicesSection from '../my-services/ServicesSection';
import HorizontalScroll from '../ui/HorizontalScroll';
import FacilitiesScroll from '../third-party/FacilitiesScroll';
import Banner from './Banner';

const facilities = {
    title: "رفاهیات",
    facilities: [
        {
            id: 1,
            title: "پادرو",
            details: "سرویس حمل و نقل",
            icon: "https://www.podro.shop/logo/Logo.svg",
            url: "https://panel.podro.shop/",
            color: "#D9C5FF"
        },
        {
            id: 2,
            title: "کاریزما",
            details: "سرمایه گذاری",
            icon: "https://iranbroker.net/wp-content/uploads/2023/02/charisma.png",
            url: "https://auth.charisma.ir",
            color: "#FFE6E6"
        },
        {
            id: 3,
            title: "فرادرس",  
            details: "مرجع آموزشی",
            icon: "https://logoyab.com/wp-content/uploads/2024/07/Faradars-Logo-1030x1030.png",
            url: "https://faradars.org/register",
            color: "#D1E0FE"
        }
    ]
};

const financialServices = {
    title: "خدمات مالی",
    facilities: [
        {
            id: 1,
            title: "اینوستوران",
            details: "سرمایه گذاری",
            icon: "https://shenasa.ir/wp-content/uploads/2024/09/%D8%A7%DB%8C%D9%86%D9%88%D8%B3%D8%AA%D9%88%D8%B1%D8%A7%D9%86.png",
            url: "https://www.investorun.com/login",
            color: "#fff5c5"
        },
        {
            id: 2,
            title: "کارن کراود",
            details: "بورس و بازار مالی",
            icon: "https://karboom.io/storage/employers/logo/8rg2reNiVTHi3WtyCXrbCtXKcxudVynh1PaehH2E.png",
            url: "https://www.karencrowd.com/accept-term/login",
            color: "#e6faff"
        },
        {
            id: 3,
            title: "همافرین",
            details: "فرایند سرمایه گذاری",
            icon: "https://hamafarin.ir/_next/static/media/logo.f921aa91.png",
            url: "https://hamafarin.ir/account/login",
            color: "#f9c0c0"
        }
    ]
}


const HomeElements = () => {
    return (
        <div className="overflow-auto scrollbar-hide scroll-smooth bg-white w-full h-[calc(100%-theme(spacing.14))] rounded-2xl [&::-webkit-scrollbar]:hidden flex flex-col mt-16">
            <Banner/>
            <div className="flex flex-col gap-4 p-4 bg-transparent">
                <ServicesSection />
                <HorizontalScroll />
                <div className="flex flex-col gap-3 border border-[#F4F4F4] p-3 rounded-xl">
                    <FacilitiesScroll facilities={facilities} />
                </div>
                <div className="flex flex-col gap-3 border border-[#F4F4F4] p-3 rounded-xl">
                    <FacilitiesScroll facilities={financialServices} />
                </div>
            </div>
        </div>
    )
}

export default HomeElements;
