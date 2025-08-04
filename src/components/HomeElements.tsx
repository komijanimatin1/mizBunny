import React from 'react';
import ServiceDetails from './ServiceDetails';
import ServicesSection from './ServicesSection';
import HorizontalScroll from './HorizontalScroll';
import './HomeElements.css';

const HomeElements = () => {
    return (
        <div className="home-elements">
            <ServiceDetails />
            <ServicesSection />
            <HorizontalScroll />
        </div>
    )
}

export default HomeElements;
