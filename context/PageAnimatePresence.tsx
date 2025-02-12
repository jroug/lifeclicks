'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import FrozenRoute from './FrozenRoute'
import Footer from '@/components/Footer'
import { createContext, useContext, useState, useEffect } from "react";
import { logDev } from '@/utils/logDev'

interface GlobalContextProps {
  isMobile: boolean;
  thisIsTheFirstLoad: boolean;
  setThisIsTheFirstLoad: (value: boolean) => void;
  projectsMap: ProjectsMap;
  pagesMap: PagesMap;
  postsMap: PostsMap;
  videosMap: VideosMap;
}


interface PageAnimatePresenceProps {
  children: ReactNode;
  isMobile: boolean;
  socialMenuData: MenuItems | {};
  projectsMap: ProjectsMap;
  pagesMap: PagesMap;
  postsMap: PostsMap;
  videosMap: VideosMap;
}


const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);


const PageAnimatePresence: React.FC<PageAnimatePresenceProps> = ({ children, isMobile, socialMenuData, projectsMap, pagesMap, postsMap, videosMap }) => {

  const [thisIsTheFirstLoad, setThisIsTheFirstLoad] = useState<boolean>(true);

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
    logDev('render: ', pathname);
    // this runs after the useEffect of all its children -> so it runs last
    setThisIsTheFirstLoad(false)
  }, []);
  
  return (
    <AnimatePresence mode="popLayout" >
        <motion.div key={pathname} initial="initial" animate="enter" exit="exit" variants={generalVariants} transition={pageTransition} className="outer-motion-div" >
          <FrozenRoute>
              <GlobalContext.Provider value={{ isMobile, thisIsTheFirstLoad, setThisIsTheFirstLoad, projectsMap, pagesMap, postsMap, videosMap }}>
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
