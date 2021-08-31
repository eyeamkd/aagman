const mongoose =require("mongoose");

module.exports = mongoose.model("Location", { 
    Id : String, 
    Country : String, 
    State: String, 
    City : String, 
    Area: String, 
    LandMark: String 
})

