const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("ItemsList", { 
    Id: String ,
    Name: String , 
    Quantity: Number ,
    Price: Float , 
    Order: {type:mongoose.Schema.Types.ObjectId,
            ref:"Order"}
})

