import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function ensureMongo() {
    const uri = process.env.MONGO_URL || "mongodb://localhost:27017/todosdb";
    await mongoose.connect(uri);
    console.log("Connecté à MongoDB avec Mongoose");
}
