const mongoose =require("mongoose");


module.exports = mongoose.model("Menu", { 
    id: String ,
    store: {type:mongoose.Schema.Types.ObjectId,
            ref:"Store"} ,
    categories: [{type:mongoose.Schema.Types.ObjectId,
                  ref:"Category"}]

})
