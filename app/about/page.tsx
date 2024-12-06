'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
// import { logDev } from '@/utils/logDev';
import { useSiteData } from '@/context/SiteDataContext';


const About = () => {

    const data = useSiteData();
 
    const aboutVariants ={
        initial: { x: +200 },
        enter: { x: 0 },
        exit: { x: +200 },
    }
    const pageTransition = {
        duration: 0.8,
        ease: "easeInOut",
    }

    return (
        <motion.div initial="initial" animate="enter" exit="exit" variants={aboutVariants} transition={pageTransition} >
            <main id="about-main" className="bg-black text-white" >
                <div className="grid grid-cols-[90%,10%] ">
                    <div id="about-info-wrap" className="flex flex-row" >
                        <div className="ml-[70px] mt-10 max-w-[450px]">
                            <h1 className="text-[40px] md:text-[80px] ">{data.pagesMap['about'].title}</h1>
                            <p className="uppercase" >{data.pagesMap['about'].content?.replace(/<\/?p>/g, '')}</p>
                        </div>
                        <div className="my-20 mx-auto">
                            <Image 
                                className={data.pagesMap['about'].featuredImage.node?.altText}
                                src={data.pagesMap['about'].featuredImage.node.sourceUrl}
                                alt="Logo" 
                                width={data.pagesMap['about'].featuredImage.node.mediaDetails.width} // Adjust the width as needed
                                height={data.pagesMap['about'].featuredImage.node.mediaDetails.height} // Adjust the height as needed
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-end mt-20 md:mt-0" >
                        <div className="custom-margins-hr-about">
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 text-white">
                    <div className="block max-w-[80%] mx-auto mt-[30px] mb-[130px]">
                        <div className="block" >
                            <p className="block p-5 md:p-11" >
                                {data.pagesMap['about'].pageExtras?.secondaryText}
                            </p>
                            <p className="block" >
                                <Link href="#" >Start a project with us</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
};

export default About;