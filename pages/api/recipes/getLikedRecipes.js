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

    // Fetch the user based on the provided email
    const user = await db.collection('users').findOne({ email });
    const recipes = await db.collection('recipes').find().toArray();

    if (!recipes) {
      res.status(404).json({ message: 'Recipes not found' });
      return;
    }

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const likedRecipes = user.likedFoods;

    // Filter the recipes based on the liked recipes
    const filteredRecipes = recipes.filter((recipe) => likedRecipes.includes(recipe._id.toString()));


    client.close();

    res.status(200).json({ filteredRecipes });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
