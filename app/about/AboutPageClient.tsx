'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';


// import { logDev } from '@/utils/logDev';
// import { useSiteData } from '@/context/SiteDataContext';



interface AboutPageClientProps {
    pagesMap: PagesMap;
}

const AboutPageClient: React.FC<AboutPageClientProps> = ({ pagesMap }) => {

    // const data = useSiteData();
    // const pageAboutData = data.pagesMap['about'];
    const pageAboutData = pagesMap['about'];
 
    const aboutVariants = {
        initial: { x: +200 },
        enter: { x: 0 },
        exit: { x: +200 },
    }
    const pageTransition = {
        duration: 0.8,
        ease: "easeInOut",
    }

    return (
        <>
            <motion.div initial="initial" animate="enter" exit="exit" variants={aboutVariants} transition={pageTransition} >
                <main id="about-main" className="bg-black text-white" >
                    <div className="grid md:grid-cols-[90%,10%] ">
                        <div id="about-info-wrap" className="flex flex-row" >
                            <div className="ml-[70px] mt-10 max-w-[450px] md:min-w-[390px]">
                                <h1 className="text-[40px] md:text-[80px] ">{pageAboutData?.title}</h1>
                                <p className="uppercase" >{parse(pageAboutData.content)}</p>
                            </div>
                            <div className="my-20 mx-auto px-5">
                                <Image 
                                    className={pageAboutData?.featuredImage?.node.altText}
                                    src={pageAboutData?.featuredImage?.node.sourceUrl || '/images/placeholder_image.jpg' }
                                    alt="Logo" 
                                    width={pageAboutData?.featuredImage?.node?.mediaDetails.width} // Adjust the width as needed
                                    height={pageAboutData?.featuredImage?.node?.mediaDetails.height} // Adjust the height as needed
                                />
                            </div>
                        </div>
                        <div className="md:flex flex-col items-end mt-20 md:mt-0 hidden" >
                            <div className="custom-margins-hr-about">
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 text-white">
                        <div className="block max-w-[80%] mx-auto mt-[30px] mb-[130px]">
                            <div className="block" >
                                <p className="block p-5 md:p-11" >
                                    {pageAboutData?.pageExtras?.secondaryText}
                                </p>
                                <p className="block" >
                                    <Link href="#" >Start a project with us</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </motion.div>
        </>
    );
};

export default AboutPageClient;