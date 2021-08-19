import mongoose from "mongoose";

export const Item = mongoose.model("Item", { 
    itemCode:String,
    itemSubTopic:[{
        itemsName:String,
        items:[{
            Name:String,
            Description:String,
            Quantity:Number,
            Status:String,
            Cost:Number
        }]
    }],

})
