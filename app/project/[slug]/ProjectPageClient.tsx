"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { FreeMode, Pagination, Mousewheel } from "swiper/modules";
import { motion } from "framer-motion";
// import poster from '@/public/images/loader-video.png'; // Adjust the path
import { useGlobalState } from "@/context/PageAnimatePresence";
import { firstLoadVariants }  from "@/utils/transitionConstants";
import { pageTransition }  from "@/utils/transitionConstants";
import { generalVariants }  from "@/utils/transitionConstants";
import TopSlide from "./TopSlide";
import InnerSlide from "./InnerSlide";
import LastSlide from "./LastSlide";

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

  const { isMobile, thisIsTheFirstLoad, projectsMap } = useGlobalState();

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
        {
        isMobile
          ?
            <div className="w-full h-full bg-white">
                <TopSlide projectEventType={projectEventType} projectEventPlace={projectEventPlace} projectTitle={projectTitle} portfolioPageMedia={portfolioPageMedia} />
                {portfolioPageMedia.map((media, i) =>
                    media.postMimeType?.includes("image/") && i > 0 ? (
                      <div
                        key={`prMedia-${i}`}
                        className="block w-auto-important h-auto-important bg-white"
                      >
                          <InnerSlide projectMedia={media} />
                      </div>
                    ) : null
                )}
                <div
                  key="next-project-slide"
                  className="flex justify-center items-center h-full md:w-half-important bg-white"
                >
                  <LastSlide nextProjectSlug={nextProjectSlug} />
                </div>
            </div>
          :
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
                  touchStartPreventDefault: false,
                  // touchAngle: 60,
                  // threshold: 10,
                  // touchRatio: 1.5,
                },
              }}
            >
              {/* Main Project Slide */}
              <SwiperSlide key="main-slide">
                <TopSlide projectEventType={projectEventType} projectEventPlace={projectEventPlace} projectTitle={projectTitle} portfolioPageMedia={portfolioPageMedia} />
              </SwiperSlide>

              {/* Additional Media Slides */}
              {portfolioPageMedia.map((media, i) =>
                media.postMimeType?.includes("image/") && i > 0 ? (
                  <SwiperSlide
                    key={`prMedia-${i}`}
                    className="block w-auto-important h-auto-important"
                  >
                    <InnerSlide projectMedia={media} />
                  </SwiperSlide>
                ) : null
              )}

              {/* Next Project Slide */}
              <SwiperSlide
                key="next-project-slide"
                className="flex justify-center items-center h-full md:w-half-important"
              >
                <LastSlide nextProjectSlug={nextProjectSlug} />
              </SwiperSlide>
            </Swiper>
        }
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