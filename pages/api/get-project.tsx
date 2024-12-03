import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Set up the Apollo Client instance
const client = new ApolloClient({
    uri: process.env.WORDPRESS_GRAPHQL_API_URL, // Replace with your GraphQL API endpoint
    cache: new InMemoryCache(),
});

// Define your GraphQL query with a variable for the slug
const GET_PROJECT = gql`
query PROJECT($id: ID!, $idType: ProjectIdType) {
    project(id: $id, idType: $idType) {
        id
        title
        projectExtras {
            eventType
            eventPlace
            portfolioPageMedia {
                id
                fullFileUrl
                postMimeType
                postExcerpt
                postTitle
                fullWidth
                fullHeight
            }
        }
    }
}
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const slug = req.query.slug as string;

            if (!slug) {
                return res.status(400).json({ message: 'Slug is required' });
            }

            // Fetch data from the GraphQL API
            const { data } = await client.query({
                query: GET_PROJECT,
                variables: {
                    id: slug,
                    idType: 'SLUG', // Specify the ID type as SLUG
                },
            });

            // Return the data as JSON
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching project:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    } else {
        return res.status(405).json({ message: 'Only GET requests are allowed' });
    }
}
