import { connectToDatabase } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const client = await connectToDatabase();

    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }

    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: 'Email is required in the request body' });
      return;
    }

    const db = client.db();

    // Use findOne with projection to retrieve only necessary fields
    const user = await db.collection('users').findOne({ email }, { projection: { ownFoods: 1 } });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const ownRecipesId = user.ownFoods || [];

    const recipes = await db.collection('recipes').find().toArray();

    // Check if recipes array is empty
    if (recipes.length === 0) {
      res.status(404).json({ message: 'Recipes not found' });
      return;
    }

    const ownRecipes = recipes.filter((recipe) => ownRecipesId.includes(recipe._id.toString()));

    client.close();

    res.status(200).json({ ownRecipes });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
