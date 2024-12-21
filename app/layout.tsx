import type { Metadata } from "next";
import "./globals.css";

// Context Providers
import PageAnimatePresence from "@/context/PageAnimatePresence";
// import { SiteDataProvider } from "@/context/SiteDataContext";

// Components
import Header from "@/components/Header";
import MainMenu from "@/components/MainMenu";

import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";



// Utilities
// import { logDev } from "@/utils/logDev";

// Metadata for the application
export const metadata: Metadata = {
  title: "Crafting Cinematic Love Stories",
  description: "Crafting Cinematic Love Stories",
};


// RootLayout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  logDev('fetchData - layout.tsx 1');
  const { mainMenuItems, socialMenuItems } = await fetchData();
  logDev('fetchData - layout.tsx 2');


  return (
    <html lang="en">
      <head>
        {/* Favicon links */}
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
      </head>
      <body className="antialiased custom-padding-top bg-black">
        {/* Header and Main Menu */}
        <Header />
        <MainMenu mainMenuData={ mainMenuItems } socialMenuData={ socialMenuItems } />

        {/* Context Providers */}
        {/* <SiteDataProvider data={{ projectsMap, pagesMap }} > */}
          <PageAnimatePresence>
            {children}
          </PageAnimatePresence>
        {/* </SiteDataProvider> */}
      </body>
    </html>
  );
}