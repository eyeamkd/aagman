const mongoose =require("mongoose");


module.exports= mongoose.model("Category", { 
 
      name : String ,
      items : [{type:mongoose.Schema.Types.ObjectId,
                ref:"Item"}]
})
