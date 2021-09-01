const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Item", { 

    id: String, 
    name : String, 
    description : String, 
    availability : {type:String,
                    enum:["InStock","OutOfStock"],
                    default:"InStock"},  //enum                
    type: {type:String,
                  enum:["Veg","NonVeg","Egg","NonEdible"],
                  default:"Veg"},   //enum                       
    price : Float, 
    rating : Float, 
    bestSeller : {type:String,
                  enum:["Yes","No"],
                  default:"No"},    //enum         
    photo: String
})
