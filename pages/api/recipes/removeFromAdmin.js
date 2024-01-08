import { connectToDatabase } from '@/lib/db';

export default async function handler(req, res) {
    try {
        const client = await connectToDatabase();

        if (req.method !== 'DELETE') {
            res.status(405).json({ message: 'Method not allowed' });
            return;
        }

        const db = client.db();

        const { id } = req.body;

        const recipes = await db.collection('recipes').find().toArray();

        const recipe = recipes.find((recipe) => recipe._id.toString() === id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const deleteItem = await db.collection('recipes').deleteOne({ _id: recipe._id });

        client.close();

        res.status(200).json({ recipes });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}