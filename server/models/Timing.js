const mongoose =require("mongoose");

module.exports = mongoose.model("Timing", { 
    Id : String ,
    OpenTime: String ,
    CloseTime: String ,
    Availability:  {type:String,
                    enum:["Open","Closed"],
                    default:"Open"}, //enum
    Store: {type:mongoose.Schema.Types.ObjectId,
            ref:"Store"}  //Object

  
})

