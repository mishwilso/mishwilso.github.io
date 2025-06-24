import React, { useEffect, useRef, useState } from 'react';

interface CarouselProps {
  images: string[];
  isActive: boolean;
  setFullscreenImage: (img: string | null) => void;

}

const ExpandedCardCarousel: React.FC<CarouselProps> = ({ images, isActive, setFullscreenImage }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive || images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const visibleWidth = carouselRef.current.clientWidth;
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
  }, [scrollIndex, images, isActive]);

  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    setScrollIndex((prev) => prev + 1); // resume autoscroll trigger
  };

  const openFullscreen = (src: string) => {
    setFullscreenImage(src);
  };

  return (
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
        height: '225px', // Carousel is taller than images to create top/bottom padding
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxSizing: 'border-box',
        padding: '0 8px', // Only left/right padding
        gap: '8px',
    }}
    >
    {images.map((src, index) => (
        <img
        key={index}
        src={src}
        onClick={() => openFullscreen(src)}
        style={{
            width: '320px',
            height: '185px',
            objectFit: 'cover',
            cursor: 'pointer',
            borderRadius: '8px',
            flexShrink: 0,
        }}
        alt={`project-image-${index}`}
        />
    ))}
    </div>

  );
};

export default ExpandedCardCarousel;
