import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full h-[300px] md:h-[250px] bg-whitef5">
            <div className="w-full">
                <div className="grid grid-cols-[50%,50%] md:grid-cols-[27%,46%,27%] ">
                    <div className="order-2 md:order-1 flex flex-col pt-5 pl-4 md:p-10">
                        <div className="w-[180px] flex flex-col mt-[-1px]">
                            <span className="underline-effect pb-[35px]"><Link href="#mailto:info@lifeclicks.com" className="uppercase text-footer" scroll={false}>info@lifeclicks.com</Link></span>
                            <span className="underline-effect"><Link href="#" className="text-xs" scroll={false}>Privacy Policy</Link></span>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 flex flex-col items-center justify-center col-span-2 md:col-span-1 pt-[40px] md:p-10">
                        <p className="pb-4" >
                            <span className="underline-effect"><Link href="#" className="uppercase font-bold text-footer" scroll={false}>instagram</Link></span>
                            <span> | </span>
                            <span className="underline-effect"><Link href="#" className="uppercase font-bold text-footer" scroll={false}>vimeo</Link></span>
                            <span> | </span>
                            <span className="underline-effect"><Link href="#" className="uppercase font-bold text-footer" scroll={false}>facebook</Link></span>
                        </p>
                    </div>
                    <div className="order-3 md:order-3 flex flex-col pt-5 pr-4 md:p-10 items-end">
                        <div className="w-[180px] flex flex-col">
                            <span className="uppercase text-footer" >Lifeclicks © 2024</span>
                            <span className="uppercase text-footer pb-[17px]" >All rights reserved</span>
                            <span className="underline-effect"><Link href="#" className="text-xs" scroll={false}>Created by hpot.digital</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
    
};

export default Footer;

