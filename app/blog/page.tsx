import BlogPageClient from "./BlogPageClient";
import type { Metadata } from "next";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";
import { buildHeadTitle } from "@/utils/buildHeadTitle";

logDev('fetchData - About 1');
const { pagesMap, postsMap } = await fetchData();
logDev('fetchData - About 2');

// Metadata for the application
export const metadata: Metadata = {
    title: ('blog' in pagesMap) ? buildHeadTitle('other', pagesMap['blog'].title) : "404"
};

export default function Blog() {
    return (
        <BlogPageClient pagesMap = { pagesMap } postsMap = { postsMap } />
    );
}