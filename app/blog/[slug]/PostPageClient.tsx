"use client";

import React from "react";
import { motion } from "framer-motion";
import parse from 'html-react-parser';
import { logDev } from "@/utils/logDev";
import Link from "next/link";
import Image from "next/image";
import { useGlobalState } from "@/context/PageAnimatePresence";
import { firstLoadVariants }  from "@/utils/transitionConstants";
import { pageTransition }  from "@/utils/transitionConstants";
import { generalVariants }  from "@/utils/transitionConstants";


// Props interface
interface PostPageClientProps {
  slug:string,
  // postPageData: PostsMap;
 
}

const ProjectPageClient: React.FC<PostPageClientProps> = ({
  slug,
  // postPageData,
}) => {

  const { thisIsTheFirstLoad, postsMap } = useGlobalState();

  const postPageData = postsMap;

  // Destructure project data
  const {
    title: postTitle,
    date: postDate,
    content: postContent,
    featuredImage: postfeaturedImage,
    nextPostSlug,
  } = postPageData[slug];

  // logDev('title', postTitle);
  // logDev('postContent', postContent);

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={thisIsTheFirstLoad ? firstLoadVariants : generalVariants}
      transition={pageTransition}
    >
    <main className="flex items-center justify-center bg-gray-100">
        <div className="mt-[100px] xl:mb-[100px] w-full max-w-6xl px-[30px] lg:px-0">
          <div className="flex w-full justify-center pb-[100px]"><Link href={"/blog"}>BACK TO ALL ARTICLE</Link></div>
            <h1 className="flex justify-center mx-5 pb-[40px] md:mx-auto text-[20px] md:text-[40px] font-bold text-left font-cormorant_garamond uppercase font-light">
                {postTitle}
            </h1>
            <div className="flex w-full justify-center pb-[40px]">
              {new Intl.DateTimeFormat('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
              }).format(new Date(postDate))}
            </div>
            <div className="flex w-full justify-center pb-[40px]">
              <Image
                  className="h-full w-auto"
                  src={postfeaturedImage?.node.sourceUrl || ""}
                  alt={postfeaturedImage?.node.altText || postTitle || ""}
                  width={postfeaturedImage?.node.mediaDetails.width || undefined}
                  height={postfeaturedImage?.node.mediaDetails.height || undefined}
                  priority={true}
              />
            </div>
            <div className="post-content-wrapper" >{postContent ? parse(postContent) : '' }</div>
            <div className="flex w-full justify-center pt-[40px]"><Link href={"/blog/" + nextPostSlug} className="underline" >NEXT ARTICLE</Link></div>

        </div>
      </main>
    </motion.div>
  );
};

export default ProjectPageClient;