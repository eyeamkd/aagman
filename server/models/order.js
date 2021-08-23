import mongoose from "mongoose";

export const Order = mongoose.model("Order", { 
    orderId:Number,
    itemList:[{
        itemName:String,
        itemCost:Number,
        itemQuantity:Number,
    }],
    totalCost:Number,
    itemStatus:String,
    paymentMode:String,
    paymentStatus:String
})
