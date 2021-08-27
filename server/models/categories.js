const mongoose =require("mongoose");


module.exports= mongoose.model("Categories", { 

        categoryName:String,
        items:[{type:mongoose.Schema.Types.ObjectId,
              ref:"ItemsList"}]
})
