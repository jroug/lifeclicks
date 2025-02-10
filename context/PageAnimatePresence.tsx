'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import FrozenRoute from './FrozenRoute'
import Footer from '@/components/Footer'
import { createContext, useContext, useState, useEffect } from "react";


interface GlobalContextProps {
  isFirstLoad: boolean;
  setIsFirstLoad: (value: boolean) => void;
}


interface PageAnimatePresenceProps {
  children: ReactNode,
  socialMenuData: MenuItems | {};
}


const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);


const PageAnimatePresence: React.FC<PageAnimatePresenceProps> = ({ children, socialMenuData }) => {

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const pathname = usePathname()
  const generalVariants =  {
      initial: { opacity: 0 },
      enter: { opacity: 1 },
      exit: { opacity: 0 },
  };
  
  const pageTransition = {
    duration: 0.8,
    ease: "easeInOut",
  }

  useEffect(() => {
    if (sessionStorage.getItem("hasLoadedBefore")) {
      setIsFirstLoad(false);
    } else {
      sessionStorage.setItem("hasLoadedBefore", "true");
      setIsFirstLoad(true);
    }
  }, []);
  
  return (
    <AnimatePresence mode="popLayout" >
        <motion.div key={pathname} initial="initial" animate="enter" exit="exit" variants={generalVariants} transition={pageTransition} 
        className="outer-motion-div "
        >
          <FrozenRoute>
              <GlobalContext.Provider value={{ isFirstLoad, setIsFirstLoad }}>
                  {children}
              </GlobalContext.Provider>
          </FrozenRoute>
          <Footer socialMenuData={socialMenuData} />
      </motion.div>
    </AnimatePresence>
  )
}


export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalState must be used within a GlobalProvider");
  return context;
};
// // Add PropTypes for ESLint validation
// PageAnimatePresence.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default PageAnimatePresence
