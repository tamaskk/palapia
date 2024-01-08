import { connectToDatabase } from '@/lib/db';

const handler = async (req, res) => {
    
    const client = await connectToDatabase();

    if (req.method === 'POST') {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(422).json({ message: 'Invalid input' });
        return;
    }


    if (!client) {
        res.status(500).json({ message: 'Could not connect to database' });
        return;
    }

    const db = client.db();

    if (!db) {
        res.status(500).json({ message: 'Could not connect to database' });
        return;
    }

    const newMessage = {
        name,
        email,
        message,
        date: new Date(),
        answered: false
    }

    try {
        const result = await db.collection('messages').insertOne(newMessage);
        res.status(201).json({ message: 'Successfully stored message', result });
    } catch (error) {
        client.close();
        res.status(500).json({ message: 'Storing message failed' });
        return;
    }
} else if (req.method === 'GET') {

    if (!client) {
        res.status(500).json({ message: 'Could not connect to database' });
        return;
    }

    const db = client.db();

    if (!db) {
        res.status(500).json({ message: 'Could not connect to database' });
        return;
    }

    try {
        const result = await db.collection('messages').find().toArray();
        res.status(200).json({ message: 'Successfully fetched messages', result });
    } catch (error) {
        client.close();
        res.status(500).json({ message: 'Fetching messages failed' });
        return;
    }
} else {
    res.status(405).json({ message: 'Method not allowed' });
}

}

export default handler;