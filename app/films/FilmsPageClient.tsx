"use client";


import { useEffect } from "react";
import { useGlobalState } from "@/context/PageAnimatePresence";
import { motion } from "framer-motion";
import { firstLoadVariants }  from "@/utils/transitionConstants";
import { pageTransition }  from "@/utils/transitionConstants";
import { generalVariants }  from "@/utils/transitionConstants";
import ThumbImageVideos from "@/components/ThumbImageVideos";
// import { logDev } from "@/utils/logDev";

interface VideoPageClientProps {
  videosData: VideosMap;
}

export default function FilmsPageClient({ videosData }: VideoPageClientProps) {

  const { thisIsTheFirstLoad } = useGlobalState();

// logDev('videosData', videosData);

  const videosDataLength = Object.entries(videosData).length;
  const modulo4 = videosDataLength % 4;
  const modulo3 = videosDataLength % 3;
  const modulo2 = videosDataLength % 2;


  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={thisIsTheFirstLoad ? firstLoadVariants : generalVariants}
      transition={pageTransition}
      key="home"
    >
      <main className="bg-gray-100 flex justify-center min-h-screen">
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-full mx-auto">
          {Object.entries(videosData).map(([key, video], index) => (
            <div
              key={`key-${key}`}
              className={
                  "group flex justify-center overflow-hidden text-center" 
                  + (index >= videosDataLength - modulo2 ? ' modulo2' : '')
                  + (index >= videosDataLength - modulo3 ? ' modulo3' : '')
                  + (index >= videosDataLength - modulo4 ? ' modulo4' : '')
              }
              data-index={index}
            >
              <ThumbImageVideos videoSource={ video.featuredImage } title={ video.title } uri={ video.uri } />
            </div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}