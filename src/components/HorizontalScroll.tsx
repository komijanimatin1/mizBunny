import React, { useState, useRef } from 'react';
import './HorizontalScroll.css';

const HorizontalScroll: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const snippets = [
    {
      id: 1,
      title: "رویداد تخصصی مدیریت بیزینس دیجیتال",
      cta: "کسب اطلاعات بیشتر",
      description: "اولین رویداد تخصصی در حوزه مدیریت کسب و کار دیجیتال"
    },
    {
      id: 2,
      title: "کارگاه آموزشی بازاریابی دیجیتال",
      cta: "ثبت نام کنید",
      description: "آموزش تکنیک‌های نوین بازاریابی در فضای دیجیتال"
    },
    {
      id: 3,
      title: "سمینار استراتژی‌های رشد کسب و کار",
      cta: "مشاهده جزئیات",
      description: "راهنمای کامل برای رشد و توسعه کسب و کار شما"
    }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.offsetWidth;
      const itemWidth = scrollRef.current.offsetWidth;
      // For RTL scroll, we need to calculate the index differently
      const newIndex = Math.round((maxScrollLeft - scrollLeft) / itemWidth);
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.offsetWidth;
      const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.offsetWidth;
      // For RTL scroll, calculate the target scroll position
      const targetScrollLeft = maxScrollLeft - (index * itemWidth);
      scrollRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="horizontal-scroll-container">
      <div 
        className="horizontal-scroll"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {snippets.map((snippet) => (
          <div key={snippet.id} className="snippet-card">
            <div className="snippet-content">
              <div className="snippet-text">
                <h3 className="snippet-title">{snippet.title}</h3>
                <p className="snippet-description">{snippet.description}</p>
                <button className="snippet-cta">
                  {snippet.cta}
                  <span className="cta-arrow">←</span>
                </button>
              </div>
              <div className="snippet-illustration">
                <div className="tablet-screen">
                  <div className="wireframe-content">
                    <div className="text-block"></div>
                    <div className="checkbox-group">
                      <div className="checkbox"></div>
                      <div className="checkbox"></div>
                    </div>
                    <div className="image-placeholder">X</div>
                  </div>
                  <div className="stylus-hand"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll Indicator Dots */}
      <div className="scroll-indicator">
        {snippets.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to snippet ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
