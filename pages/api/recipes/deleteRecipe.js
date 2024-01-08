// api/signup.js

import { connectToDatabase } from "@/lib/db";

const handler = async (req, res) => {

    if (req.method !== "POST") {
        res.status(405).end();
        return;
    }

    const data = req.body;

    const { id, name, email } = data;

    try {
        const client = await connectToDatabase();
        const db = client.db();

        const isExist = await db.collection("deleteRequest").findOne({ id });

        if (isExist) {
            res.status(409).json({ message: "This recipe is already requested for deletion!" });
            client.close();
            return;
        }

        const result = await db.collection("deleteRequest").insertOne({
            id,
            name,
            email
        });

        res.status(201).json({ message: "Succesfully sended for delete request! As soon as we approve we will notify you in email!" });
        client.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error || "Something went wrong!" });
    }
};

export default handler;
