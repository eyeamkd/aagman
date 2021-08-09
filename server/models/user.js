import mongoose from "mongoose";

export const User = mongoose.model("User", { 
    email: String,
    fullName: String,
    phoneNumber: String
})
