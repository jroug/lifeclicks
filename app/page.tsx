import HomePageClient from "./HomePageClient";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";
import type { Metadata } from "next";
import { buildHeadTitle } from "@/utils/buildHeadTitle";
 
logDev('fetchData - Home 1');
const { projectsMap, pagesMap } = await fetchData();
logDev('fetchData - Home 2');

// Metadata for the application
export const metadata: Metadata = {
  title: ('portfolio' in pagesMap) ? buildHeadTitle('other', pagesMap['portfolio'].title) : "404"
};



export default function Home() {

    return (
      <HomePageClient homePageProjectData={ projectsMap } />
    );
}