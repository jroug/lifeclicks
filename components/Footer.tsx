import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full h-[250px]">
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[25%,50%,25%]">
                    <div className="flex flex-col  p-10">
                        <span className="underline-effect"><Link href="#mailto:info@lifeclicks.com" className="uppercase text-footer" scroll={false}>info@lifeclicks.com</Link></span>
                        <br/>
                        <br/>
                        <span className="underline-effect"><Link href="#" className="text-xs" scroll={false}>Privacy Policy</Link></span>
                    </div>
                    <div className="flex flex-col items-center justify-center   p-10">
                        <p className="pb-4 px-6" >
                            <span className="underline-effect"><Link href="#" className="uppercase font-bold text-footer" scroll={false}>instagram</Link></span>
                            <span> | </span>
                            <span className="underline-effect"><Link href="#" className="uppercase font-bold text-footer" scroll={false}>vimeo</Link></span>
                            <span> | </span>
                            <span className="underline-effect"><Link href="#" className="uppercase font-bold text-footer" scroll={false}>facebook</Link></span>
                        </p>
                    </div>
                    <div className="flex flex-col  p-10">
                        <span className="uppercase text-footer" >Lifeclicks © 2024</span>
                        <span className="uppercase text-footer" >All rights reserved</span>
                        <br/>
                        <span className="underline-effect"><Link href="#" className="text-xs" scroll={false}>Created by hpot.digital</Link></span>
                    </div>
                </div>
            </div>
        </footer>
    );
    
};

export default Footer;

