const mongoose =require("mongoose");

module.exports = mongoose.model("Timing", { 
  
    openTime: String ,
    closeTime: String ,
    status:  {type:String,
                    enum:["Open","Close"],
                    default:"Open"}, //enum
    store: {type:mongoose.Schema.Types.ObjectId,
            ref:"Store"}  //Object

  
})

