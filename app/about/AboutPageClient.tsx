'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import { useGlobalState } from "@/context/PageAnimatePresence";
import { firstLoadVariants }  from "@/utils/transitionConstants";
import { pageTransition }  from "@/utils/transitionConstants";
import { generalVariants }  from "@/utils/transitionConstants";

// import { logDev } from '@/utils/logDev';
// import { useSiteData } from '@/context/SiteDataContext';



interface AboutPageClientProps {
    pagesMap: PagesMap;
}

const AboutPageClient: React.FC<AboutPageClientProps> = ({ pagesMap }) => {

    const { thisIsTheFirstLoad } = useGlobalState();

    // const data = useSiteData();
    // const pageAboutData = data.pagesMap['about'];
    const pageAboutData = pagesMap['about'];
    
 

    return (
        <>
            <motion.div initial="initial" animate="enter" exit="exit" variants={thisIsTheFirstLoad ? firstLoadVariants : generalVariants} transition={pageTransition} >
                <main id="about-main" className="bg-black text-white" >
                    <div className="grid md:grid-cols-[90%,10%] ">
                        <div id="about-info-wrap" className="flex flex-row" >
                            <div className="ml-[70px] mt-10 max-w-[450px] md:min-w-[390px] flex flex-col justify-center">
                                <h1 className="text-[40px] md:text-[80px] ">{pageAboutData?.title}</h1>
                                <div className="uppercase" >{parse(pageAboutData.content)}</div>
                            </div>
                            <div className="mt-[30px] mx-auto px-5 flex flex-col justify-center">
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
                        <div className="block max-w-[80%] mx-auto mt-5px]">
                            <div className="block" >
                                <p className="block p-5 md:p-11" >
                                    {pageAboutData?.pageExtras?.secondaryText}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 text-white">
                        <div className="ml-[70px] block max-w-[80%] mt-5px] mb-[130px] underline">
                            <Link href="/contact" >Start a project with us</Link>
                        </div>
                    </div>
                </main>
            </motion.div>
        </>
    );
};

export default AboutPageClient;