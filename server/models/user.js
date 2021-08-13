import mongoose from "mongoose";

export const User = mongoose.model("User", { 
    email: String,
    fullName: String,
    restaurantName:String,
    GSTNumber:String,
    location:String,
    phoneNumber: String,
    otp: String
})
