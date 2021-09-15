const mongoose =require("mongoose");

module.exports = mongoose.model("Device", { 
   
    user : {type:mongoose.Schema.Types.ObjectId,
        ref:"User"},
    fcmToken : String ,
    active : Boolean ,
    createdAt : String
})

