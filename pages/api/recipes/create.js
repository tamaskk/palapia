// api/signup.js

import { connectToDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

const handler = async (req, res) => {

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const data = req.body;

  const { name, description, peoples, time, ingredients, image, nationality, difficulity, type, steps, userEmail, flag, isApproved } = data;

  try {
    const client = await connectToDatabase();
    const db = client.db();

    const result = await db.collection("recipes").insertOne({
      name, 
      description, 
      peoples, 
      time, 
      ingredients, 
      image, 
      nationality, 
      difficulity, 
      type, 
      steps, 
      userEmail, 
      flag,
      isApproved
    });

    res.status(201).json({ message: "Succesfully sended for approval! As soon as we approve we will notify you in email!" });
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error || "Something went wrong!" });
  }
};

export default handler;
