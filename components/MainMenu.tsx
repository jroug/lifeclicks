'use client';
import React from 'react';
import Link from 'next/link';

const MainMenu = () => {

    const handleMenuClick = () => {
        // Get the menu and menu text elements with proper typing
        const menu = document.getElementById('main-menu') as HTMLElement | null;

        // Toggle the 'open' class on the menu
        menu?.classList.remove('open');
    }

    return (
        <div className="custom-main-menu-wrapper w-full " id="main-menu" >
            <div className="grid grid-cols-2 text-white pl-[70px]">
                <div className="flex flex-col items-start justify-center h-custom">
                    <ul className="menu-items text-white">
                        <li><Link href="/contact" onClick={handleMenuClick} scroll={false} >CONTACT</Link></li>
                        <li><Link href="/faq" onClick={handleMenuClick} scroll={false} >F.A.Q.</Link></li>
                        <li><Link href="/" onClick={handleMenuClick} scroll={false} >portfolio</Link></li>
                        <li><Link href="/about" onClick={handleMenuClick} scroll={false} >about us</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col items-end justify-center h-custom">
                    <p className="social-in-menu pb-4 border-custom rotate-90-" >
                        <Link href="#" className="uppercase font-bold" >instagram</Link> | <Link href="#" className="uppercase font-bold" scroll={false}>vimeo</Link> | <Link href="#" className="uppercase font-bold" scroll={false}>facebook</Link> 
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-white pl-[70px]">
                <div className="flex flex-col items-start justify-center h-[50px]"><Link href="#" className="underline text-xs" scroll={false}>Privacy Policy</Link></div>
                <div className="flex flex-col items-end justify-center h-[50px] mr-[50px]"><hr className="w-full" /></div>
            </div>
        </div>
    );
};

export default MainMenu;