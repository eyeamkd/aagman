const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Revenue", { 
    Id: String, 
    TotalIncome: Float, 
    Bill: [{type:mongoose.Schema.Types.ObjectId,
            ref:"Bill"}],   //Object Array
    Store: {type:mongoose.Schema.Types.ObjectId,
            ref:"Store"} 
})

