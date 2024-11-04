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
    <>
      <header className="fixed z-10">
        <Link href="/contact" scroll={false}>CONTACT</Link>
      </header>
      <main className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 w-full mx-auto">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="group flex justify-center overflow-hidden text-center"
            >
              <Link href={`/projects/test${i % 2}`} className="w-full h-full" scroll={false}>
                <SlideshowImage 
                  classes="w-full h-full transform transition-transform duration-300 group-hover:scale-105 object-cover aspect-[74/93]"
                  images={data[`imageSources_${(i % 12) + 1}`]} // Access correct array with modulo
                  alt={`test ${i + 1}`} 
                />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
