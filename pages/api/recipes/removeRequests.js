import { connectToDatabase } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const client = await connectToDatabase();

    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }

    const db = client.db();
    
    const recipes = await db.collection('deleteRequest').find().toArray();

    client.close();

    res.status(200).json({ recipes });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}