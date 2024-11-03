'use client'


import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import FrozenRoute from './FrozenRoute'

const PageAnimatePresence = ({ children }) => {
 
  const pathname = usePathname()


  const firstLoadVariants = {
      initial: { opacity: 0 },
      enter: { opacity: 1 },
      exit: { opacity: 0, x: -200 },
  };
  const pageTransition = {
      duration: 0.8,
      ease: "easeInOut",
  };
 

  return (
    <AnimatePresence mode="popLayout">
      {/**
       * We use `motion.div` as the first child of `<AnimatePresence />` Component so we can specify page animations at the page level.
       * The `motion.div` Component gets re-evaluated when the `key` prop updates, triggering the animation's lifecycles.
       * During this re-evaluation, the `<FrozenRoute />` Component also gets updated with the new route components.
       */}
      <motion.div key={pathname}
        initial="initial"
        animate="enter"
        variants={firstLoadVariants}
        transition={pageTransition}
      >
        <FrozenRoute>{children}</FrozenRoute>
      </motion.div>
    </AnimatePresence>
  )
}

export default PageAnimatePresence