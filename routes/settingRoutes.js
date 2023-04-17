const express = require("express");
const router = express.Router();
const fs = require("fs");
const { sliderValidition } = require("../validator/settingValidator");
const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");
//upload image on firebase
const { uploadImgConfig } = require("../controllers/firebaseImgUpload");

const { save, list, remove ,getSliderDataById, uploadImg} = require("../controllers/slider");
const {
  saveAdvertise,
  listAdvertise,
  removeAdvertise,
} = require("../controllers/advertis");
const {
  savePartnerImg,
  listPartnerImg,
  removePartnerImg,
} = require("../controllers/partnerImages");


const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
};

let upload = multer({ storage: storage}).single(
  "sliderImg"
);
let uploadAdvertise = multer({
  storage: storage
}).single("advertiseImg");
let uploadPartnerImg = multer({
  storage: storage
}).single("partnerImg");

//Slider Routes

router.post("/saveSlider", upload, save);
router.get("/sliderList", list);
router.get("/deleteSlider/:id", remove);
router.get("/getSliderDataById/:id" , getSliderDataById);

// Advertising Routes
router.post("/saveAdvertise", uploadAdvertise, saveAdvertise);
router.get("/advertiseList", listAdvertise);
router.get("/deleteAdvertise/:id", removeAdvertise);

// Partner images Routes

router.post("/savePartnerImg", uploadPartnerImg, savePartnerImg);
router.get("/partnerImgList", listPartnerImg);
router.get("/deletePartnerImg/:id", removePartnerImg);

module.exports = router;
