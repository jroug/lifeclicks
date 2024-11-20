import Link from "next/link";
import SlideshowImage from "../components/SlideshowImage";


function shuffleArray(array: string[]): string[] {
  return array.sort(() => Math.random() - 0.5);
}

export default function Home() {
  const baseImages = [
    '/images/atest0.jpg',
    '/images/atest1.jpg',
    '/images/atest2.jpg',
    '/images/atest3.jpg',
    '/images/atest4.jpg'
  ];

  const data: Record<string, string[]> = {
    imageSources_1: shuffleArray([...baseImages]),
    imageSources_2: shuffleArray([...baseImages]),
    imageSources_3: shuffleArray([...baseImages]),
    imageSources_4: shuffleArray([...baseImages]),
    imageSources_5: shuffleArray([...baseImages]),
    imageSources_6: shuffleArray([...baseImages]),
    imageSources_7: shuffleArray([...baseImages]),
    imageSources_8: shuffleArray([...baseImages]),
    imageSources_9: shuffleArray([...baseImages]),
    imageSources_10: shuffleArray([...baseImages]),
    imageSources_11: shuffleArray([...baseImages]),
    imageSources_12: shuffleArray([...baseImages])
  };

  return (
    <main className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-full mx-auto">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="group flex justify-center overflow-hidden text-center"
          >
            <Link href={`/projects/test`} className="w-full h-full relative" scroll={false}>
              <SlideshowImage 
                classes="w-full h-full transform transition-transform duration-300 group-hover:scale-105 object-cover aspect-[74/93]"
                images={data[`imageSources_${(i % 12) + 1}`]} // Access correct array with modulo
                alt={`test ${i + 1}`} 
              />
              <div className="hoverLayer flex flex-col items-center justify-center absolute w-full h-full z-100 bg-[#00000091] text-[#ffffff] top-0 left-0" >
                <h2 className="font-cormorant_garamond text-2xl" >JOSHUA & NAYARA</h2>
                <h3 className="font-montserrat italic ">SANTORINI</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
