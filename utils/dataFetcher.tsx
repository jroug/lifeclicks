// Apollo Client
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// GraphQL Query
import { ALL_DATA } from "@/graphql/queries"; // Import the query
 
import { logDev } from "@/utils/logDev";


// Define interfaces for the data


let projectsMap: ProjectsMap;
let pagesMap: PagesMap;
let postsMap: PostsMap;
let videosMap: VideosMap;
let mainMenuItems: MenuItems | {};
let socialMenuItems: MenuItems | {};
 

// Function to fetch data from the GraphQL API
export async function fetchData() {

    try {
    

        // const cacheKey = 'site-data';

        // if (cache.has(cacheKey)) {
        //     logDev('---------------------------------------- cached-data');
        //     return cache.get(cacheKey); // Return cached data
        // }

        // logDev('----------------------------------------******* fresh-data');

        // Apollo Client setup
        const cache = new InMemoryCache();

        const errorLink = onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            // console.error("GraphQL Errors:", graphQLErrors);
          }
          if (networkError) {
            // console.error("Network Error:", networkError);
          }
        });
        
        const logLink = new ApolloLink((operation, forward) => {
          // console.log(`[Apollo] Fetching query: ${operation.operationName}`);
          return forward(operation).map((response) => {
            // console.log(`[Apollo] Response for query: ${operation.operationName}`, response);
            return response;
          });
        });
        
        const client = new ApolloClient({
          link: ApolloLink.from([
            errorLink,
            logLink,
            new HttpLink({ uri: process.env.WORDPRESS_GRAPHQL_API_URL }),
          ]),
          cache,
          ssrMode: true, // Enable SSR mode
        });

        const { data } = await client.query({ 
            fetchPolicy: 'cache-first',
            query: ALL_DATA,
            context: {
                fetchOptions: {
                  next: { revalidate: 3600 * 24 }, // one day
                },
            },
        });


        // logDev("----------------------------------------- currentDateTime ap: ", data.currentDateTime);

        // Transform pagesMap
        pagesMap = data.pages.nodes.reduce((acc: Record<string, Page>, node: Page) => {
            acc[node.slug] = node;
            return acc;
        }, {});


        // Transform posts into a map with `nextPostSlug`
        postsMap = data.posts.nodes.reduce((acc: Record<string, Post>, node: Post, index: number, nodes: Post[]) => {
            const slug = node.slug;
            const nextSlug = nodes[(index + 1) % nodes.length].slug;
            acc[slug] = {
              ...node,
              nextPostSlug: nextSlug,
          };
            return acc;
        }, {});
       
        // Transform projects into a map with `nextProjectSlug`
        projectsMap = data.projects.edges.reduce(
          (acc: Record<string, Project>, edge: ProjectWithNode, index: number, edges: ProjectWithNode[]) => {
          const slug = edge.node.slug;
          const nextSlug = edges[(index + 1) % edges.length].node.slug;
          acc[slug] = {
              ...edge.node,
              nextProjectSlug: nextSlug,
          };
          return acc;
        }, {});
          
        // Transform projects into a map with `nextProjectSlug`
        videosMap = data.videos.edges.reduce(
          (acc: Record<string, Video>, edge: VideoWithNode, index: number, edges: VideoWithNode[]) => {
          const slug = edge.node.slug;
          const nextSlug = edges[(index + 1) % edges.length].node.slug;
          acc[slug] = {
              ...edge.node,
              nextVideoSlug: nextSlug,
          };
          return acc;
        }, {});

        mainMenuItems = data.mainMenuItems;

        socialMenuItems = data.socialMenuItems;
 
        const finalData = { mainMenuItems, socialMenuItems, projectsMap, pagesMap, postsMap, videosMap }
        // logDev('---> videosMap ---> ', videosMap);
        // logDev('---> finalData ---> ', finalData);
        return finalData;

    } catch (error) {

        console.error("Error fetching data:", error);
        return { mainMenuItems: {}, socialMenuItems: {}, projectsMap: {}, pagesMap: {}, postsMap: {}, videosMap: {} };

    }
  }