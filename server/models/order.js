const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Order", { 
    Id: String, 
    OrderCode : Number, 
    OrderStatus : {type:String,
                   enum:["OrderReceived", "Preparing" , "Completed"],
                   default:"OrderReceived"},   //enum          
    ItemsList : [{Name:String,Quantity:Number,Price:Float}],     //Object Array
    Store: {type:mongoose.Schema.Types.ObjectId,
            ref:"Store"},               //Object 
    Bill : {type:mongoose.Schema.Types.ObjectId,
            ref:"Bill"}
})

