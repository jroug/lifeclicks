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
                <main id="about-main" className="bg-black text-white flex items-center justify-center" >
                    <div className="mx-5 md:mx-0 mt-[100px] xl:mb-[100px] w-full max-w-6xl">
                        <div className="block  mx-auto mt-5px]">
                        <h1 className="text-[40px] md:text-[80px] ">{pageAboutData?.title}</h1>
                            <Image 
                                className={pageAboutData?.featuredImage?.node.altText}
                                src={pageAboutData?.featuredImage?.node.sourceUrl || '/images/placeholder_image.jpg' }
                                alt="Logo" 
                                width={pageAboutData?.featuredImage?.node?.mediaDetails.width} // Adjust the width as needed
                                height={pageAboutData?.featuredImage?.node?.mediaDetails.height} // Adjust the height as needed
                            />
                            <div className="about-content block pt-5 md:pt-11" >
                                {parse(pageAboutData?.content)}
                            </div>
                        </div>
                        <div className=" block  mt-[25px] mb-[130px] underline">
                            <Link href="/contact" >Start a project with us</Link>
                        </div>
                    </div>
                </main>
            </motion.div>
        </>
    );
};

export default AboutPageClient;