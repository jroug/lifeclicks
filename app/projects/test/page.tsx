"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

// Import required modules
import { FreeMode, Pagination, Mousewheel } from "swiper/modules";

export default function TestProject() {
    const [currentSlide, setCurrentSlide] = useState(1);
    // const [totalSlides, setTotalSlides] = useState(0);
    
    const formatNumber = (number: number) => number.toString().padStart(2, "0");

    return (
        <main className="relative flex flex-col items-center justify-center custom-slider-height">  
            <Swiper
                modules={[FreeMode, Pagination, Mousewheel]}
                freeMode={true}
                spaceBetween={0}
                slidesPerView={"auto"}
                mousewheel={{
                    sensitivity: 10, // Adjust this value for faster/slower scrolling (default is 1)
                }}
                className="w-full h-full"
                // onSwiper={(swiper) => setTotalSlides(swiper.slides.length)} // Set total slides on mount
                onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)} // Update current slide on change
                breakpoints={{
                    // When window width is >= 768px, change direction to horizontal
                    768: {
                        direction: "horizontal",
                    },
                    // When window width is < 768px, change direction to vertical
                    0: {
                        direction: "vertical",
                    },
                }}
            >
                <SwiperSlide key={"021201212"} className="">
                    <div className="flex h-full relative bg-white">
                        <div className="absolute md:relative z-10 bg-white flex flex-col items-center justify-center h-full w-full md:w-half-important">
                            <span className="font-montserrat uppercase w-full text-2xl  text-black text-center">
                                Wedding
                            </span>
                            <span className="font-montserrat uppercase w-full text-sm text-black text-center santorini-subtitle">
                                Santorini
                            </span>
                            <h1 className="font-cormorant_garamond uppercase w-full text-6xl text-black text-center">
                                Joshua & Nayara
                            </h1>
                        </div>
                        <div className="flex flex-col h-full relative w-full md:w-half-important">
                            <Image
                                src={`/images/atest2.jpg`}
                                alt={`Image`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                                objectFit="cover"
                            />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide key={"11"} className="block w-auto-important">
                    <div className="h-full w-auto">
                        <Image
                            className="h-full w-auto md:pl-14 md:py-14"
                            src={`/images/atest1.jpg`}
                            alt={`Image`}
                            width={1920}
                            height={1278}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide key={"444"} className="block w-auto-important">
                    <div className="h-full w-auto">
                        <Image
                            className="h-full w-auto md:pl-14 md:py-14"
                            src={`/images/atest4.jpg`}
                            alt={`Image`}
                            width={1080}
                            height={1440}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide key={"222"} className="block w-auto-important">
                    <div className="h-full w-auto">
                        <Image
                            className="h-full w-auto md:pl-14 md:py-14"
                            src={`/images/atest2.jpg`}
                            alt={`Image`}
                            width={1080}
                            height={1440}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide key={"000"} className="block w-auto-important">
                    <div className="h-full w-auto">
                        <Image
                            className="h-full w-auto md:pl-14 md:py-14"
                            src={`/images/atest0.jpg`}
                            alt={`Image`}
                            width={1080}
                            height={1440}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide
                    key={"1000"}
                    className="flex justify-center items-center h-full w-half-important"
                >
                    <div className="w-full h-full relative">
                        <h2 className="flex items-center justify-center h-full text-6xl text-black">
                            <Link href="/projects/test" className="next-project font-montserrat uppercase  ">
                                next project
                            </Link>
                        </h2>
                    </div>
                </SwiperSlide>
            </Swiper>
            {/* <div className="text-black font-montserrat text-lg mb-4">
                Slide {currentSlide} of {totalSlides}
            </div> */}
            <div className="sliderCounter absolute bottom-0 left-0 z-[100] text-black font-montserrat text-lg m-4 w-[35px] hidden md:block">
                {formatNumber(currentSlide)}
            </div>
        </main>
    );
}
