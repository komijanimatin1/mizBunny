import { Icon } from "@iconify/react";
import "./HorizontalScroll.css";
import { useRef, useState, useEffect } from "react";
// @ts-ignore scroll-snap ships types but its DTS isn't declared as a module; ignore to use default import
import createScrollSnap from "scroll-snap";

export default function HorizontalScroll() {
  const snippets = [
    { id: 1, title: "رویداد تخصصی مدیریت بیزینس دیجیتال", cta: "کسب اطلاعات بیشتر" },
    { id: 2, title: "کارگاه آموزشی بازاریابی دیجیتال", cta: "ثبت نام کنید" },
    { id: 3, title: "سمینار استراتژی‌های رشد کسب و کار", cta: "مشاهده جزئیات" },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getMaxScroll = (container: HTMLDivElement) => {
    return container.scrollWidth - container.clientWidth;
  };

  const slideRefs = useRef<HTMLDivElement[]>([]);
  const intersectionRatiosRef = useRef<Map<Element, number>>(new Map());

  const getSlideWidth = (container: HTMLDivElement) => {
    const styles = getComputedStyle(container);
    const gapRaw = styles.getPropertyValue("column-gap") || styles.getPropertyValue("gap") || "0";
    const gap = parseInt(gapRaw, 10) || 0;
    return container.clientWidth + gap;
  };

  const getLogicalScrollLeft = (container: HTMLDivElement) => {
    const isRtl = (container.getAttribute("dir") || document.dir) === "rtl";
    const { scrollLeft, scrollWidth, clientWidth } = container;
    if (!isRtl) return scrollLeft;
    // Chrome/WebKit RTL: negative scrollLeft
    if (scrollLeft < 0) return -scrollLeft;
    // Firefox RTL: positive scrollLeft from max down to 0
    return scrollWidth - clientWidth - scrollLeft;
  };

  // Enable JS scroll snapping and detect active slide in RTL
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { bind, unbind } = createScrollSnap(container, {
      snapDestinationX: "100%",
      timeout: 100,
      duration: 300,
      threshold: 0.2,
      snapStop: true,
    });

    bind();

    // Robust active slide detection using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          intersectionRatiosRef.current.set(entry.target, entry.intersectionRatio);
        }
        // Find the observed slide with the highest current ratio
        let bestIndex = 0;
        let bestRatio = -1;
        slideRefs.current.forEach((el, idx) => {
          if (!el) return;
          const ratio = intersectionRatiosRef.current.get(el) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = idx;
          }
        });
        setActiveIndex(bestIndex);
      },
      { root: container, threshold: [0.35, 0.5, 0.65, 0.8, 0.95, 1] }
    );

    // Observe all slides
    slideRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      observer.disconnect();
      intersectionRatiosRef.current.clear();
      unbind();
    };
  }, []);

  const handleDotClick = (index: number) => {
    const el = slideRefs.current[index];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveIndex(index);
  };

  return (
    <div className="horizontal-scroll-container">
      <div className="horizontal-scroll" ref={scrollContainerRef} dir="rtl">
        {snippets.map((snippet, idx) => (
          <div
            key={snippet.id}
            className="snippet-card"
            ref={(el) => {
              if (el) slideRefs.current[idx] = el;
            }}
          >
            <div className="snippet-text">
              <h3 className="snippet-title">{snippet.title}</h3>
              <span className="snippet-cta">
                {snippet.cta}
                <Icon icon="fluent:chevron-left-24-filled" width="16" height="16" />
              </span>
            </div>
            <div className="snippet-illustration">
              <img src="/wireframe.svg" width={96} height={96} />
            </div>
          </div>
        ))}
      </div>

      <div className="horizontal-scroll-dots">
        {snippets.map((_, index) => (
          <Icon
            key={index}
            icon={
              index === activeIndex
                ? "fluent:circle-28-filled"
                : "fluent:circle-28-regular"
            }
            width="8"
            height="8"
            onClick={() => handleDotClick(index)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
}
