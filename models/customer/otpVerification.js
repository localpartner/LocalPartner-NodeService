const mongoose = require("mongoose");

const otpVerificationSchema = new mongoose.Schema({
  mobileNo: Number,
  otp: Number,
  genretedOtpAt: {
    type: Date,
    default: Date.now,
  },
},
{timestamps : true},
{collection : 'otpVerification'}
);

module.exports = mongoose.model("otpVerification",otpVerificationSchema);