const mongoose = require("mongoose");

module.exports = mongoose.model("User", {

    email: String,
    fullName: String,
    gstNumber: String,
    phoneNumber: String,
    stores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    }],
    otp: String,
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification"
    }],
    devices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device"
    }]
})

