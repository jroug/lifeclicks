'use client';

import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import { useGlobalState } from "@/context/PageAnimatePresence";
import { firstLoadVariants }  from "@/utils/transitionConstants";
import { pageTransition }  from "@/utils/transitionConstants";
import { generalVariants }  from "@/utils/transitionConstants";

interface PrivacyPageClientProps {
  pagesMap: PagesMap;
}

const PrivacyPageClient: React.FC<PrivacyPageClientProps> = ({ pagesMap }) => {
  
  const { thisIsTheFirstLoad } = useGlobalState();

  const privacyPageData = pagesMap['privacy'];
  // const data = useSiteData();

 

  return (
    <motion.div initial="initial" animate="enter" exit="exit" variants={thisIsTheFirstLoad ? firstLoadVariants : generalVariants} transition={pageTransition} >
      <main className="custom-contact-us-height flex items-center justify-center bg-gray-100">
        <div className="mt-[100px] xl:mb-[100px] w-full max-w-6xl">
          <h1 className="mx-5 md:mx-auto text-[40px] md:text-[80px] font-bold text-left mb-10 font-cormorant_garamond uppercase font-light">{privacyPageData?.title}</h1>
          <div className="privacy mx-5 md:mx-auto uppercase font-montserrat x-6 pt-5 pb-16 max-w-[1000px] text-sm" >{ parse(privacyPageData?.content) }</div>
        </div>
      </main>
    </motion.div>
  );
}

export default PrivacyPageClient;