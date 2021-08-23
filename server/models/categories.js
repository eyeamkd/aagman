import mongoose from "mongoose";
import {Items} from './items';

export const Categories = mongoose.model("Categories", { 

        categoryName:String,
        items:[{name:String,
            description:String,
            status:String,
            cost:Number}]

})
