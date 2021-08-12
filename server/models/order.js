import mongoose from "mongoose";

export const Order = mongoose.model("Order", { 
    orderCode:Number,
    itemList:[{
        itemName:String,
        itemCost:Number,
        itemQuantity:Number,
    }],
    cost:Number,
    itemStatus:String,
    paymentMode:String,
    paymentStatus:String
})
