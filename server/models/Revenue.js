const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Revenue", { 
    id: String, 
    totalIncome: Float, 
    bill: [{type:mongoose.Schema.Types.ObjectId,
            ref:"Bill"}],   //Object Array
    store: {type:mongoose.Schema.Types.ObjectId,
            ref:"Store"} 
})

