// ExpandedCardCarousel.tsx
// Automatically scrolls through images unless the user breathes near it.
// Also has buttons. users love buttons.

import React, { useEffect, useRef, useState } from 'react';

interface CarouselProps {
  images: string[];
  isActive: boolean;
  setFullscreenImage: (img: string | null) => void;
}

const ExpandedCardCarousel: React.FC<CarouselProps> = ({
  images,
  isActive,
  setFullscreenImage,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [canAutoScroll, setCanAutoScroll] = useState(false); // toggle for magic
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Step 1: Figure out if scrolling is even allowed. 
  useEffect(() => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;

    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons(); // hope for the best

    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [images]);

  // Step 2: Determine scroll eligibility. Because accessibility matters!!
  const updateScrollButtons = () => {
    if (!carouselRef.current) return;
    const el = carouselRef.current;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  // Step 3: Auto-scroll, people can’t be trusted to click
  useEffect(() => {
    if (!isActive || images.length <= 1 || !canAutoScroll) return;

    intervalRef.current = setInterval(() => {
      if (carouselRef.current) {
        const visibleWidth = carouselRef.current.clientWidth;
        const scrollWidth = carouselRef.current.scrollWidth;
        const totalScroll = scrollWidth - visibleWidth;
        const maxIndex = Math.floor(totalScroll / visibleWidth);
        const newIndex = (scrollIndex + 1) % (maxIndex + 1);

        carouselRef.current.scrollTo({
          left: newIndex * visibleWidth,
          behavior: 'smooth',
        });

        setScrollIndex(newIndex);
      }
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scrollIndex, images, isActive, canAutoScroll]);

  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current); // you win this round, user
  };

  const handleMouseLeave = () => {
    if (canAutoScroll && isActive && images.length > 1) {
      setScrollIndex((prev) => prev + 1); // good luck keeping this in sync
    }
  };

  const openFullscreen = (src: string) => {
    setFullscreenImage(src);
  };

  const scrollByCard = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const visibleWidth = carouselRef.current.clientWidth;
    const delta = dir === 'left' ? -visibleWidth : visibleWidth;
    carouselRef.current.scrollBy({ left: delta, behavior: 'smooth' });

    setTimeout(updateScrollButtons, 300); // hacky but it works
  };

  // Button aesthetics so the UI looks cool
  const navBtnStyle: React.CSSProperties = {
    height: '200px',
    width: '40px',
    minWidth: '32px',
    background: 'rgb(173, 158, 142)',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '20px',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
    marginTop: '-25px',
    boxShadow: 'inset 0px 0px #0a0a0a, inset 0px 0px #fff, inset 0px 0px grey, inset 0px 0px #dfdfdf',
    color: 'white',
  };

  const navBtnHoverStyle: React.CSSProperties = {
    background: '#d0d0d0',
  };

  const [hoveredBtn, setHoveredBtn] = useState<'left' | 'right' | null>(null);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        gap: '0px',
        boxSizing: 'border-box',
      }}
    >
      <button
        onClick={() => scrollByCard('left')}
        disabled={!canScrollLeft}
        style={{
          ...navBtnStyle,
          ...(hoveredBtn === 'left' ? navBtnHoverStyle : {}),
          ...(canScrollLeft
            ? {}
            : {
                opacity: 0.2,
                cursor: 'default',
                pointerEvents: 'none',
              }),
        }}
        onMouseEnter={() => setHoveredBtn('left')}
        onMouseLeave={() => setHoveredBtn(null)}
      >
        {'<'}
      </button>

      <div
        ref={carouselRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          justifyContent: images.length < 2 ? 'center' : 'flex-start',
          alignItems: 'center',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          width: '100%',
          height: '225px',
          backgroundColor: 'rgb(173, 158, 142, 0.2)',
          padding: '0 8px',
          boxSizing: 'border-box',
          gap: '8px',
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            onClick={() => openFullscreen(src)}
            style={{
              width: 'clamp(160px, 30vw, 320px)',
              height: 'clamp(135px, 17vw, 185px)',
              objectFit: 'cover',
              cursor: 'pointer',
              borderRadius: '8px',
              flexShrink: 0,
              transition: 'transform 0.2s ease',
              marginTop: -25,
            }}
            alt={`project-image-${index}`}
          />
        ))}
      </div>

      <button
        onClick={() => scrollByCard('right')}
        disabled={!canScrollRight}
        style={{
          ...navBtnStyle,
          ...(hoveredBtn === 'right' ? navBtnHoverStyle : {}),
          ...(canScrollRight
            ? {}
            : {
                opacity: 0.2,
                cursor: 'default',
                pointerEvents: 'none',
              }),
          right: '10px',
        }}
        onMouseEnter={() => setHoveredBtn('right')}
        onMouseLeave={() => setHoveredBtn(null)}
      >
        {'>'}
      </button>
    </div>
  );
};

export default ExpandedCardCarousel;
