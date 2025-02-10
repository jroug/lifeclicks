import PostPageClient from "./PostPageClient";
import type { Metadata } from "next";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";
import { buildHeadTitle } from "@/utils/buildHeadTitle";

type Props = {
  params: Promise<{ slug: string }>
}
 
// Metadata function to dynamically set metadata based on params
// export async function generateMetadata( { params }: Props ): Promise<Metadata> {

//   const slug = (await params).slug;
  
//   logDev("fetchData - Generating Metadata 1 : " + slug);
//   const { postsMap } = await fetchData();
//   logDev("fetchData - Generating Metadata 2 : " + slug);


//   return {
//     title: ( slug in postsMap ) && slug ? buildHeadTitle(postsMap[slug].title) : '404'
//   };

// }


 

export default async function Post({ params }: Props) {
  const slug = (await params).slug;

  // logDev("project data 1  " + slug);
  // const { postsMap } = await fetchData();
  // logDev("project data 2 " + slug);

  return <PostPageClient slug={slug} />;
}