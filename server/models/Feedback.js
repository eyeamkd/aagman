const mongoose =require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

module.exports = mongoose.model("Feedback", { 
    orderServiceRating:Float,
    deliveryServiceRating:Float,
    comments:[String],

})

