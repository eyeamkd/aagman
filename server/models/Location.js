const mongoose =require("mongoose");

module.exports = mongoose.model("Location", { 
   
    country : String, 
    state: String, 
    city : String, 
    area: String, 
    landMark: String 
})

