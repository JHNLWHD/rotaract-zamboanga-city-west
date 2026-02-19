import { createClient } from 'contentful';

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'
  }); 

export const fetchEntries = async () => {
    try {
        const entries = await client.getEntries(); 
        return entries.items; 
    } catch (error) {
        console.error('Error fetching entries:', error);
        return [];
    }
}; 


export default {
    client 
}; 