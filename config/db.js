import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/store";
    await mongoose.connect(uri);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};
