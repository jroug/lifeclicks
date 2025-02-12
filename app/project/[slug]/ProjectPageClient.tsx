"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { FreeMode, Pagination, Mousewheel } from "swiper/modules";
import { motion } from "framer-motion";
import poster from '@/public/images/loader-video.png'; // Adjust the path
import { useGlobalState } from "@/context/PageAnimatePresence";
import { firstLoadVariants }  from "@/utils/transitionConstants";
import { pageTransition }  from "@/utils/transitionConstants";
import { generalVariants }  from "@/utils/transitionConstants";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

// Props interface
interface ProjectPageClientProps {
  slug:string,
  // projectPageData: ProjectsMap;
 
}

const ProjectPageClient: React.FC<ProjectPageClientProps> = ({
  slug,
  // projectPageData,
}) => {

 
  const router = useRouter();

  const { thisIsTheFirstLoad, projectsMap } = useGlobalState();

  const projectPageData = projectsMap;

  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const formatNumber = (number: number) => number.toString().padStart(2, "0");

 

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex + 1);
  };

  useEffect(() => {
    if (!projectPageData[slug]) {
      router.replace("/404");
    }
  }, [projectPageData, router, slug]);

  if (!projectPageData[slug]) return null;

  // Destructure project data
  const {
    title: projectTitle,
    projectExtras,
    nextProjectSlug,
  } = projectPageData[slug];

  const projectEventType = projectExtras?.eventType;
  const projectEventPlace = projectExtras?.eventPlace;
  const portfolioPageMedia = projectExtras?.portfolioPageMedia || [];

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={thisIsTheFirstLoad ? firstLoadVariants : generalVariants}
      transition={pageTransition}
    >
      <main className="project-slider relative flex flex-col items-center justify-center custom-slider-height">
        <Swiper
          modules={[FreeMode, Pagination, Mousewheel]}
          direction={"horizontal"}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumBounce: true,
          }}
          mousewheel={{
            enabled: true,
            forceToAxis: false,
            sensitivity: 10,
            releaseOnEdges: false,
          }}
          spaceBetween={0}
          slidesPerView={"auto"}
          className="w-full h-full"
          onSlideChange={handleSlideChange}
          breakpoints={{
            768: {
              direction: "horizontal",
              freeMode: {
                enabled: true,
                momentum: true,
                momentumBounce: true,
              },
              mousewheel: {
                enabled: true,
                forceToAxis: false,
                sensitivity: 10,
                releaseOnEdges: false,
              }
            },
            0: {
              direction: "vertical",
              freeMode: {
                enabled: true,
                momentum: true,
              },
              threshold: 20,
              // touchAngle: 60,
              // threshold: 10,
              // touchRatio: 1.5,
            },
          }}
        >
          {/* Main Project Slide */}
          <SwiperSlide key="main-slide">
            <div className="flex h-full relative bg-araxnowhite flex-col md:flex-row">
              <div className="relative z-10 bg-araxnowhite flex flex-col items-center justify-center h-full w-full md:w-half-important">
                <span className="font-montserrat uppercase w-full text-2xl text-black text-center">
                  {projectEventType}
                </span>
                <span className="font-montserrat uppercase w-full text-sm text-black text-center santorini-subtitle">
                  {projectEventPlace}
                </span>
                <h1 className="font-cormorant_garamond uppercase w-full text-5xl sm:text-6xl text-black text-center">
                  {projectTitle}
                </h1>
              </div>
              <div className="flex flex-col h-full relative w-full md:w-half-important ">
                {portfolioPageMedia.length > 0 && portfolioPageMedia[0]?.postExcerpt && (
                  <Image
                    src={portfolioPageMedia[0].postExcerpt}
                    alt={portfolioPageMedia[0]?.postTitle || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                    priority={true}
                    placeholder='blur'
                    blurDataURL={poster.src}
                  />
                )}
              </div>
            </div>
          </SwiperSlide>

          {/* Additional Media Slides */}
          {portfolioPageMedia.map((media, i) =>
            media.postMimeType.includes("image/") && i > 0 ? (
              <SwiperSlide
                key={`prMedia-${i}`}
                className="block w-auto-important h-auto-important"
              >
                <div className="md:h-full md:w-auto">
                  <Image
                    className="md:h-full md:w-auto md:pl-14 pt-2 md:py-14 mx-auto"
                    src={media.fullFileUrl || ""}
                    alt={media.postTitle || ""}
                    width={media.fullWidth || undefined}
                    height={media.fullHeight || undefined}
                    priority={true}
                    placeholder='blur'
                    blurDataURL={poster.src}
                  />
                </div>
              </SwiperSlide>
            ) : null
          )}

          {/* Next Project Slide */}
          <SwiperSlide
            key="next-project-slide"
            className="flex justify-center items-center h-full md:w-half-important"
          >
            <div className="w-full h-full relative">
              <h2 className="flex items-center justify-center h-full text-6xl text-black">
                <Link
                  href={`/project/${nextProjectSlug}`}
                  className="next-project font-montserrat uppercase"
                >
                  Next Project
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

export default ProjectPageClient;