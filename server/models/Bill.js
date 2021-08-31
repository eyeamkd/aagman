const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Bill", { 
    Id: String, 
    TotalCost: Float,
    PaymentMode: {type:String,
                  enum:["Cash", "CreditCard", "UPI", "DebitCard", "Check", "NetBanking"],
                  default:"NotPaid"} ,      
    PaymentStatus: {type:String,
                    enum:["Paid" , "NotPaid"],
                     default:"Cash"} , 
    Order : {type:mongoose.Schema.Types.ObjectId,
            ref:"Order"} 
})

