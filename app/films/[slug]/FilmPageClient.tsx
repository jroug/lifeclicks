"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
// import poster from '@/public/images/loader-video.png'; // Adjust the path
import { useGlobalState } from "@/context/PageAnimatePresence";
import { firstLoadVariants }  from "@/utils/transitionConstants";
import { pageTransition }  from "@/utils/transitionConstants";
import { generalVariants }  from "@/utils/transitionConstants";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });




// Props interface
interface VideoPageClientProps {
  slug:string,
  // projectPageData: ProjectsMap;
 
}

const VideoPageClient: React.FC<VideoPageClientProps> = ({
  slug,
  // projectPageData,
}) => {

  const router = useRouter();
  const { thisIsTheFirstLoad, videosMap } = useGlobalState();
  const videoPageData = videosMap;
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  useEffect(() => {
    if (!videosMap[slug]) {
      router.replace("/404");
    }
  }, [videosMap, router, slug]);

  if (!videosMap[slug]) return null;

  // Destructure project data
  const {
    title: projectTitle,
    videosExtras,
    nextVideoSlug,
  } = videosMap[slug];


  const whatToPlayUrl = videosExtras.vimeoId && videosExtras.vimeoId.trim() ? `https://vimeo.com/${videosExtras.vimeoId}` 
  : 
  videosExtras.youtubeId && videosExtras.youtubeId.trim() ? `https://www.youtube.com/watch?v=${videosExtras.youtubeId}` 
  : 
  null;

  const [isReady, setIsReady] = useState(false);

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={thisIsTheFirstLoad ? firstLoadVariants : generalVariants}
      transition={pageTransition}
    >
      <main className="project-slider relative flex flex-col items-center justify-center custom-slider-height">
            <div className="flex w-full h-full relative bg-white flex-col xl:flex-row">
              <div className="relative z-10 bg-white flex flex-col items-center justify-center h-[40%] md:h-full    w-full xl:w-30percent-important">
                <div className="flex w-full justify-center md:pb-[50px] md:mt-[-100px]"><Link href={"/films"}>BACK TO ALL FILMS</Link></div>
                <h1 className="font-cormorant_garamond uppercase w-full text-3xl md:text-5xl text-black text-center p-[20px]">
                  {projectTitle}
                </h1>
              </div>
              <div className="flex flex-col h-full relative w-full xl:w-70percent-important ">
                {!isReady && (
                  <div className="flex items-center justify-center h-full text-lg font-semibold text-gray-600">
                    Loading...
                  </div>
                )}
                {whatToPlayUrl && (
                  <ReactPlayer
                    url={whatToPlayUrl}
                    width="100%"
                    height="100%"
                    controls
                    style={{ display: isReady ? "block" : "none" }}
                    onReady={() => setIsReady(true)}
                  />
                )}
              </div>
            </div>
      </main>
    </motion.div>
  );
};

export default VideoPageClient;