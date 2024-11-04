
 
 
import Image from "next/image";
import Link from "next/link";
 

export default function Home() {

  return (
    <>
      <header className="fixed z-10" ><Link href="/contact" scroll={false}>CONTACT</Link></header>
      <main className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 w-full mx-auto">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="group flex justify-center overflow-hidden text-center"
            >
              <Link href = {"/projects/test" + (i%2) } className="w-full h-full" scroll={false} >
                <Image
                  className="w-full h-full transform transition-transform duration-300 group-hover:scale-105 object-cover"
                  src={`/images/atest${i%4}.jpg`} 
                  alt={`test ${i + 1}`}
                  width={515}
                  height={618}
                  priority
                />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
