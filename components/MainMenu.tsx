'use client';
import React from 'react';
import Link from 'next/link';

const MainMenu = () => {

    const handleMenuClick = () => {
        const menu = document.getElementById('main-menu') as HTMLElement | null;
        const menuText = document.getElementById('menu-text') as HTMLElement | null;
        menu?.classList.remove('open');
        if (menuText?.innerHTML === 'CLOSE') menuText.innerHTML = 'MENU';
    };

    const handleHover = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, hover: boolean) => {
        const mainMenuWrapper = document.getElementById('main-menu') as HTMLElement | null;
        if (mainMenuWrapper){
            if (hover) mainMenuWrapper.classList.add('hovered-menu-items');
            else mainMenuWrapper.classList.remove('hovered-menu-items');
        }
    };

    return (
        <div className="custom-main-menu-wrapper w-full" id="main-menu">
            <div className="grid grid-cols-2 text-white pl-[70px]">
                <div className="flex flex-col items-start justify-center h-custom">
                    <ul className="menu-items text-white">
                        <li><Link href="/contact" className="menu-element" onClick={handleMenuClick} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>CONTACT</Link></li>
                        <li><Link href="/faq" className="menu-element" onClick={handleMenuClick} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>F.A.Q.</Link></li>
                        <li><Link href="/" className="menu-element" onClick={handleMenuClick} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>portfolio</Link></li>
                        <li><Link href="/about" className="menu-element" onClick={handleMenuClick} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>about us</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col items-end justify-center h-custom">
                    <p className="social-in-menu pb-4 border-custom rotate-90-">
                        <Link href="#" className="menu-element uppercase font-bold" onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>instagram</Link> 
                        <span className="menu-element p-4" >|</span>
                        <Link href="#" className="menu-element uppercase font-bold" onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>vimeo</Link> 
                        <span className="menu-element p-4" >|</span>
                        <Link href="#" className="menu-element uppercase font-bold" onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>facebook</Link>
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-white pl-[70px]">
                <div className="flex flex-col items-start justify-center h-[50px]"><Link href="#" className="menu-element uppercase underline text-sm" onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>Privacy Policy</Link></div>
                <div className="flex flex-col items-end justify-center h-[50px] mr-[50px]"><hr className="w-full" /></div>
            </div>
        </div>
    );
};

export default MainMenu;
