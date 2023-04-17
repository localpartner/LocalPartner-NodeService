
var path = require("path");
const fs = require("fs");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");


const firebase = require("./dbFirebase");
const firestore = firebase.firestore();
const storage = firebase.storage().ref();
global.XMLHttpRequest = require("xhr2");


const advertisSchema = require("../models/setting/advertisModule");

exports.saveAdvertise = async (req, res, next) => {
    try {
      if (req.file) {
        const file = req.file;
        const timestamp = Date.now();
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}_${timestamp}.${type}`;
        const imageRef = storage.child(`/advertise/${fileName}`);
        const snapshot = await imageRef.put(file.buffer);
        const downloadURL = await snapshot.ref.getDownloadURL();

        var imageData = new advertisSchema({
          title: req.body.title,
          image: downloadURL,
          link: req.body.link,
          sequence: req.body.sequence,
          description: req.body.description,
        });
        const result = await imageData.save();
        return res.json({
          status: true,
          message: "Advertise image save successfully",
        });
      } else {
        return res.json({
          status: false,
          message: "Something went wrong for update",
          errors: { error : "Please select image." },
        });
      }
    } catch (err_){
      console.log('error',err_);
      return res.status(400).json({
        status: false,
        message: "Something went wrong for update",
        error: errorHandler(err_),
      });
    }
  };



exports.listAdvertise = async (req, res) => {
    try {
      const result = await advertisSchema.find({ isDelete: false });
      return res.json({
        res_ :result
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "Something went wrong for update",
      });
    }
  };
  
  exports.removeAdvertise = async (req, res) => {
    try {
      var advertiseImage = {
        isDelete: true,
      };
      const filter = { _id: req.params.id };
      const result_ = await advertisSchema.findOneAndUpdate(filter, advertiseImage);
      return res.json({
        status: true,
        message: "Advertise image is deleted successfully",
      });
    } catch (e) {
      return res.status(400).json({
        error: "Store not found" + e,
      });
    }
  };