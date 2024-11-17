import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
      console.log("Connection established");
    });
  } catch (error) {
    console.log("Could not connect to DB");
    console.log(error);
  }
};
