"use client";
import Image from 'next/image';
import poster from '@/public/images/loader-video.png'; // Adjust the path

 
interface TopSlideProps {
    projectEventType: string;
    projectEventPlace: string;
    projectTitle: string;
    portfolioPageMedia: ProjectMedia[];
}

const TopSlide: React.FC<TopSlideProps> = ({
    projectEventType,
    projectEventPlace,
    projectTitle,
    portfolioPageMedia,
  }) => {
    return (
        <div className="flex h-full relative bg-araxnowhite flex-col md:flex-row">
        <div className="relative z-10 bg-araxnowhite flex flex-col items-center justify-center h-full w-full md:w-half-important">
          <span className="font-montserrat uppercase w-full text-2xl text-black text-center">
            {projectEventType}
          </span>
          <span className="font-montserrat uppercase w-full text-sm text-black text-center santorini-subtitle">
            {projectEventPlace}
          </span>
          <h1 className="font-cormorant_garamond uppercase w-full text-5xl sm:text-6xl text-black text-center">
            {projectTitle}
          </h1>
        </div>
        <div className="flex flex-col h-full relative w-full md:w-half-important ">
          {portfolioPageMedia.length > 0 && portfolioPageMedia[0]?.postExcerpt && (
            <Image
              src={portfolioPageMedia[0].postExcerpt}
              alt={portfolioPageMedia[0]?.postTitle || ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
              priority={true}
              placeholder='blur'
              blurDataURL={poster.src}
            />
          )}
        </div>
      </div>
    );
};

export default TopSlide;