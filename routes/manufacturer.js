const express = require("express");
//const multer = require("multer");

const router = express.Router();

const { createManufacturer, 
        getManufacturer, 
        getAllManufacturers,
        updateManufacturer,
//        setManufacturerImage,
        deleteManufacturer,
//        manufacturerById, 
//        read, 
//        update, 
//        remove, 
//        list, 
//        updateDelete, 
//        updateStatus, 
//        changeStatus
        } = require('../controllers/manufacturer');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
//const { userById } = require('../controllers/user');
const { manuValidator } = require("../validator");
const AuthUtils =  require("../utils/authUtils");

/*
TODO: dead code to be removed in future update
// Set Storage
//const storage = multer.memoryStorage();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //console.log ('destination');
    //console.log (file);
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
    //console.log ('filename');
    //console.log (file);
    //console.log (file.originalname + '-' + Date.now());
      cb(null, file.originalname + '-' + Date.now())
    },
});

const  uploadFilter = function (req, file, cb) {
    //console.log (req);
    console.log ('uploadFilter');
    console.log (file);
    const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        return cb(null, true);
    } else {
        return cb(null, false);
    }
};

var upload = multer({ storage: storage, fileFilter: uploadFilter }).any();
*/

router.post('/manufacturer', manuValidator, requireSignin, isAuth, createManufacturer);
//router.post('/manufacturer/:manufacturername/image', requireSignin, isAuth, upload, setManufacturerImage);
router.get('/manufacturer/list', requireSignin, isAuth, getAllManufacturers);
router.get('/manufacturer/:manufacturerName', requireSignin, isAuth, getManufacturer);
router.put("/manufacturer/:manufacturerName", requireSignin, isAuth, updateManufacturer);
router.delete("/manufacturer/:manufacturerName", requireSignin, isAuth, deleteManufacturer);
router.put("/manufacturer/:manufacturerName/status", requireSignin, isAuth, updateManufacturer);

//router.get('/manufacturer/:manufacturerId', read);
//router.post("/manufacturer/delete/:manufacturerId", updateDelete);
//router.post("/manufacturer/status/:manufacturerId", updateStatus);
//router.post("/manufacturer/statusChange/:manufacturerId", changeStatus);


//router.param('manufacturerId', manufacturerById);
//router.param('userId', userById);

module.exports = router;
