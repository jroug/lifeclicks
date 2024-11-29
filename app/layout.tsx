import type { Metadata } from "next";
import "./globals.css";
import PageAnimatePresence from '@/context/PageAnimatePresence'
import Header from "@/components/Header";
import MainMenu from "@/components/MainMenu";
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';


export const metadata: Metadata = {
  title: "Crafting Cinematic Love Stories",
  description: "Crafting Cinematic Love Stories",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          {/* Favicon link */}
          <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
          {/* Add other favicon formats if needed */}
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
      </head>
      <body
        className={`antialiased custom-padding-top bg-black`}
      >
        
          <Header />
          <MainMenu />
          <PageAnimatePresence>
             {children} 
          </PageAnimatePresence>
        
      </body>
    </html>
  );
}
