'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from "framer-motion";
 

interface TemplateProps {
    children: ReactNode;
}

const regularVariants = {
    initial: { opacity: 0, x: 200 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 },
};

const pageTransition = {
    duration: 0.8,
    ease: "easeInOut",
};

export default function Template({ children }: TemplateProps) {
    const pathname = usePathname();

    return (
            <motion.div 
                key={"landing"}  // Key based on pathname to trigger animation on route change
                initial="initial"
                animate="enter"
                exit="exit"
                variants={regularVariants}
                transition={pageTransition}
            >
                {children}
            </motion.div>
    );
}
