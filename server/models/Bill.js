const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Bill", { 
    id: String, 
    totalCost: Float,
    paymentMode: {type:String,
                  enum:["Cash", "CreditCard", "UPI", "DebitCard", "Check", "NetBanking"],
                  default:"NotPaid"} ,      
    paymentStatus: {type:String,
                    enum:["Paid" , "NotPaid"],
                     default:"Cash"} , 
    order : {type:mongoose.Schema.Types.ObjectId,
            ref:"Order"} 
})

