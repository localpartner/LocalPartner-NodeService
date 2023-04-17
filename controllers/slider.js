const { uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { ref } = require("@firebase/storage");

const firebase = require("./dbFirebase");
const firestore = firebase.firestore();
const storage = firebase.storage().ref();
global.XMLHttpRequest = require("xhr2");

var path = require("path");
const fs = require("fs");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");
const sliderSchema = require("../models/setting/sliderModule");
const firebaseImgUpload = require("./firebaseImgUpload");

exports.uploadImg = async (req, res) => {
  console.log("testing", req.file);
  const file = req.file;
  const timestamp = Date.now();
  const name = file.orignalName.split(".")[0];
  const type = file.orignalName.split(".")[1];
  const fileName = `${name}_${timestamp}.${type}`;
  console.log("fileName : ", fileName);
  // Step 1. Create reference for file name in cloud storage
  const imageRef = storage.child(`/slider/${fileName}`);
  // Step 2. Upload the file in the bucket storage
  const snapshot = await imageRef.put(file.buffer);
  // Step 3. Grab the public url
  const downloadURL = await snapshot.ref.getDownloadURL();
};

exports.save = async (req, res, next) => {
  try {
    if (req.file) {
      const file = req.file;
      const timestamp = Date.now();
      const name = file.originalname.split(".")[0];
      const type = file.originalname.split(".")[1];
      const fileName = `${name}_${timestamp}.${type}`;
      const imageRef = storage.child(`/slider/${fileName}`);
      const snapshot = await imageRef.put(file.buffer);
      const downloadURL = await snapshot.ref.getDownloadURL();

      var imageData = new sliderSchema({
        title: req.body.title,
        image: downloadURL,
        link: req.body.link,
        sequence: req.body.sequence,
        description: req.body.description,
      });
      const result = await imageData.save();
      return res.json({
        status: true,
        message: "Slider save successfully",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Something went wrong for update",
        errors: { sliderError: "Please select image." },
      });
    }
  } catch (err_) {
    console.log("error", err_);
    return res.status(400).json({
      status: false,
      message: "Something went wrong for update",
      error: errorHandler(err_),
    });
  }
};

exports.list = async (req, res) => {
  try {
    const result = await sliderSchema.find({ isDelete: false });
    return res.json({
      result,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong for update",
    });
  }
};

exports.remove = async (req, res) => {
  try {
    var sliderDetails = {
      isDelete: true,
    };
    const filter = { _id: req.params.id };
    const result_ = await sliderSchema.findOneAndUpdate(filter, sliderDetails);
    console.log(result_, "result_");
    return res.json({
      status: true,
      message: "Slider image is deleted successfully",
      result: result_,
    });
  } catch (e) {
    return res.status(400).json({
      error: "Store not found" + e,
    });
  }
};

exports.getSliderDataById = async (req, res) => {
  try {
    const result = await sliderSchema.findById(req.params.id);
    return res.json(result);
  } catch (e) {
    return res.status(400).json({
      status: false,
      errors: "Not found record" + e,
    });
  }
};

exports.updateSliderData = async (req, res) => {
  try {
    const result = await sliderSchema.findById(req.params.id);
    return res.json(result);
  } catch (e) {
    return res.status(400).json({
      status: false,
      errors: "Error :" + e,
    });
  }
};
