import mongoose from "mongoose";

export const Items = mongoose.model("Items", { 

            name:String,
            description:String,
            status:String,
            cost:Number
})
