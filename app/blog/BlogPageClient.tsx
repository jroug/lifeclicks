'use client';

import { motion } from 'framer-motion';

// import { logDev } from "@/utils/logDev";
import Link from 'next/link';
import Image from 'next/image';
// import { useSiteData } from '@/context/SiteDataContext';


// PagesMap declarations end
interface BlogPageClientProps {
    pagesMap: PagesMap,
    postsMap: PostsMap
}

const BlogPageClient: React.FC<BlogPageClientProps> = ({ pagesMap, postsMap }) => {

    // const data = useSiteData();
    const pageBlogData = pagesMap['blog'];
    const postsData = postsMap;
    // logDev( postsData );

    // Ensure the FAQ data exists and provide a fallback to prevent errors
    const blogTitle = pageBlogData.title;
  
    const contactVariants = {
        initial: { x: 200 },
        enter: { x: 0 },
        exit: { x: 200 },
    };

    const pageTransition = {
        duration: 0.8,
        ease: 'easeInOut',
    };

    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={contactVariants}
            transition={pageTransition}
        >
            <main className="flex items-center justify-center bg-gray-100">
                <div className="mt-[100px] xl:mb-[100px] w-full max-w-6xl">
                    <h1 className="mx-5 md:mx-auto text-[40px] md:text-[80px] font-bold text-left mb-10 font-cormorant_garamond uppercase font-light">
                        {blogTitle}
                    </h1>
                    <div className="blog md:mx-auto uppercase font-montserrat pt-5 pb-16 text-sm">
                        <div className="grid grid-cols-2 w-full">
                            {Object.entries(postsData).map(([key, post], index) => (
                                <Link 
                                    href={ "/blog" + post.uri } 
                                    key={key} 
                                    className={`border  flex flex-col items-center text-center pr-[80px] pb-[40px] ${index % 2 === 1 ? "pt-[80px]" : ""}`}
                                >
                                    <div className="flex w-full justify-center pb-[40px]">
                                    <Image
                                        className="h-full w-auto"
                                        src={post.featuredImage?.node.sourceUrl || ""}
                                        alt={post.featuredImage?.node.altText || post.title || ""}
                                        width={post.featuredImage?.node.mediaDetails.width || undefined}
                                        height={post.featuredImage?.node.mediaDetails.height || undefined}
                                        priority={true}
                                    />
                                    </div>
                                    <h2 className="text-lg">{post.title}</h2>
                                    <p className="text-gray-500 text-sm">
                                        {new Intl.DateTimeFormat('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        }).format(new Date(post.date))}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
}

export default BlogPageClient;