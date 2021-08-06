const mongoose =require("mongoose");

const User = mongoose.model("User", { 
    email: String,
    fullName: String,
    phoneNumber: String
})

module.exports = {User}