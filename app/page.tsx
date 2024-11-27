"use client";

import { useState, useEffect } from "react";
import SlideshowImage from "../components/SlideshowImage";
import { motion } from "framer-motion";

 

export default function Home() {
  const [data, setData] = useState<Record<string, string[]>>({});
  const [isReady, setIsReady] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);



  useEffect(() => {
    const baseImages1 = [
      "/images/atest0.jpg",
      "/images/atest1.jpg",
      "/images/atest2.jpg",
      "/images/atest3.jpg",
      "/images/atest4.jpg",
    ];
    const baseImages2 = [
      "/images/atest1.jpg",
      "/images/atest0.jpg",
      "/images/atest2.jpg",
      "/images/atest3.jpg",
      "/images/atest4.jpg",
    ];
    const baseImages3 = [
      "/images/atest3.jpg",
      "/images/atest0.jpg",
      "/images/atest2.jpg",
      "/images/atest1.jpg",
      "/images/atest4.jpg",
    ];

    // Generate shuffled data after mounting
    const shuffledData: Record<string, string[]> = {
      imageSources_1: [...baseImages1],
      imageSources_2: [...baseImages2],
      imageSources_3: [...baseImages3],
      imageSources_4: [...baseImages1],
      imageSources_5: [...baseImages2],
      imageSources_6: [...baseImages3],
      imageSources_7: [...baseImages1],
      imageSources_8: [...baseImages2],
      imageSources_9: [...baseImages3],
      imageSources_10: [...baseImages1],
      imageSources_11: [...baseImages2],
      imageSources_12: [...baseImages3],
    };

    setData(shuffledData);
  
    if ( localStorage.getItem("FIRST") === "true" ){
        setFirstLoad(true);
        localStorage.setItem("FIRST", "false");
    }
 

    setIsReady(true); // Set readiness to avoid rendering before data is available

  }, []);


  const firstVariants = {
    initial: { x: 0, y: 5, scale: 1 },
    enter: { x: 0, y: 0, scale: 1 },
    exit: { x: -200, y:0, scale: 1 },
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

  return (
    <>
      {
          isReady ? ( // Only render when data is ready
            <motion.div
                initial="initial"
                animate="enter"
                exit="exit"
                variants={ firstLoad === true ? firstVariants : homeVariants } 
                transition={pageTransition}
                key="home"
            >
              <main className="bg-gray-100 flex items-center justify-center min-h-screen">
                  <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-full mx-auto">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="group flex justify-center overflow-hidden text-center"
                          >
                            <SlideshowImage
                              classes="w-full h-full transform transition-transform duration-300 group-hover:scale-105 object-cover aspect-[74/93]"
                              images={data[`imageSources_${(i % 12) + 1}`]} // Access correct array with modulo
                              alt={`test ${i + 1}`}
                            />
                          </div>
                        ))}
                  </div>
               </main>
            </motion.div>
          ) : (
            <p>Loading...</p> // Optionally display a loader
          )
        }
    </>
  );
}
