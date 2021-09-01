const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Order", { 
    id: String, 
    orderCode : Number, 
    orderStatus : {type:String,
                   enum:["OrderReceived", "Preparing" , "Completed"],
                   default:"OrderReceived"},   //enum          
    itemsList : [{name:String,quantity:Number,price:Float}],     //Object Array
    store: {type:mongoose.Schema.Types.ObjectId,
            ref:"Store"},               //Object 
    bill : {type:mongoose.Schema.Types.ObjectId,
            ref:"Bill"}
})

