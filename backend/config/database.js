import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/food_delivery");
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Error");
  }
};
