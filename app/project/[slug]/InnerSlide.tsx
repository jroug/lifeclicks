"use client";
import Image from 'next/image';
import poster from '@/public/images/loader-video.png'; // Adjust the path

interface InnerSlideProps {
    projectMedia: ProjectMedia;
}

const InnerSlide: React.FC<InnerSlideProps> = ({
    projectMedia,
  }) => {
    return (
        <div className="md:h-full md:w-auto">
            <Image
            className="md:h-full md:w-auto md:pl-14 pt-2 md:py-14 mx-auto"
            src={projectMedia.fullFileUrl || ""}
            alt={projectMedia.postTitle || ""}
            width={projectMedia.fullWidth || undefined}
            height={projectMedia.fullHeight || undefined}
            priority={true}
            placeholder='blur'
            blurDataURL={poster.src}
            />
      </div>
    );
};

export default InnerSlide;