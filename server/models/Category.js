const mongoose =require("mongoose");


module.exports= mongoose.model("Category", { 
      Id: String ,
      Name : String ,
      Items : [{type:mongoose.Schema.Types.ObjectId,
                ref:"Item"}]
})
