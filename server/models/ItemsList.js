const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("ItemsList", { 
  
    name: String , 
    quantity: Number ,
    price: Float , 
    order: {type:mongoose.Schema.Types.ObjectId,
            ref:"Order"}
})

