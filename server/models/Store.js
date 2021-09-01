const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Store", { 
    
    id: String ,
    name : String ,
    rating:Float,
    address : {type:mongoose.Schema.Types.ObjectId,
               ref:"Location"} , //Object
    orders : [{type:mongoose.Schema.Types.ObjectId,
               ref:"Order"}],    //Object Array
    owner : {type:mongoose.Schema.Types.ObjectId,
             ref:"User"} ,       //Object
    timings: {type:mongoose.Schema.Types.ObjectId,
              ref:"Timing"} ,    //Object
    menu : {type:mongoose.Schema.Types.ObjectId,
            ref:"Menu"}  ,       //Object
    revenue: {type:mongoose.Schema.Types.ObjectId,
              ref:"Revenue"}

})

