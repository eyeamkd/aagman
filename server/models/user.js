const mongoose =require("mongoose");

module.exports = mongoose.model("User", { 
    email: String,
    fullName: String,
    storeName:String,
    GSTNumber:String,
    location:String,
    phoneNumber: String,
    ownerUser:{type:mongoose.Schema.Types.ObjectId,ref:"Item"},
    orders:[{type:mongoose.Schema.Types.ObjectId,ref:"Order"}],
    otp: String
})

