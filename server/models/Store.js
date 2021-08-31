const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Store", { 
    
    Id: String ,
    Name : String ,
    Rating:Float,
    Address : {type:mongoose.Schema.Types.ObjectId,
               ref:"Location"} , //Object
    Orders : [{type:mongoose.Schema.Types.ObjectId,
               ref:"Order"}],    //Object Array
    Owner : {type:mongoose.Schema.Types.ObjectId,
             ref:"User"} ,       //Object
    Timings: {type:mongoose.Schema.Types.ObjectId,
              ref:"Timing"} ,    //Object
    Menu : {type:mongoose.Schema.Types.ObjectId,
            ref:"Menu"}  ,       //Object
    Revenue: {type:mongoose.Schema.Types.ObjectId,
              ref:"Revenue"}

})

