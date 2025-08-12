import ServiceDetails from './ServiceDetails';
import ServicesSection from './ServicesSection';
import HorizontalScroll from './HorizontalScroll';
import FacilitiesScroll from './FacilitiesScroll';
import './HomeElements.css';

const facilities = {
    title: "لجستیک",
    facilities: [
        {
            id: 1,
            title: "پادرو",
            icon: "https://www.podro.shop/logo/Logo.svg",
            url: "https://panel.podro.shop/",
            color: "#D9C5FF"
        },
        {
            id: 2,
            title: "کاریزما",
            icon: "https://iranbroker.net/wp-content/uploads/2023/02/charisma.png",
            url: "https://auth.charisma.ir",
            color: "#FFE6E6"
        },
        {
            id: 3,
            title: "فرادرس",
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
                title:"اینوستوران",
                icon: "https://shenasa.ir/wp-content/uploads/2024/09/%D8%A7%DB%8C%D9%86%D9%88%D8%B3%D8%AA%D9%88%D8%B1%D8%A7%D9%86.png",
                url: "https://www.investorun.com/login",
                color: "#fff5c5"
            }, 
            {
                id: 2,
                title: "کارن کراود",
                icon: "https://karboom.io/storage/employers/logo/8rg2reNiVTHi3WtyCXrbCtXKcxudVynh1PaehH2E.png",
                url: "https://www.karencrowd.com/accept-term/login",
                color: "#e6faff"
            }, 
            {
                id: 3,
                title: "همافرین",
                icon: "https://hamafarin.ir/_next/static/media/logo.f921aa91.png",
                url: "https://hamafarin.ir/account/login",
                color: "#f9c0c0"
            } 
        ]
    }


const HomeElements = () => {
    return (
        <div className="home-elements">
            <ServiceDetails />
            <ServicesSection />
            <HorizontalScroll />
            <FacilitiesScroll facilities={facilities} />
            <FacilitiesScroll facilities={financialServices} />
        </div>
    )
}

export default HomeElements;
