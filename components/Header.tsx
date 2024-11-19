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

        if (menuText?.innerHTML === 'CLOSE'){
            menuText.innerHTML = 'MENU';
        }
    }


    const handleMenuButtonClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        e.preventDefault();

        const menu = document.getElementById('main-menu') as HTMLElement | null;
        const menuText = document.getElementById('menu-text') as HTMLElement | null;

        // Toggle the 'open' class on the menu
        menu?.classList.toggle('open');

        // Toggle the text between 'MENU' and 'CLOSE'
        if (menuText?.innerHTML === 'MENU') {
            menuText.innerHTML = 'CLOSE';
        } else if (menuText?.innerHTML === 'CLOSE'){
            menuText.innerHTML = 'MENU';
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
                        <Link 
                            href="#" 
                            className="text-white font-cormorant_garamond text-5xl" 
                            onClick={handleMenuButtonClick} 
                            id="menu-text"
                            scroll={false}
                        >
                            MENU
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
