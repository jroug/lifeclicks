import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const About = () => {
    return (
        <main className="bg-black text-white" >
            <div className="grid grid-cols-[45%,45%,10%] ">
                <div className="flex flex-col" >
                    <div className="ml-[70px] mt-10 max-w-[400px]">
                        <h1 className="text-[80px]">ABOUT US</h1>
                        <p className="uppercase">
                            Your success is our mission, and we are here to ensure your wedding photography business flourishes, making every moment truly picture-perfect.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col align-center" >
                    <div className="mt-10">
                        <Image 
                            src="/images/logo/logo-mini-white.svg" 
                            alt="Logo" 
                            width={464} // Adjust the width as needed
                            height={500} // Adjust the height as needed
                        />
                    </div>
                </div>
                <div className="flex flex-col items-end" >
                    <div className="custom-margins-hr-about">
                        <hr />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 text-white">
                <div className="block max-w-[80%] mx-auto mt-[30px] mb-[130px]">
                    <div className="block" >
                        <p className="block p-11" >
                            Our priceless memories, what we have lived and carefully keep within us, are the most valuable we have gained in the journey of life. And if the passage of time constantly leads us to new adventures, there is certainly a way to keep all these moments “alive”, reliving every time we see them, the feelings we felt when we lived them.
                        </p>
                        <p className="block" >
                            <Link href="#" >Start a project with us</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default About;