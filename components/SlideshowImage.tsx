'use client'
 import { useState, useRef } from 'react';

interface SlideshowImageProps {
  images: string[];
  alt: string;
  classes: string;
}

export default function SlideshowImage({ images, alt, classes }: SlideshowImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSlideshow = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      // console.log('setInterval');
    }, 1000); // Change image every 2 seconds
  };

  const stopSlideshow = () => {
    if (intervalRef.current) {
      // console.log('clearInterval');
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <img
      src={images[currentIndex]}
      alt={alt}
      onMouseEnter={startSlideshow}
      onMouseLeave={stopSlideshow}
      className={classes}
    />
  );
}
