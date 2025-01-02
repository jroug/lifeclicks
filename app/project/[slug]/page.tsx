import ProjectPageClient from "./ProjectPageClient";
import type { Metadata } from "next";
import { fetchData } from "@/utils/dataFetcher";
import { logDev } from "@/utils/logDev";

type Props = {
  params: Promise<{ slug: string }>
}
 
// Metadata function to dynamically set metadata based on params
export async function generateMetadata( { params }: Props ): Promise<Metadata> {

  const slug = (await params).slug;
  
  logDev("fetchData - Generating Metadata 1 : " + slug);
  const { projectsMap } = await fetchData();
  logDev("fetchData - Generating Metadata 2 : " + slug);


  return {
    title: ( 'nayara-joshua' in projectsMap || 'new-project' in projectsMap ) && slug ? projectsMap[slug].title : '404' ,
  };

}


 

export default async function Project({ params }: Props) {
  const slug = (await params).slug;

  logDev("project data 1  " + slug);
  const { projectsMap } = await fetchData();
  logDev("project data 2 " + slug);

  return <ProjectPageClient slug={slug} projectPageData={ projectsMap } />;
  
}