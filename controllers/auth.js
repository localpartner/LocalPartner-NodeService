const User = require("../models/customer/customer");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const OtpVerify = require("../models/customer/otpVerification");
const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const oAuhServer = new OAuth2Server({
    model: require('./../models/oauth2/oauthModel.js'),
    accessTokenLifetime: 60 * 60,
    allowBearerTokensInQueryString: false
});

exports.requireSignin = (req, res, next) =>{

  var request = new Request(req);
  var response = new Response(res);

  return oAuhServer.authenticate(request, response)
      .then(function(token) {        
          response.locals.auth = {_id: token._id, user: token.user}          
          next();
      }).catch(function(err) {

          res.status(err.code || 500).json(err);
      });

      
}    

// using promise
exports.signup = async (req, res) => {
  try {
    const { firstName, mobile, lastName, otp } = req.body;
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
    });
    const result = await user.save();
    var otpSave = "";
    if (result) {
      const otpAdd = new OtpVerify({
        mobileNo: mobile,
        otp: otp,
      });
      otpSave = await otpAdd.save();
    }
    res.json({
      status: true,
      result: result,
      otpData: otpSave,
    });
  } catch (errors) {
    console.log("errors",errors);
  }
};

exports.otpVerification = async (req, res) => {
  try {
    const { mobileNo, otp } = req.body;
    const genratedOtp = await OtpVerify.findOne({ mobileNo: mobileNo });
    const user = await User.findOne({ mobile: mobileNo });
    if (genratedOtp.otp == otp) {
      if (req.body.formName === 'registrion') {
        const userOtpVerified = await User.findOneAndUpdate(
          { mobile: mobileNo },
          { isOtpVerified: true },
          { new: true }
        );
        
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.cookie("t", token, { expire: new Date() + 9999 });
      const _id = user._id;
      const firstName = user.firstName;
      const lastName = user.lastName;
      const mobileNo_ = user.mobile;
      const role = "4";
      return res.json({
        token,
        status: true,
        message: "You are successfully loged",
        user: {
          _id,
          firstName,
          lastName,
          mobileNo_,
          role,
        },
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "Please enter valid OTP.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: false,
      errors: "Something is wrong",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const existUser = await User.findOne({
      mobile: mobile,
      isOtpVerified: true,
    });
    const NotVerifiedUser = await User.findOne({
      mobile: mobile,
      isOtpVerified: false,
    });
    if (NotVerifiedUser) {
      await User.deleteOne({ _id: NotVerifiedUser });
      const deleteOtpVerifiedEtry = await OtpVerify.findOne(
        { mobile: mobile}
      )
      await OtpVerify.deleteMany({ mobileNo : mobile });
    }
    if (existUser) {
      const otpData = await OtpVerify.findOneAndUpdate(
        { mobileNo: mobile },
        { otp: otp },
        { new: true }
      );
      return res.json({
        status: true,
        otpData: otpData,
      });
    } else {
      return res.status(400).json({
        status: false,
        errors: "Mobile No. is not exist. Please register and login.",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

exports.resendOtp = async (req, res) =>{
  try{
    const { mobile, otp } = req.body;
    const existUser = await User.findOne({
      mobile: mobile,
    });
    if (existUser) {
      const otpData = await OtpVerify.findOneAndUpdate(
        { mobileNo: mobile },
        { otp: otp },
        { new: true }
      );
      return res.json({
        status: true,
        otpData: otpData,
      });
    } else {
      return res.json({
        status: false,
        errors: "Somthing is wrong.",
      });
    }
  }catch (error) {
    console.log("Error: ", error);
  }
}

exports.signinOld = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user with that email does not exist.",
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!User.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match",
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

/*exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});*/



exports.isAuth = (req, res, next) => {

  let user = res.locals.auth && res.locals.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }

  // check out Authorization
  next();
};

/**
 * google login full
 * https://www.udemy.com/instructor/communication/qa/7520556/detail/
 */
