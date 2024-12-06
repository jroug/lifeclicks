"use client";

import React, { useState, use } from "react";
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
import { useSiteData } from "@/context/SiteDataContext";

// Interface for media items
interface PortfolioPageMedia {
  fullFileUrl: string;
  postTitle: string;
  fullWidth: number; // Fixed type to number
  fullHeight: number; // Fixed type to number
  postMimeType: string;
  postExcerpt: string;
}

// Interface for project data
interface ProjectData {
  title: string;
  projectExtras: {
    eventType: string;
    eventPlace: string;
    portfolioPageMedia: PortfolioPageMedia[];
  };
  nextProjectSlug: string;
}

// Interface for site data context
interface SiteData {
  projectsMap: Record<string, ProjectData>;
}


type Params = Promise<{ slug: string }>

export default function Project(props: { params: Params }) {
  const params = use(props.params);
  const slug = params.slug;
  const data = useSiteData() as SiteData;
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

  const thisProjectData = data.projectsMap[slug];

  const projectTitle = thisProjectData.title;
  const projectEventType = thisProjectData.projectExtras.eventType;
  const projectEventPlace = thisProjectData.projectExtras.eventPlace;
  const portfolioPageMedia = thisProjectData.projectExtras.portfolioPageMedia;
  const nextProjectSlug = thisProjectData.nextProjectSlug;

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
            sensitivity: 10,
          }}
          className="w-full h-full"
          onSlideChange={handleSlideChange}
          breakpoints={{
            768: {
              direction: "horizontal",
            },
            0: {
              direction: "vertical",
            },
          }}
        >
          <SwiperSlide key={"021201212"} className="">
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
                  src={portfolioPageMedia[0].postExcerpt}
                  alt={portfolioPageMedia[0].postTitle}
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
              <SwiperSlide
                key={`prMedia-${i}`}
                className="block w-auto-important h-auto-important"
              >
                <div className="md:h-full md:w-auto">
                  <Image
                    className="md:h-full md:w-auto md:pl-14 pt-2 md:py-14 mx-auto"
                    src={projectMedia.fullFileUrl}
                    alt={projectMedia.postTitle}
                    width={projectMedia.fullWidth}
                    height={projectMedia.fullHeight}
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
                <Link
                  href={`/project/${nextProjectSlug}`}
                  className="next-project font-montserrat uppercase"
                >
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
}