import FilmsPageClient from "./FilmsPageClient";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";
import type { Metadata } from "next";
import { buildHeadTitle } from "@/utils/buildHeadTitle";
 
logDev('fetchData - Home 1');
const { videosMap, pagesMap } = await fetchData();
logDev('fetchData - Home 2');
// console.log('pagesMap', pagesMap);
// Metadata for the application
export const metadata: Metadata = {
  title: ('films' in pagesMap) ? buildHeadTitle('other', pagesMap['films'].title) : "404"
};



export default function Videos() {

    return (
      <FilmsPageClient videosData={ videosMap } />
    );
}