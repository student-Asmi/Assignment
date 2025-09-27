import mongoose, { Schema } from "mongoose";


const userScheme = new Schema(
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
   otp: { type: String },
    otpExpiry: { type: Date },
        
    Gender: { type: String},
    dob: { type: Date }},{ timestamps: true });
    

    const User = mongoose.model("User", userScheme);

    export default User;