'use client';

import React from 'react';
import Link from "next/link";
import Image from 'next/image';





const Header: React.FC = () => {
    
    const handleHomeClick = () => {
        const menu = document.getElementById('main-menu') as HTMLElement | null;
        const menuText = document.getElementById('menu-text') as HTMLElement | null;

        // Toggle the 'open' class on the menu
        menu?.classList.remove('open');
        setTimeout(function(){
            menu?.classList.remove('z-index-9');
        },200)

        if (menuText?.innerHTML === 'CLOSE'){
            menuText.innerHTML = 'MENU';
        }
    }


    const handleMenuButtonClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        e.preventDefault();

        const menu = document.getElementById('main-menu') as HTMLElement | null;
        const menuText = document.getElementById('menu-text') as HTMLElement | null;

        // Toggle the 'open' class on the menu
        if (  menu?.classList.contains('open') ){
            menu?.classList.remove('open');
            setTimeout(function(){
                menu?.classList.remove('z-index-9');
            },500)
        }else{
            menu?.classList.add('z-index-9');
            menu?.classList.add('open');
            
        }
       
        
       

        // Toggle the text between 'MENU' and 'CLOSE'
        if (menuText?.innerHTML === 'MENU') {
            menuText.innerHTML = 'CLOSE';
        } else if (menuText?.innerHTML === 'CLOSE'){
            menuText.innerHTML = 'MENU';
            menuText.style.color = '';
        }
    };

    const handleMenuButtonHover = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, hover: boolean) => {
        const menuText = document.getElementById('menu-text') as HTMLElement | null;
        if (menuText?.innerHTML === 'CLOSE') {
            (event.target as HTMLElement).style.color = hover ? '#ffffff29' : ''; // Red on hover when text is 'CLOSE'
        } else {
            (event.target as HTMLElement).style.color = ''; // Reset color when not hovering or text is 'MENU'
        }
    };

    return (
        <header className="fixed z-10 w-full top-0">
            <div className="w-full">
                <div className="grid grid-cols-2">
                    <div className="flex flex-col items-start justify-center pl-10">
                        <Link href="/" onClick={handleHomeClick} scroll={false}>
                            <Image 
                                src="/images/logo/logo.svg" 
                                alt="Logo" 
                                width={195} // Adjust the width as needed
                                height={50} // Adjust the height as needed
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col items-end justify-center pr-10">
                        <Link  href="#" className="text-white font-cormorant_garamond text-5xl" onClick={handleMenuButtonClick}  onMouseOver={(e) => handleMenuButtonHover(e, true)} onMouseOut={(e) => handleMenuButtonHover(e, false)} id="menu-text" scroll={false}>MENU</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
