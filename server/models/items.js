const mongoose =require("mongoose");

module.exports = mongoose.model("ItemsList", { 

            name:String,
            description:String,
            status:String,
            cost:Number
})
