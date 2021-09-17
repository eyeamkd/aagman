const mongoose =require("mongoose");

module.exports = mongoose.model("CustomerDevice", { 
    order : {type:mongoose.Schema.Types.ObjectId,
        ref:"Order"},
    fcmToken : String ,
    active : Boolean ,
    createdAt : String
})

