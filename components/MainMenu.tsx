'use client';

import React from 'react';
import Link from 'next/link';
// import { logDev } from '@/utils/logDev';

type MenuProps = {
    mainMenuData: MenuItems | {};
    socialMenuData: MenuItems | {};
};

const MainMenu: React.FC<MenuProps> = ({ mainMenuData, socialMenuData }) => {



    const mainMenuItems = mainMenuData;
    const socialMenuItems = socialMenuData;


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

    if ( !('edges' in mainMenuItems) ) return <></>
    if ( !('edges' in socialMenuItems) ) return <></>

    return (
        <div className="custom-main-menu-wrapper w-full" id="main-menu">
            <div className="grid grid-cols-2 text-white pl-[38px]">
                <div className="flex flex-col items-start justify-center h-custom">
                    <ul className="menu-items text-[#e5e5e5]">
                        {
                            mainMenuItems?.edges?.map((menuItem) => (
                                <li key={"menu-item-"+menuItem.node.id} >
                                    <Link href={ menuItem.node.uri } className="menu-element" onClick={handleMenuClick} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>{menuItem.node.label}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="flex flex-col items-end justify-center h-custom">
                    <p className="social-in-menu pb-4 border-custom rotate-90- social-links-menu">
                        <span className="menu-social-item-wrapper" >
                            <Link href={ socialMenuItems.edges[2].node.uri } target={ socialMenuItems.edges[2].node.target } className="menu-element uppercase font-bold" onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>{ socialMenuItems.edges[2].node.label }</Link> 
                        </span>
                        <span className="menu-social-item-wrapper" >
                            <span className="menu-element p-4" >|</span>
                        </span>
                        <span className="menu-social-item-wrapper" >
                            <Link href={ socialMenuItems.edges[1].node.uri } target={ socialMenuItems.edges[1].node.target } className="menu-element uppercase font-bold" onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>{ socialMenuItems.edges[1].node.label }</Link> 
                        </span>
                        <span className="menu-social-item-wrapper" >
                            <span className="menu-element p-4" >|</span>
                        </span>
                        <span className="menu-social-item-wrapper" >
                            <Link href={ socialMenuItems.edges[0].node.uri } target={ socialMenuItems.edges[0].node.target } className="menu-element uppercase font-bold" onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>{ socialMenuItems.edges[0].node.label }</Link>
                        </span>
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 text-white pl-[38px]">
                <div className="flex flex-col items-start justify-center h-[50px]">
                    <span className="menu-privacy-item-wrapper" >
                        <Link href="/privacy" className="menu-element uppercase text-sm" onClick={handleMenuClick} onMouseOver={(e) => handleHover(e, true)} onMouseOut={(e) => handleHover(e, false)} scroll={false}>Privacy Policy</Link>
                    </span>
                </div>
                <div className="flex flex-col items-end justify-center h-[50px] mr-[40px]"><hr className="menu-bottom-line mt-[5px]" /></div>
            </div>
        </div>
    );
};

export default MainMenu;
