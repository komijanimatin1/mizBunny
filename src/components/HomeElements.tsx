import React from 'react';
import ServiceDetails from './ServiceDetails';
import ServicesSection from './ServicesSection';
import HorizontalScroll from './HorizontalScroll';
import FacilitiesScroll from './FacilitiesScroll';
import './HomeElements.css';

const HomeElements = () => {
    return (
        <div className="home-elements">
            <ServiceDetails />
            <ServicesSection />
            <HorizontalScroll />
            <FacilitiesScroll />
            <FacilitiesScroll />
        </div>
    )
}

export default HomeElements;
