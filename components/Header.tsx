"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const handleHomeClick = (): void => {
    const menu = document.getElementById("main-menu") as HTMLElement | null;
    const menuText = document.getElementById("menu-text") as HTMLElement | null;

    // Toggle the 'open' class on the menu
    menu?.classList.remove("open");
    setTimeout(() => {
      menu?.classList.remove("z-index-9");
    }, 200);

    if (menuText?.innerHTML === "CLOSE") {
      menuText.innerHTML = "MENU";
    }
  };

  const handleMenuButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const menuButton = e.currentTarget as HTMLElement;
    const menu = document.getElementById("main-menu") as HTMLElement | null;
    const menuText = document.getElementById("menu-text") as HTMLElement | null;

    if (menuButton?.classList.contains("disabled")) {
      return;
    } else {
      if (!menu?.classList.contains("open")) {
        menuButton.classList.add("disabled");
        // Temporarily lock the button for 1.4 seconds
        setTimeout(() => {
          menuButton.classList.remove("disabled");
        }, 1400); // delay as counted from the CSS
      }
    }

    // Toggle the 'open' class on the menu
    if (menu?.classList.contains("open")) {
      menu?.classList.remove("open");
      setTimeout(() => {
        menu?.classList.remove("z-index-9");
      }, 500);
    } else {
      menu?.classList.add("z-index-9");
      menu?.classList.add("open");
    }

    // Toggle the text between 'MENU' and 'CLOSE'
    if (menuText?.innerHTML === "MENU") {
      menuText.innerHTML = "CLOSE";
    } else if (menuText?.innerHTML === "CLOSE") {
      menuText.innerHTML = "MENU";
      menuText.style.color = "";
    }
  };

  const handleMenuButtonHover = (
    event: React.MouseEvent<HTMLButtonElement>,
    hover: boolean
  ): void => {
    const menuText = document.getElementById("menu-text") as HTMLElement | null;
    if (menuText?.innerHTML === "CLOSE") {
      (event.target as HTMLElement).style.color = hover ? "#ffffff29" : "";
    } else {
      (event.target as HTMLElement).style.color = "";
    }
  };

  useEffect(() => {
    document.getElementById("main-header")?.classList.add("show-items");
    localStorage.setItem("FIRST", "true");
  }, []);

  return (
    <header id="main-header" className="fixed z-10 w-full top-0">
      <div className="w-full">
        <div className="grid grid-cols-2">
          <div className="flex flex-col items-start justify-center pl-10">
            <span className="hidden-reveal-item-wrapper">
              <Link
                className="hidden-reveal-item"
                href="/"
                onClick={handleHomeClick}
                scroll={false}
              >
                <Image
                  src="/images/logo/logo.svg"
                  alt="Logo"
                  width={120}
                  height={30}
                  className="main-logo"
                />
              </Link>
            </span>
          </div>
          <div className="flex flex-col items-end justify-center pr-10">
            <span className="hidden-reveal-item-wrapper">
              <button
                type="button"
                className="hidden-reveal-item text-white font-cormorant_garamond"
                onClick={handleMenuButtonClick}
                onMouseOver={(e) => handleMenuButtonHover(e, true)}
                onMouseOut={(e) => handleMenuButtonHover(e, false)}
                id="menu-text"
              >
                MENU
              </button>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;