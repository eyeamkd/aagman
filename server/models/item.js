import mongoose from "mongoose";

export const Item = mongoose.model("Item", { 
    itemCode:String,
    categories:[{
        categoryName:String,
        items:[{
            name:String,
            description:String,
            status:String,
            cost:Number
        }]
    }],

})
