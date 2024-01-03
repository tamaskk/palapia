import { connectToDatabase } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const client = await connectToDatabase();

    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }

    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required in the request body' });
      return;
    }

    const db = client.db();

    const recipes = await db.collection('recipes').find().toArray();

    if (!recipes) {
      res.status(404).json({ message: 'Recipes not found' });
      return;
    }

    // Update filtering logic based on the correct field (name or email)
    const filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().split(' ').join('-') === name);

    client.close();

    res.status(200).json({ filteredRecipes });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
