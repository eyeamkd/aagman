const mongoose =require("mongoose");

module.exports = mongoose.model("User", { 
    Id: String,
    Email : String,
    FullName : String,
    GSTNumber : String ,
    PhoneNumber: String ,
    Stores: [{type:mongoose.Schema.Types.ObjectId,
              ref:"Store"}],
    otp: String,
})

