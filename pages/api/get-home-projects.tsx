import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


// Set up the Apollo Client instance
const client = new ApolloClient({
    uri: process.env.WORDPRESS_GRAPHQL_API_URL, // Replace with your GraphQL API endpoint
    cache: new InMemoryCache(),
});


// Define your GraphQL query
const GET_PROJECTS = gql`
    query HOME_PROJECTS  {
        projects (
            where: {
                orderby: { field: MENU_ORDER, order: ASC }
            }
        ) {
            edges {
                node {
                    id
                    title
                    uri
                    projectExtras{
                        eventType
                        eventPlace
                        homepageMedia {
                            id
                            fullFileUrl
                            postMimeType
                            postExcerpt
                        }
                    }
                }
            }
        }
    }
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Fetch data from the GraphQL API
            const { data } = await client.query({
                query: GET_PROJECTS,
            });
            // Return the data as JSON
            return res.status(200).json(data);
        } catch {
            return res.status(500).json({ message: 'Server error' });
        }
    } else {
        return res.status(405).json({ message: 'Only GET requests are allowed' });
    }
}