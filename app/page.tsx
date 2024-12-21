import HomePageClient from "./HomePageClient";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";
// import type { Metadata } from "next";

 
logDev('fetchData - Home 1');
const { projectsMap } = await fetchData();
logDev('fetchData - Home 2');

// Metadata for the application
// export const metadata: Metadata = {
//   title: 'Homepage',
// };


export default function Home() {

    return (
      <HomePageClient homePageProjectData={ projectsMap } />
    );
}