import type { Metadata } from "next";
import "./globals.css";

// Context Providers
import PageAnimatePresence from "@/context/PageAnimatePresence";
import { SiteDataProvider } from "@/context/SiteDataContext";

// Components
import Header from "@/components/Header";
import MainMenu from "@/components/MainMenu";

// Apollo Client
import { ApolloClient, InMemoryCache } from "@apollo/client";

// GraphQL Query
import { ALL_DATA } from "@/graphql/queries"; // Import the query

// Utilities
// import { logDev } from "@/utils/logDev";

// Metadata for the application
export const metadata: Metadata = {
  title: "Crafting Cinematic Love Stories",
  description: "Crafting Cinematic Love Stories",
};




// Define interfaces for the data
interface ProjectMedia {
  id: string;
  fullFileUrl: string | null;
  postMimeType: string;
  postExcerpt: string | null;
  postTitle?: string | null;
  fullWidth?: number | null;
  fullHeight?: number | null;
}

interface ProjectExtras {
  eventType: string;
  eventPlace: string;
  homepageMedia: ProjectMedia[];
  portfolioPageMedia: ProjectMedia[];
}

interface Project {
  id: string;
  title: string;
  slug: string;
  uri: string;
  projectExtras: ProjectExtras;
  nextProjectSlug: string;
}

interface PageExtras {
  secondaryText: string | null;
}

interface FeaturedImage {
  sourceUrl: string;
  altText: string;
  mediaDetails: {
    width: number;
    height: number;
  };
}

interface Page {
  id: string;
  title: string;
  slug: string;
  uri: string;
  content: string | null;
  date: string;
  pageExtras: PageExtras;
  featuredImage: FeaturedImage | null;
}

interface ProjectWithNode {
  node:{
    id: string;
    title: string;
    slug: string;
    uri: string;
    projectExtras: ProjectExtras;
    nextProjectSlug: string;
  }
}

 
 

// Apollo Client setup
const client = new ApolloClient({
  uri: process.env.WORDPRESS_GRAPHQL_API_URL, // GraphQL API endpoint
  cache: new InMemoryCache(),
});

// Function to fetch data from the GraphQL API
async function fetchData() {
  try {
    const { data } = await client.query({ query: ALL_DATA });

    // Transform projects into a map with `nextProjectSlug`
    const projectsMap: Record<string, Project> = data.projects.edges.reduce(
      (acc: Record<string, Project>, edge: ProjectWithNode, index: number, edges: ProjectWithNode[]) => {
        const slug = edge.node.slug;
        const nextSlug = edges[(index + 1) % edges.length].node.slug;
        acc[slug] = {
          ...edge.node,
          nextProjectSlug: nextSlug,
        };
        return acc;
      },
      {}
    );

    // Transform pagesMap
    const pagesMap: Record<string, Page> = data.pages.nodes.reduce((acc: Record<string, Page>, node: Page) => {
      acc[node.slug] = node;
      return acc;
    }, {});

    return { mainMenuItems: data.mainMenuItems, socialMenuItems: data.socialMenuItems, projectsMap, pagesMap };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { mainMenuItems: [], socialMenuItems: [], projectsMap: {}, pagesMap: {} };
  }
}

// RootLayout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mainMenuItems, socialMenuItems, projectsMap, pagesMap } = await fetchData();

  // console.log('mainMenuItems', mainMenuItems);
  // console.log('socialMenuItems', socialMenuItems);
  // console.log('projectsMap', projectsMap);
  // console.log('pagesMap', pagesMap);
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
        <MainMenu mainMenuItems={mainMenuItems} socialMenuItems={socialMenuItems} />

        {/* Context Providers */}
        <SiteDataProvider data={{ projectsMap, pagesMap }}>
          <PageAnimatePresence>{children}</PageAnimatePresence>
        </SiteDataProvider>
      </body>
    </html>
  );
}