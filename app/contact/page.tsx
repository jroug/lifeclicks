import ContactPageClient from "./ContactPageClient";
import type { Metadata } from "next";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";
 
logDev('fetchData - Contact 1');
const { pagesMap } = await fetchData();
logDev('fetchData - Contact 2');

// Metadata for the application
export const metadata: Metadata = {
    title: ('contact' in pagesMap) ? pagesMap['contact'].title : "404"
};

export default function Contact() {
    return (
      <ContactPageClient pagesMap = { pagesMap }/>
    );
};