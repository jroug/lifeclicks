"use client";

import { useState, useEffect } from "react";
import SlideshowImage from "../components/SlideshowImage";
import { motion } from "framer-motion";
// import { logDev } from "@/utils/logDev";
import useSWR from "swr";

type ProjectEdge = {
  node: {
    title: string;
    uri: string;
    projectExtras: {
      homepageMedia: MediaSource[];
      eventPlace: string;
    };
  };
};

type ProjectsData = {
  projects: {
    edges: ProjectEdge[];
  };
};

interface MediaSource {
  fullFileUrl: string; // URL of the media file
  postExcerpt: string; // Excerpt or alternative video URL
  postMimeType: string; // MIME type (e.g., "image/jpeg", "video/mp4")
}

export default function Home() {
  const [firstLoad, setFirstLoad] = useState<boolean>(false);

  const firstVariants = {
    initial: { x: 0, y: 5, scale: 1 },
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

  const homepageDataFetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PORT}/api/get-home-projects`;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<ProjectsData>(
    homepageDataFetchUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache data for 60 seconds
    }
  );

  useEffect(() => {
    const firstVisit = localStorage.getItem("FIRST");
    if (firstVisit === "true") {
      setFirstLoad(true);
      localStorage.setItem("FIRST", "false");
    }
  }, []);

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

  if (!data || !data.projects.edges) {
    return <div>No data available</div>;
  }

  // logDev("data", data.projects.edges);

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={firstLoad ? firstVariants : homeVariants}
      transition={pageTransition}
      key="home"
    >
      <main className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-full mx-auto">
          {data.projects.edges.map((project, i) => (
            <div
              key={i}
              className="group flex justify-center overflow-hidden text-center"
            >
              <SlideshowImage
                key={"SlideshowImage-" + i}
                mediaSources={project.node.projectExtras.homepageMedia}
                title={project.node.title}
                place={project.node.projectExtras.eventPlace}
                uri={project.node.uri}
              />
            </div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
