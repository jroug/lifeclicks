'use client';

import Link from 'next/link';
import Image from 'next/image';
import poster from '@/public/logo-mini-black.svg'; // Adjust the path
// import { logDev } from '@/utils/logDev';

interface SlideshowImageProps {
  videoSource: VideoMedia;
  title: string;
  uri: string;
}

export default function ThumbImageVideos({ videoSource, title, uri }: SlideshowImageProps) {
  // logDev('videoSource', videoSource);

  return (
    <Link href={uri.replace('videos/', 'films/')} className="w-full h-full relative group homeslide" scroll={false}>
      <div className="w-full h-full" >
        { 
          videoSource 
          ?
          <Image
              className="w-full h-full object-cover aspect-[74/97]"
              src={videoSource.node.sourceUrl || ""}
              alt={videoSource.node.altText || title || ""}
              width={videoSource.node.mediaDetails.width || undefined}
              height={videoSource.node.mediaDetails.height || undefined}
              priority={true}
              placeholder='blur'
              blurDataURL={poster.src}
          />
          :
          <div className="flex flex-col items-center justify-center w-full h-full">
              <div  className="w-full h-full aspect-[74/97] flex justify-center" >     
                <Image
                  
                    src={poster.src}
                    alt={ title || ""}
                    width="100"
                    height="119"
                    priority={true}
                />
            </div>
          </div>
        }
      </div>
      <div className="hoverLayer flex flex-col items-center justify-center absolute w-full h-full z-10 bg-[#00000091] text-[#ffffff] top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <h2 className="font-cormorant_garamond text-xl md:text-2xl uppercase">{title}</h2>
      </div>
    </Link>
  );
}