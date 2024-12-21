import AboutPageClient from "./AboutPageClient";
import type { Metadata } from "next";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";

logDev('fetchData - About 1');
const { pagesMap } = await fetchData();
logDev('fetchData - About 2');

// Metadata for the application
export const metadata: Metadata = {
    title: ('about' in pagesMap) ? pagesMap['about'].title : "404",
};

export default function About() {
    return (
        <AboutPageClient pagesMap = { pagesMap } />
    );
}