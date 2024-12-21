import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloClient, InMemoryCache } from '@apollo/client'; // Ensure gql is imported for GraphQL queries
import { SEND_EMAIL } from "@/graphql/queries"; // Import the query

// Set up the Apollo Client instance
const client = new ApolloClient({
    uri: process.env.WORDPRESS_GRAPHQL_API_URL || '', // Ensure the endpoint is defined
    cache: new InMemoryCache(),
});

// Define an interface for the form variables
interface FormVars {
    form_name: string;
    form_email: string;
    form_location: string;
    form_eventType: string;
    form_role: string;
    form_hear: string;
    form_date: string;
    form_eventLocation: string;
    form_budget: string;
    form_message: string;
}

// Type guard to validate the form variables
const isFormVarsValid = (formVars: Partial<FormVars>): formVars is FormVars => {
    return Object.values(formVars).every(value => !!value);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // Collect form variables from the request body
            const formVars: Partial<FormVars> = {
                form_name: req.body.form_name,
                form_email: req.body.form_email,
                form_location: req.body.form_location,
                form_eventType: req.body.form_eventType,
                form_role: req.body.form_role,
                form_hear: req.body.form_hear,
                form_date: req.body.form_date,
                form_eventLocation: req.body.form_eventLocation,
                form_budget: req.body.form_budget,
                form_message: req.body.form_message,
            };

            // Validate form fields
            if (!isFormVarsValid(formVars)) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Send GraphQL query with validated form variables
            const { data } = await client.query({
                fetchPolicy: 'network-only',
                query: SEND_EMAIL,
                variables: formVars,
            });

            // Return the response
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    } else {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }
}