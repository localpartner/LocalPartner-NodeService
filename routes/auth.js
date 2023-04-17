const express = require("express");
const joi = require("joi")
const router = express.Router();
const validateRequest = require("../helpers/validate")
const {
    signup,
    signin,
    signout,
    otpVerification,
    resendOtp
} = require("../controllers/auth");

router.post("/signup", authSignupValidation, signup);
router.post("/signin", authSigninValidation, signin);
router.post("/getResendOTP", resendOtp)
router.get("/signout", signout);
router.post("/otpVerification",otpVerification);
module.exports = router;

// signUp validation
function authSignupValidation(req, res, next) {
    const signupSchema = {
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        mobile: joi.string().length(10).pattern(/^[0-9]+$/).required(),
    };
    const signup = joi.object(signupSchema);
    validateRequest(req, res, next, signup);
}

// signIn validation
function authSigninValidation(req, res, next){
    const signinSchema = {
        mobile: joi.string().length(10).pattern(/^[0-9]+$/).required(),
    };
    const signin = joi.object(signinSchema);
    validateRequest(req, res, next, signin);
}