import mongoose from "mongoose";

export const db_connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://arun:arun1nly1@school.b6qkdnb.mongodb.net/hamrobazaar?retryWrites=true&w=majority"
    );

    console.log("DB connection OK");
  } catch (error) {
    console.log("DB connection failed");
    console.log(error.message);
  }
};
