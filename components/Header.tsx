'use client';

import React, { useEffect } from 'react';
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

       
        const menuButton = e.currentTarget as HTMLElement;   
        const menu = document.getElementById('main-menu') as HTMLElement | null;
        const menuText = document.getElementById('menu-text') as HTMLElement | null;

        if ( menuButton?.classList.contains('disabled')  ) {
            return;
        }else{
            if (  menu?.classList.contains('open') === false ){ 
                menuButton.classList.add('disabled');
                // Temporarily lock the button for 1 second
                setTimeout(() => {
                    menuButton.classList.remove('disabled');  
                }, 1400); // delay as counted from the css (the last item is the privacy policy -> delay + transition = 1700ms)
            }
        }



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

    useEffect(() => {

        document.getElementById('main-header')?.classList.add('show-items');
    })
    

    return (
        <header id="main-header" className="fixed z-10 w-full top-0">
            <div className="w-full">
                <div className="grid grid-cols-2">
                    <div className="flex flex-col items-start justify-center pl-10">
                        <span className="hidden-reveal-item-wrapper" >
                            <Link className="hidden-reveal-item" href="/" onClick={handleHomeClick} scroll={false}>
                                <Image src="/images/logo/logo.svg"  alt="Logo"  width={120} height={30} />
                            </Link>
                        </span>
                    </div>
                    <div className="flex flex-col items-end justify-center pr-10">
                        <span className="hidden-reveal-item-wrapper" >
                            <Link href="#" className="hidden-reveal-item text-white font-cormorant_garamond text-[1.875rem] leading-[23px]" onClick={handleMenuButtonClick}  onMouseOver={(e) => handleMenuButtonHover(e, true)} onMouseOut={(e) => handleMenuButtonHover(e, false)} id="menu-text" scroll={false}>MENU</Link>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
