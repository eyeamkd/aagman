const mongoose =require("mongoose");


module.exports = mongoose.model("Item", { 
    itemCode:String,
    ownerUser:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    categories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories"
    }],

})
