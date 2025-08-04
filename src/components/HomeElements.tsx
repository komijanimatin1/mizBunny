import React from 'react';
import ServiceDetails from './ServiceDetails';
import ServicesSection from './ServicesSection';
import './HomeElements.css';

const HomeElements = () => {
    return (
        <div className="home-elements">
            <ServiceDetails />
            <ServicesSection />
        </div>
    )
}

export default HomeElements;
