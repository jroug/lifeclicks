'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { useRef } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import Image from 'next/image';
import poster from '@/public/images/loader-video.png'; // Adjust the path
import { useGlobalState } from "@/context/PageAnimatePresence"; 

interface SlideshowImageProps {
  mediaSources: ProjectMedia[];
  title: string;
  place: string;
  uri: string;
  idx: number;
  initialImagesNumber: number;
}

export default function SlideshowImage({ mediaSources, title, place, uri, idx, initialImagesNumber }: SlideshowImageProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  const { isMobile } = useGlobalState();

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
      <div className="w-full h-full" >
        {
            mediaSources[0].postMimeType?.startsWith('video') 
              ? 
                  <video
                      src={mediaSources[0].postExcerpt} // Video source sent to postExcerpt due to bug in GraphQL field
                      className="w-full h-full object-cover aspect-[74/97]"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={poster.src}
                  />
              :
                isMobile
                ?
                    <Image
                      className="w-full h-full object-cover aspect-[74/97]"
                      src={mediaSources[0].fullFileUrl || "" }
                      alt={title || ""}
                      width={mediaSources[0].fullWidth || undefined}
                      height={mediaSources[0].fullHeight || undefined}
                      priority={ idx > (initialImagesNumber - 1) ? false : true}
                      placeholder='blur'
                      blurDataURL={poster.src}
                  />
                :
                  <Swiper
                    modules={[Autoplay, EffectFade]}
                    slidesPerView={1}
                    effect="fade"
                    loop={ false }
                    className="w-full h-full"
                    onSwiper={(swiper) => (swiperRef.current = swiper)} // Capture the Swiper instance
                  >
                        {mediaSources.map((media, index) => (
                          media.fullFileUrl &&
                          <SwiperSlide key={`slide-${index}`}>
                              <Image
                                    className="w-full h-full object-cover aspect-[74/97]"
                                    src={media.fullFileUrl || "" }
                                    alt={title || ""}
                                    width={media.fullWidth || undefined}
                                    height={media.fullHeight || undefined}
                                    priority={ idx>5 ? false : true}
                                    placeholder='blur'
                                    blurDataURL={poster.src}
                                />
                          </SwiperSlide>
                        ))}
                  </Swiper>
          }
      </div>
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
