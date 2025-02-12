import type { Metadata } from "next";
import "./globals.css";

// Context Providers
import PageAnimatePresence from "@/context/PageAnimatePresence";
// import { SiteDataProvider } from "@/context/SiteDataContext";

// Components
import Header from "@/components/Header";
import MainMenu from "@/components/MainMenu";

// Utilities
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";

import { isMobileDevice } from "@/utils/detectDevice"; // import the function



// Metadata for the application
export const metadata: Metadata = {
  title: "Lifeclicks Studio",
  description: "Crafting Cinematic Love Stories",
};


// RootLayout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  logDev('fetchData - layout.tsx 1');
  const { mainMenuItems, socialMenuItems, projectsMap, pagesMap, postsMap, videosMap } = await fetchData();
  logDev('fetchData - layout.tsx 2');

  const isMobile = await isMobileDevice();
  logDev('isMobile', isMobile);

  return (
    <html lang="en">
      <head>
        {/* Favicon links */}
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />

        {/* Load Cookie Script Only in Production */}
        {process.env.NEXT_PUBLIC_ENV_NAME === 'live' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var script = document.createElement('script');
                  script.type = 'text/javascript';
                  script.charset = 'UTF-8';
                  script.src = '//cdn.cookie-script.com/s/635bcf9b4f92cd98f60f2286c1371185.js';
                  document.head.appendChild(script);
                })();
              `,
            }}
          />
        )}

      </head>
      <body className="antialiased custom-padding-top bg-black">
        {/* Header and Main Menu */}
        <Header />
        <MainMenu mainMenuData={ mainMenuItems } socialMenuData={ socialMenuItems } />

        {/* Context Providers */}
        {/* <SiteDataProvider data={{ projectsMap, pagesMap }} > */}
          <PageAnimatePresence isMobile={isMobile} socialMenuData={ socialMenuItems } projectsMap={projectsMap} pagesMap={pagesMap} postsMap={postsMap} videosMap={videosMap}>
            {children}
          </PageAnimatePresence>
        {/* </SiteDataProvider> */}
      </body>
    </html>
  );
}