'use client'

import { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import FrozenRoute from './FrozenRoute'
import Footer from '@/components/Footer'


interface PageAnimatePresenceProps {
  children: ReactNode,
  socialMenuData: MenuItems | {};
}

const PageAnimatePresence: React.FC<PageAnimatePresenceProps> = ({ children, socialMenuData }) => {

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

  return (
    <AnimatePresence mode="popLayout" >
        <motion.div key={pathname} initial="initial" animate="enter" exit="exit" variants={generalVariants} transition={pageTransition} 
        className="outer-motion-div "
        >
          <FrozenRoute>{children}</FrozenRoute>
          <Footer socialMenuData={socialMenuData} />
      </motion.div>
    </AnimatePresence>
  )
}

// // Add PropTypes for ESLint validation
// PageAnimatePresence.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default PageAnimatePresence
