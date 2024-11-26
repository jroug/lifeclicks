'use client';
import React from 'react';
import Link from 'next/link';

const MainMenu = () => {

    const handleMenuClick = () => {
        const menu = document.getElementById('main-menu') as HTMLElement | null;
        const menuText = document.getElementById('menu-text') as HTMLElement | null;
        menu?.classList.remove('open');
        setTimeout(function(){
            menu?.classList.remove('z-index-9');
        },200)
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
            <div className="grid grid-cols-2 text-white pl-[38px]">
                <div className="flex flex-col items-start justify-center h-custom">
                    <ul className="menu-items text-[#e5e5e5]">
                        <li><Link href="/contact" className="menu-element" onClick={handleMenuClick} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>CONTACT</Link></li>
                        <li><Link href="/faq" className="menu-element" onClick={handleMenuClick} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>F.A.Q.</Link></li>
                        <li><Link href="/" className="menu-element" onClick={handleMenuClick} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>portfolio</Link></li>
                        <li><Link href="/about" className="menu-element" onClick={handleMenuClick} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>about us</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col items-end justify-center h-custom">
                    <p className="social-in-menu pb-4 border-custom rotate-90- social-links-menu">
                        <span className="menu-social-item-wrapper" >
                            <Link href="#" className="menu-element uppercase font-bold" onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>instagram</Link> 
                        </span>
                        <span className="menu-social-item-wrapper" >
                            <span className="menu-element p-4" >|</span>
                        </span>
                        <span className="menu-social-item-wrapper" >
                            <Link href="#" className="menu-element uppercase font-bold" onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>vimeo</Link> 
                        </span>
                        <span className="menu-social-item-wrapper" >
                            <span className="menu-element p-4" >|</span>
                        </span>
                        <span className="menu-social-item-wrapper" >
                            <Link href="#" className="menu-element uppercase font-bold" onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>facebook</Link>
                        </span>
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-white pl-[38px]">
                <div className="flex flex-col items-start justify-center h-[50px]">
                    <span className="menu-privacy-item-wrapper" >
                        <Link href="#" className="menu-element uppercase text-sm" onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>Privacy Policy</Link>
                    </span>
                </div>
                <div className="flex flex-col items-end justify-center h-[50px] mr-[40px]"><hr className="menu-bottom-line mt-[5px]" /></div>
            </div>
        </div>
    );
};

export default MainMenu;
