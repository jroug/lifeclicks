'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { useRef } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';

 

interface SlideshowImageProps {
  mediaSources: ProjectMedia[];
  title: string;
  place: string;
  uri: string;
}

export default function SlideshowImage({ mediaSources, title, place, uri }: SlideshowImageProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  const handleMouseEnter = () => {
    // console.log('handleMouseEnter');
    if (swiperRef.current && swiperRef.current.params.autoplay && typeof swiperRef.current.params.autoplay !== 'boolean') {
      swiperRef.current.params.autoplay.delay = 500; // Safely access the delay property
      swiperRef.current.autoplay?.start(); // Start autoplay
    }
  };

  const handleMouseLeave = () => {
    // console.log('handleMouseLeave');
    swiperRef.current?.autoplay?.stop(); // Stop autoplay
  };

  return (
    <Link href={uri} className="w-full h-full relative group homeslide" scroll={false}>
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={1}
        effect="fade"
        loop={ !mediaSources[0].postMimeType.startsWith('video') }
        className="w-full h-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Capture the Swiper instance
      >
        {mediaSources.map((media, index) => (
          <SwiperSlide key={`slide-${index}`}>
            {media.postMimeType.startsWith('video') ? (
              <video
                src={media.postExcerpt} // Video source sent to postExcerpt due to bug in GraphQL field
                className="w-full h-full object-cover aspect-[74/97]"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={media.fullFileUrl}
                alt={title}
                className="w-full h-full object-cover aspect-[74/97]"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="hoverLayer flex flex-col items-center justify-center absolute w-full h-full z-10 bg-[#00000091] text-[#ffffff] top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="font-cormorant_garamond text-xl md:text-2xl uppercase">{title}</h2>
        <h3 className="font-montserrat italic text-xs md:text-sm uppercase">{place}</h3>
      </div>
    </Link>
  );
}
