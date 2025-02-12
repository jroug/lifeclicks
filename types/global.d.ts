declare global {

    // PagesMap
    type PagesMap = {
        [key: string]: Page
    }
    interface Page {
        id: string;
        title: string;
        slug: string;
        uri: string;
        content: string;
        date: string;
        pageExtras: {
          secondaryText: string | null;
        };
        featuredImage: {
          node:{
              sourceUrl: string;
              altText: string;
              mediaDetails: {
                width: number;
                height: number;
              }
          }
        } | null;
    }

    // PostsMap
    type PostsMap = {
      [key: string]: Post
    }
    interface Post {
      id: string;
      title: string;
      slug: string;
      uri: string;
      content: string;
      date: string;
      featuredImage: {
        node:{
            sourceUrl: string;
            altText: string;
            mediaDetails: {
              width: number;
              height: number;
            }
        }
      } | null,
      nextPostSlug: string;
    }

    // ProjectsMap
    type ProjectsMap = {
        [key: string]:Project;
    }
    interface Project{
        id: string;
        title: string;
        slug: string;
        uri: string;
        projectExtras: ProjectExtras;
        nextProjectSlug: string;
    }
    interface ProjectMedia {
        id: string;
        fullFileUrl: string | undefined;
        postMimeType?: string;
        postExcerpt?: string | undefined;
        postTitle?: string | null;
        fullWidth?: number | null;
        fullHeight?: number | null;
    }
    interface ProjectWithNode {
        node:{
          id: string;
          title: string;
          slug: string;
          uri: string;
          projectExtras: ProjectExtras;
          nextProjectSlug: string;
        }
    }
    interface ProjectExtras {
      eventType: string;
      eventPlace: string;
      homepageMedia: ProjectMedia[];
      portfolioPageMedia: ProjectMedia[];
    }
    
    // VideosMap
    type VideosMap = {
      [key: string]:Video;
    }
    interface Video{
        id: string;
        title: string;
        slug: string;
        uri: string;
        videosExtras: VideosExtras;
        featuredImage: VideoMedia;
        nextVideoSlug: string;
    }
    
    interface VideoMedia {
      node:{
          sourceUrl: string;
          altText: string;
          mediaDetails: {
            width: number;
            height: number;
          }
      }
    }

    interface VideoWithNode {
        node:{
          id: string;
          title: string;
          slug: string;
          uri: string;
          videosExtras: VideosExtras;
          featuredImage: VideoMedia;
          nextVideoSlug: string;
        }
    }
    interface VideosExtras {
      vimeoId: string;
    }


    // MenuItems
    type MenuItems = {
        edges: MenuEdge[]
    };
    type MenuEdge = {
        node: {
          id: string;
          label: string;
          uri: string;
          target: string;
       }
    };

}

// Export as an empty module to allow module resolution.
export {};