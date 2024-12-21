import PrivacyPageClient from "./PrivacyPageClient";
import type { Metadata } from "next";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";

// // console.log('About - fetchData');
// // const { pagesMap } = await fetchData();
 
logDev('fetchData - Privacy 1');
const { pagesMap } = await fetchData();
logDev('fetchData - Privacy 2');

// Metadata for the application
export const metadata: Metadata = {
     title: ('privacy' in pagesMap) ? pagesMap['privacy'].title : "404"
};


const Privacy = () => {
    return (
      <PrivacyPageClient pagesMap={pagesMap}  />
    );
};

export default Privacy;