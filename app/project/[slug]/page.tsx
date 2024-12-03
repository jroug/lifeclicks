"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types"; // Import Swiper types
import { logDev } from "@/utils/logDev";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import { FreeMode, Pagination, Mousewheel } from "swiper/modules";
import { motion } from "framer-motion";
import useSWR from "swr";

type ProjectData = {
  project: {
    title: string;
    projectExtras: ProjectExtras[];
  };
};

type ProjectExtras = {
  eventType: string;
  eventPlace: string;
  portfolioPageMedia: PortfolioPageMedia[];
};

type PortfolioPageMedia = {
  fullFileUrl: string;
  postMimeType: string;
  postExcerpt: string;
  postTitle: string;
  fullWidth: number;
  fullHeight: number;
};

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Project: React.FC<ProjectPageProps> = ({ params }) => {
  const { slug } = use(params);
  logDev(slug);

  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const formatNumber = (number: number) => number.toString().padStart(2, "0");

  const projectVariants = {
    initial: { x: 200 },
    enter: { x: 0 },
    exit: { x: 200 },
  };

  const pageTransition = {
    duration: 0.8,
    ease: "easeInOut",
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex + 1);
  };

  const projectDataFetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PORT}/api/get-project?slug=${slug}`;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<ProjectData>(projectDataFetchUrl, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 0, // Cache data for 60 seconds
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex bg-black items-center justify-center font-cormorant_garamond text-white">
        ... LOADING ...
      </div>
    );
  }

  if (error) {
    return <div>Failed to load</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const projectTitle = data.project.title;
  const projectEventType = data.project.projectExtras[0]?.eventType || "Unknown Event";
  const projectEventPlace = data.project.projectExtras[0]?.eventPlace || "Unknown Place";
  const portfolioPageMedia = data.project.projectExtras[0]?.portfolioPageMedia || [];

  logDev("portfolioPageMedia", portfolioPageMedia);

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={projectVariants}
      transition={pageTransition}
    >
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
          onSlideChange={handleSlideChange} // Type-safe event handler
          breakpoints={{
            768: {
              direction: "horizontal",
            },
            0: {
              direction: "vertical",
            },
          }}
        >
          <SwiperSlide key={"prMedia-00"} className="">
            <div className="flex h-full relative bg-araxnowhite flex-col md:flex-row">
              <div className="absolute md:relative z-10 bg-araxnowhite flex flex-col items-center justify-center h-full w-full md:w-half-important">
                <span className="font-montserrat uppercase w-full text-2xl text-black text-center">
                  {projectEventType}
                </span>
                <span className="font-montserrat uppercase w-full text-sm text-black text-center santorini-subtitle">
                  {projectEventPlace}
                </span>
                <h1 className="font-cormorant_garamond uppercase w-full text-6xl text-black text-center">
                  {projectTitle}
                </h1>
              </div>
              <div className="flex flex-col h-full relative w-full md:w-half-important">
                <Image
                  src={portfolioPageMedia[0]?.postExcerpt || ""}
                  alt={portfolioPageMedia[0]?.postTitle || "No Title"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={true}
                />
              </div>
            </div>
          </SwiperSlide>

          {portfolioPageMedia.map((projectMedia, i) =>
            projectMedia.postMimeType.includes("image/") && i > 0 ? (
              <SwiperSlide key={"prMedia-" + i} className="block w-auto-important h-auto-important">
                <div className="md:h-full md:w-auto">
                  <Image
                    className="md:h-full md:w-auto md:pl-14 pt-2 md:py-14 mx-auto"
                    src={projectMedia.fullFileUrl}
                    alt={projectMedia.postTitle}
                    width={parseInt(projectMedia.fullWidth.toString())}
                    height={parseInt(projectMedia.fullHeight.toString())}
                  />
                </div>
              </SwiperSlide>
            ) : null
          )}

          <SwiperSlide
            key={"1000"}
            className="flex justify-center items-center h-full md:w-half-important"
          >
            <div className="w-full h-full relative">
              <h2 className="flex items-center justify-center h-full text-6xl text-black">
                <Link href="/projects/test" className="next-project font-montserrat uppercase">
                  next project
                </Link>
              </h2>
            </div>
          </SwiperSlide>
        </Swiper>
        <div
          className="sliderCounter absolute bottom-0 left-0 z-[100] text-black font-montserrat text-lg m-4 w-[35px] hidden md:block"
          aria-live="polite"
        >
          {formatNumber(currentSlide)}
        </div>
      </main>
    </motion.div>
  );
};

export default Project;
