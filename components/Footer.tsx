import React from 'react';
import Link from "next/link";

type MenuProps = {
    socialMenuData: MenuItems | {};
};

const Footer: React.FC<MenuProps> = ({ socialMenuData }) => {

    const socialMenuItems = socialMenuData;
    if ( !('edges' in socialMenuItems) ) return <></>

    return (
        <footer className="w-full h-[300px] md:h-[250px] bg-whitef5">
            <div className="w-full text-center sm:text-left">
                <div className="flex flex-col sm:grid sm:grid-cols-[50%,50%] md:grid-cols-[27%,46%,27%] ">

                    <div className="order-2 md:order-1 flex justify-center sm:flex-col pt-5 sm:pl-4 md:p-10">
                        <div className="w-[180px] flex flex-col mt-[-1px]">
                            <span className="underline-effect sm:pb-[35px]"><Link href="mailto:info@lifeclicks.com" className="uppercase text-footer" scroll={false}>info@lifeclicks.com</Link></span>
                            <span className="underline-effect"><Link href="/privacy" className="text-xs" scroll={false}>Privacy Policy</Link></span>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 sm:flex sm:flex-col items-center justify-center col-span-2 md:col-span-1 pt-[40px] md:p-10">
                        <p className="pb-4" >
                            {
                                socialMenuItems.edges.map((edge, i) => (
                                    <React.Fragment key={"social_footer"+i}>
                                        <span className="underline-effect">
                                            <Link href={ edge.node.uri } target={ edge.node.target } className="uppercase text-xs" scroll={false}>{ edge.node.label }</Link> 
                                        </span>
                                        {i < socialMenuItems.edges.length - 1 && <span> | </span>}
                                    </React.Fragment>
                                ))
                            }
                        </p>
                    </div>

                    <div className="order-3 md:order-3 flex justify-center sm:flex-col pt-5 pr-4 md:p-10 items-end">
                        <div className="w-[180px] flex flex-col">
                            <span className="uppercase text-footer" >Lifeclicks © {new Date().getFullYear() }</span>
                            <span className="uppercase text-footer sm:pb-[17px]" >All rights reserved</span>
                            <span className="underline-effect"><Link href="#" className="text-xs" scroll={false}>Created by hpot.digital</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
    
};

export default Footer;

