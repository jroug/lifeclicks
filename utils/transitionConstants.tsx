 
export const firstLoadVariants = {
    initial: { x: 0, y: 0, scale: 1 },
    enter: { x: 0, y: 0, scale: 1 },
    exit: { x: -200, y: 0, scale: 1 },
};

export const pageTransition = {
    duration: 0.8,
    ease: "easeInOut",
};
  
/* it is for home page - comes from the left */
export const homeVariants = {
    initial: { x: -200, y: 0 },
    enter: { x: 0, y: 0 },
    exit: { x: -200, y: 0 },
};

/* it is for inner pages - comes from the right */
export const generalVariants = {
    initial: { x: 200 },
    enter: { x: 0 },
    exit: { x: 200 },
};