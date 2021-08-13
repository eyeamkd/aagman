import mongoose from "mongoose";

export const Item = mongoose.model("Item", { 
    itemCode:Number,
    itemSubTopicList:[{
        itemList:[{
            itemName:String,
            itemDescription:String,
            itemQuantity:Number,
            Status:String,
            Cost:Number
        }]
    }],

})
