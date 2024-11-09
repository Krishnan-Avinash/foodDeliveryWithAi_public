import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    landmark: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: false,
    },
    pincode: {
      type: Number,
      required: false,
    },
    cart: {
      type: Array,
      required: false,
    },
    orders: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
