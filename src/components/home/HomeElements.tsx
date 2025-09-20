
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
            icon: "/third-party logos/padro.svg",
            url: "https://panel.podro.shop/",
            color: "#D9C5FF"
        },
        {
            id: 2,
            title: "کاریزما",
            details: "سرمایه گذاری",
            icon: "/third-party logos/charisma.png",
            url: "https://auth.charisma.ir",
            color: "#FFE6E6"
        },
        {
            id: 3,
            title: "فرادرس",  
            details: "مرجع آموزشی",
            icon: "/third-party logos/Faradars-Logo.png",
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
            icon: "/third-party logos/investoran.webp",
            url: "https://www.investorun.com/login",
            color: "#fff5c5"
        },
        {
            id: 2,
            title: "کارن کراود",
            details: "بورس و بازار مالی",
            icon: "/third-party logos/karencrowd.png",
            url: "https://www.karencrowd.com/accept-term/login",
            color: "#e6faff"
        },
        {
            id: 3,
            title: "همافرین",
            details: "فرایند سرمایه گذاری",
            icon: "/third-party logos/logo.f921aa91.png",
            url: "https://hamafarin.ir/account/login",
            color: "#f9c0c0"
        }
    ]
}


const HomeElements = () => {
    return (
        <div className="overflow-auto scrollbar-hide scroll-smooth bg-white w-full h-full rounded-2xl [&::-webkit-scrollbar]:hidden flex flex-col">
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
