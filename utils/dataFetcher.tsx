// Apollo Client
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// GraphQL Query
import { ALL_DATA } from "@/graphql/queries"; // Import the query
 
import { logDev } from "@/utils/logDev";


// Define interfaces for the data
//
 





 
 
let projectsMap: ProjectsMap | {};
let pagesMap: PagesMap | {};
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
                  next: { revalidate: 2 },
                },
            },
        });


        logDev("----------------------------------------- currentDateTime ap: ", data.currentDateTime);

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
        },{});
    
        

        // Transform pagesMap
        pagesMap = data.pages.nodes.reduce((acc: Record<string, Page>, node: Page) => {
            acc[node.slug] = node;
            return acc;
        }, {});

       

        mainMenuItems = data.mainMenuItems;

        socialMenuItems = data.socialMenuItems;
 
        const finalData = { mainMenuItems: mainMenuItems, socialMenuItems: socialMenuItems, projectsMap, pagesMap }

        return finalData;

    } catch (error) {

        console.error("Error fetching data:", error);
        return { mainMenuItems: {}, socialMenuItems: {}, projectsMap: {}, pagesMap: {} };

    }
  }