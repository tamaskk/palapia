// api/signup.js

import { connectToDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { useMainContext } from "@/lib/maincontext";

const handler = async (req, res) => {
  // const { setRequestError, setRequestStatus, requestError, requestStatus } = useMainContext();

  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const data = req.body;

  const { firstName, lastName, email, password, nationality, isAdmin, likedFoods, ownFoods, dateOfRegister } = data;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid input - password should be at least 7 characters long" });
    return;
  }

  try {
    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User already exist. Try to LogIn!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      nationality, 
      isAdmin, 
      likedFoods, 
      ownFoods, 
      dateOfRegister
    });

    res.status(201).json({ message: "Succesfully registered!" });
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error || "Something went wrong!" });
  }
};

export default handler;
