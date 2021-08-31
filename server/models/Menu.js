const mongoose =require("mongoose");


module.exports = mongoose.model("Menu", { 
    Id: String ,
    Store: {type:mongoose.Schema.Types.ObjectId,
            ref:"Store"} ,
    Categories: [{type:mongoose.Schema.Types.ObjectId,
                  ref:"Category"}]

})
