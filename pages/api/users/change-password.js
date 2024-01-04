import { MongoClient } from 'mongodb';
import { verifyPassword, hashPassword } from '@/lib/auth';

export default async function handler(req, res) {
    const { method, body } = req;

    try {
        const client = await MongoClient.connect('mongodb+srv://kalmantamaskrisztian:usPOHbel3rtVRvwS@cluster0.bftsemb.mongodb.net/datas?retryWrites=true&w=majority');
        const db = client.db();

        if (method === 'PATCH') {
            // Process PATCH request (update password)
            const { email, oldPassword, newPassword } = body;

            if (!email || !oldPassword || !newPassword) {
                return res.status(400).json({ error: 'Bad Request', message: 'Email, oldPassword, and newPassword are required in the request body' });
            }

            const usersCollection = db.collection('users');
            const user = await usersCollection.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: 'Not Found', message: 'User not found' });
            }

            const currentPassword = user.password;
            const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

            if (!passwordAreEqual) {
                return res.status(403).json({ error: 'Forbidden', message: 'Incorrect old password' });
            }

            const hashedPassword = await hashPassword(newPassword);

            const result = await usersCollection.updateOne(
                { email },
                { $set: { password: hashedPassword } }
            );

            client.close();
            return res.status(200).json({ success: true, message: 'Successfully changed the password', result });
        } else {
            return res.status(405).json({ error: 'Method Not Allowed', message: 'Only PATCH method is allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
}
