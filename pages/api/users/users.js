import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method, body } = req;

  try {
    const client = await MongoClient.connect('mongodb+srv://kalmantamaskrisztian:usPOHbel3rtVRvwS@cluster0.bftsemb.mongodb.net/datas?retryWrites=true&w=majority');
    const db = client.db();

    if (method === 'GET') {
      // Process GET request (retrieve user data)
      const users = await db.collection('users').find().toArray();
      client.close();
      return res.status(200).json({ users });
    } else if (method === 'POST') {
      // Process POST request (update liked foods)
      const { email, likedFoods } = body;

      if (!email || !likedFoods) {
        return res.status(400).json({ error: 'Bad Request', message: 'Email and likedFoods are required in the request body' });
      }

      await db.collection('users').updateMany({ email }, { $set: { likedFoods: likedFoods } });
      client.close();
      return res.status(200).json({ success: true, message: 'Liked foods updated successfully' });
    } else {
      return res.status(405).json({ error: 'Method Not Allowed', message: 'Only GET and POST methods are allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
