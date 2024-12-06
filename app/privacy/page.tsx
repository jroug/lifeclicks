'use client';

import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import { useSiteData } from '@/context/SiteDataContext';



export default function Privacy() {

  const data = useSiteData();

  const contactVariants ={
      initial: { x: +200 },
      enter: { x: 0 },
      exit: { x: +200 },
  }
  const pageTransition = {
      duration: 0.8,
      ease: "easeInOut",
  }

  return (
    <motion.div initial="initial" animate="enter" exit="exit" variants={contactVariants} transition={pageTransition} >
      <main className="custom-contact-us-height flex items-center justify-center bg-gray-100">
        <div className="mt-[100px] xl:mb-[100px] w-full max-w-6xl">
          <h1 className="mx-5 md:mx-auto text-[40px] md:text-[80px] font-bold text-left mb-10 font-cormorant_garamond uppercase font-light">{data.pagesMap['privacy'].title}</h1>
          <div className="privacy mx-5 md:mx-auto uppercase font-montserrat x-6 pt-5 pb-16 max-w-[1000px] text-sm" >{ parse(data.pagesMap['privacy'].content) }</div>
        </div>
      </main>
    </motion.div>
  );
}