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

    const user = await db.collection('users').findOne({ email: email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const recipes = await db.collection('recipes').find().toArray();

    // Filter recipes based on likedFoods array
    // const filteredRecipesList = recipes.filter((recipe) => user.likedFoods.includes(recipe._id));

    client.close();

    res.status(200).json({ recipes, user });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
