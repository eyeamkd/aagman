const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Revenue", { 
 
    totalIncome: Float, 
    orders: [{type:mongoose.Schema.Types.ObjectId,
            ref:"Order"}],   //Object Array
    store: {type:mongoose.Schema.Types.ObjectId,
            ref:"Store"} 
})

