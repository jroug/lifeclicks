import VideosPageClient from "./VideosPageClient";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";
import type { Metadata } from "next";
import { buildHeadTitle } from "@/utils/buildHeadTitle";
 
logDev('fetchData - Home 1');
const { videosMap, pagesMap } = await fetchData();
logDev('fetchData - Home 2');

// Metadata for the application
export const metadata: Metadata = {
  title: ('videos' in pagesMap) ? buildHeadTitle('other', pagesMap['videos'].title) : "404"
};



export default function Videos() {

    return (
      <VideosPageClient videosData={ videosMap } />
    );
}