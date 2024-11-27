'use client'
 import { useState, useRef } from 'react';
 import Link from "next/link";

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
    <Link href={`/projects/test`} className="w-full h-full relative" scroll={false} onMouseEnter={startSlideshow} onMouseLeave={stopSlideshow} >
      <img
          src={images[currentIndex]}
          alt={alt}
          className={classes}
      />
      <div className="hoverLayer flex flex-col items-center justify-center absolute w-full h-full z-100 bg-[#00000091] text-[#ffffff] top-0 left-0" >
        <h2 className="font-cormorant_garamond text-2xl" >JOSHUA & NAYARA</h2>
        <h3 className="font-montserrat italic ">SANTORINI</h3>
      </div>
  </Link>

  );
}
