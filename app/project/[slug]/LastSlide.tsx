import Link from 'next/link';
 
interface LastSlideProps {
    nextProjectSlug: string; 
}

const LastSlide: React.FC<LastSlideProps> = ({
    nextProjectSlug,
  }) => {
    return (
        <div className="w-full h-full relative">
            <h2 className="flex items-center justify-center h-full text-6xl text-black">
            <Link
                href={`/project/${nextProjectSlug}`}
                className="next-project font-montserrat uppercase"
            >
                Next Project
            </Link>
            </h2>
      </div>
    );
};

export default LastSlide;