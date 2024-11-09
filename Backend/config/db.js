import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connection established");
  });
};
