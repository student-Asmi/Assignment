import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    Gender: {
      type: String,
      enum: ["Male", "Female", "Other"], // Optional: enforce values
    },
    dob: {
      type: Date,
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;
