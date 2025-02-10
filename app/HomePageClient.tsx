"use client";


import { useEffect } from "react";
import { useGlobalState } from "@/context/PageAnimatePresence";
import SlideshowImage from "../components/SlideshowImage";
import { motion } from "framer-motion";
import { logDev } from "@/utils/logDev";
import { firstLoadVariants }  from "@/utils/transitionConstants";
import { pageTransition }  from "@/utils/transitionConstants";
import { homeVariants }  from "@/utils/transitionConstants";



interface HomePageClientProps {
  homePageProjectData: ProjectsMap;
}

export default function HomePageClient({ homePageProjectData }: HomePageClientProps) {

  const { thisIsTheFirstLoad, setThisIsTheFirstLoad } = useGlobalState();


 
  const homePageProjectDataLength = Object.entries(homePageProjectData).length;
  const modulo4 = homePageProjectDataLength % 4;
  const modulo3 = homePageProjectDataLength % 3;
  const modulo2 = homePageProjectDataLength % 2;


  useEffect(() => {
      logDev('renderHome');
      setThisIsTheFirstLoad(false);
  }, []); // Runs every time the pathname changes


  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={thisIsTheFirstLoad ? firstLoadVariants : homeVariants}
      transition={pageTransition}
      key="home"
    >
      <main className="bg-gray-100 flex justify-center min-h-screen">
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-full mx-auto">
          {Object.entries(homePageProjectData).map(([key, project], index) => (
            <div
              key={`key-${key}`}
              className={
                  "group flex justify-center overflow-hidden text-center" 
                  + (index >= homePageProjectDataLength - modulo2 ? ' modulo2' : '')
                  + (index >= homePageProjectDataLength - modulo3 ? ' modulo3' : '')
                  + (index >= homePageProjectDataLength - modulo4 ? ' modulo4' : '')
              }
              data-index={index}
            >
              <SlideshowImage
                key={`SlideshowImage-${key}`}
                mediaSources={project.projectExtras.homepageMedia}
                title={project.title}
                place={project.projectExtras.eventPlace}
                uri={project.uri}
              />
            </div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}