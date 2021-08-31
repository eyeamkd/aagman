const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Item", { 

    Id: String, 
    Name : String, 
    Description : String, 
    Availability : {type:String,
                    enum:["InStock","OutOfStock"],
                    default:"InStock"},  //enum                
    Type: {type:String,
                  enum:["Veg","NonVeg","Egg","NonEdible"],
                  default:"Veg"},   //enum                       
    Price : Float, 
    Rating : Float, 
    BestSeller : {type:String,
                  enum:["Yes","No"],
                  default:"No"},    //enum         
    Photo: String
})
