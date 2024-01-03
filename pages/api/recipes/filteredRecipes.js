import { connectToDatabase } from '@/lib/db';

export const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const { nationality, time, type, difficulty } = req.query; // Use req.query to get query parameters
    const client = await connectToDatabase();
    const db = client.db();

    try {
        const recipes = await db.collection('recipes').find({
            time: "1h-2h",
        }).toArray(); // Convert cursor to array

        if (recipes.length === 0) { // Check if the array is empty
            res.status(404).json({ message: 'Recipes not found' });
            return;
        }

        client.close();
        res.status(200).json({ recipes });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
