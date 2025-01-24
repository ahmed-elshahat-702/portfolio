import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    throw error;
  }
}

export { connectToDatabase };
