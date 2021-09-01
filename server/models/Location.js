const mongoose =require("mongoose");

module.exports = mongoose.model("Location", { 
    id : String, 
    country : String, 
    state: String, 
    city : String, 
    area: String, 
    landMark: String 
})

