const mongoose =require("mongoose");

module.exports = mongoose.model("Notification", { 
   
    user : {type:mongoose.Schema.Types.ObjectId,
        ref:"User"},
    title : String ,
    message : String ,
    readAt : String,
    sentAt : String,
    createdAt : String
})

