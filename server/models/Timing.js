const mongoose =require("mongoose");

module.exports = mongoose.model("Timing", { 
    id : String ,
    openTime: String ,
    closeTime: String ,
    availability:  {type:String,
                    enum:["Open","Closed"],
                    default:"Open"}, //enum
    store: {type:mongoose.Schema.Types.ObjectId,
            ref:"Store"}  //Object

  
})

