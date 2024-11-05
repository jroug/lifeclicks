"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';

// Import required modules
import { FreeMode, Pagination, Mousewheel } from 'swiper/modules';

export default function TestProject() {
    return (
        <main className="flex items-center justify-center min-h-screen">
            <Swiper
                modules={[FreeMode, Pagination, Mousewheel]}
                freeMode={true}
                spaceBetween={0}
                slidesPerView={"auto"}
                mousewheel={true}
                className="w-full h-screen"
                breakpoints={{
                    // When window width is >= 768px, change direction to horizontal
                    768: {
                      direction: 'horizontal',
                    },
                    // When window width is < 768px, change direction to vertical
                    0: {
                      direction: 'vertical',
                    },
                }}
            >
                <SwiperSlide key={"021201212"} className="">
                    <div className="flex h-full relative bg-araxnowhite">
                        <div className="absolute md:relative z-10  bg-araxnowhite flex flex-col items-center justify-center h-screen w-full md:w-half-important" >
                            <h1 className="w-full text-6xl text-black text-center">this is some text 1111</h1>
                            <Link href="/" className="w-full text-3xl text-black text-center">back to home</Link>
                        </div>
                        <div className="flex flex-col h-full relative w-full md:w-half-important">
                            <Image
                                src={`/images/atest3.jpg`} 
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
                            className="h-full w-auto md:pl-28 md:py-24"
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
                            className="h-full w-auto md:pl-28 md:py-24"
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
                            className="h-full w-auto md:pl-28 md:py-24"
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
                            className="h-full w-auto md:pl-28 md:py-24"
                            src={`/images/atest0.jpg`} 
                            alt={`Image`}
                            width={1080}
                            height={1440}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide key={"1000"} className="flex justify-center items-center h-full w-half-important">
                    <div className="w-full h-full relative">
                    <h2 className="flex items-center justify-center h-screen text-6xl text-black" ><Link href="/projects/test0" >next project 000</Link></h2>
                    </div>
                </SwiperSlide>
            </Swiper>
        </main>
    );
}
