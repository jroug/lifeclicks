import BlogPageClient from "./BlogPageClient";
import type { Metadata } from "next";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";
import { buildHeadTitle } from "@/utils/buildHeadTitle";

logDev('fetchData - About 1');
const { pagesMap } = await fetchData();
logDev('fetchData - About 2');

// Metadata for the application
export const metadata: Metadata = {
    title: ('blog' in pagesMap) ? buildHeadTitle(pagesMap['blog'].title) : "404"
};

export default function Blog() {
    return (
        <BlogPageClient pagesMap = { pagesMap } />
    );
}