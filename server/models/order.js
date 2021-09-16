const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);
const GraphQLDateTime=require('graphql-iso-date');

module.exports = mongoose.model("Order", { 
 
    orderCode : Number, 
    orderStatus : {type:String,
                   enum:["OrderReceived", "Preparing" , "Completed"],
                   default:"OrderReceived"},   //enum          
    itemsList : [{name:String,quantity:Number,price:Float,itemId:String}],     //Object Array
    store: {type:mongoose.Schema.Types.ObjectId,
            ref:"Store"},               //Object 
    bill : {type:mongoose.Schema.Types.ObjectId,
            ref:"Bill"},
     dateAndTime:{type:GraphQLDateTime,timestamp:true},
     customerDevices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerDevice"
    }]
})

