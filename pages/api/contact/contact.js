import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
  let client;

  try {
    client = await connectToDatabase();
    const { name, email, message, date } = req.body;

    if (req.method === 'POST') {
      if (!name || !email || !message) {
        return res.status(422).json({ error: 'Invalid input' });
      }

      const db = client.db();

      const newMessage = {
        name,
        email,
        message,
        date: new Date(),
        answered: false,
      };

      try {
        const result = await db.collection('messages').insertOne(newMessage);
        return res.status(201).json({ success: true, message: 'Successfully stored message', result });
      } catch (error) {
        console.error('Error storing message:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: 'Storing message failed' });
      }

    } else if (req.method === 'GET') {
      const db = client.db();

      try {
        const result = await db.collection('messages').find().toArray();
        return res.status(200).json({ success: true, message: 'Successfully fetched messages', result });
      } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: 'Fetching messages failed' });
      }

    } else if (req.method === 'PATCH') {
      try {
        const { id, answer } = req.body;

        if (!id || !answer) {
          return res.status(422).json({ error: 'Invalid input' });
        }

        const db = client.db();

        // Assuming 'id' is a string representing the _id of the message
        const message = await db.collection('messages').findOne({ _id: new ObjectId(id) });

        if (message) {
          const approving = await db.collection('messages').updateOne(
            { _id: new ObjectId(id) },
            { $set: { answered: true, answer: answer}}
          );

          return res.status(200).json({ success: true, message: 'Successfully updated message', approving });
        } else {
          return res.status(404).json({ error: 'Message not found' });
        }
      } catch (error) {
        console.error('Error updating message:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
      }

    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export default handler;
