import FaqPageClient from "./FaqPageClient";
import type { Metadata } from "next";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";
 
logDev('fetchData - Faq 1');
const { pagesMap } = await fetchData();
logDev('fetchData - Faq 2');

// Metadata for the application
export const metadata: Metadata = {
  title: ('contact' in pagesMap) ? pagesMap['contact'].title : "Contact"
};

export default function Faq() {
  return (
    <FaqPageClient pagesMap = { pagesMap }/>
  );
};