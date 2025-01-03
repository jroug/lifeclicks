"use client";

import { useState, useEffect } from "react";
import SlideshowImage from "../components/SlideshowImage";
import { motion } from "framer-motion";


interface HomePageClientProps {
  homePageProjectData: ProjectsMap;
}

export default function HomePageClient({ homePageProjectData }: HomePageClientProps) {
  const [firstLoad, setFirstLoad] = useState<boolean>(false);

  const firstVariants = {
    initial: { x: 0, y: 0, scale: 1 },
    enter: { x: 0, y: 0, scale: 1 },
    exit: { x: -200, y: 0, scale: 1 },
  };

  const homeVariants = {
    initial: { x: -200, y: 0 },
    enter: { x: 0, y: 0 },
    exit: { x: -200, y: 0 },
  };

  const pageTransition = {
    duration: 0.8,
    ease: "easeInOut",
  };

  useEffect(() => {
    const firstVisit = localStorage.getItem("FIRST");
    if (firstVisit === "true") {
      setFirstLoad(true);
      localStorage.setItem("FIRST", "false");
    }
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={firstLoad ? firstVariants : homeVariants}
      transition={pageTransition}
      key="home"
    >
      <main className="bg-gray-100 flex justify-center min-h-screen">
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-full mx-auto">
          {Object.entries(homePageProjectData).map(([key, project]) => (
            <div
              key={`key-${key}`}
              className="group flex justify-center overflow-hidden text-center"
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