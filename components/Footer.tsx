import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full h-[300px]">
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[25%,50%,25%]">
                    <div className="flex flex-col  p-10">
                        <Link href="#mailto:info@lifeclicks.com" className="uppercase text-lg" scroll={false}>info@lifeclicks.com</Link>
                        <Link href="#tel:+306989195098" className=" text-lg" scroll={false}>+30 6989195098</Link>
                        <br/>
                        <br/>
                        <Link href="#" className="underline text-xs" scroll={false}>Privacy Policy</Link>
                    </div>
                    <div className="flex flex-col items-center justify-center   p-10">
                        <p className="pb-4 px-6 border-custom" >
                            <Link href="#" className="uppercase font-bold" scroll={false}>instagram</Link> | <Link href="#" className="uppercase font-bold" scroll={false}>vimeo</Link> | <Link href="#" className="uppercase font-bold" scroll={false}>facebook</Link> 
                        </p>
                    </div>
                    <div className="flex flex-col  p-10">
                        <span className="text-lg" >2024</span>
                        <span className="uppercase text-lg" >Lifeclicks ©</span>
                        <span className="uppercase text-lg" >All rights reserved</span>
                        <br/>
                        <Link href="#" className="underline text-xs" scroll={false}>Created by hpot.digital</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

