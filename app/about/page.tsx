"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const About = () => {

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
                        <div className="ml-[70px] mt-10 max-w-[400px]">
                            <h1 className="text-[40px] md:text-[80px] ">ABOUT US</h1>
                            <p className="uppercase">
                                Your success is our mission, and we are here to ensure your wedding photography business flourishes, making every moment truly picture-perfect.
                            </p>
                        </div>
                        <div className="my-20 mx-auto">
                            <Image 
                                className="about-logo"
                                src="/images/logo/logo-mini-white.svg" 
                                alt="Logo" 
                                width={464} // Adjust the width as needed
                                height={500} // Adjust the height as needed
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
                                Our priceless memories, what we have lived and carefully keep within us, are the most valuable we have gained in the journey of life. And if the passage of time constantly leads us to new adventures, there is certainly a way to keep all these moments “alive”, reliving every time we see them, the feelings we felt when we lived them.
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