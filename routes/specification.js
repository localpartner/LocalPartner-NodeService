const express = require("express");
const router = express.Router();
const SpecificationAPI = require('../controllers/specification');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const {specificationValidator,specificationUpdateValidator}  = require("../validator");
const AuthUtils =  require("../utils/authUtils");

// console.log("router------>",router);
// router.post('/man/create1/:userId', requireSignin, isAuth, isAdmin, create1);
router.get('/specification/list', SpecificationAPI.getAllSpecifications);
router.get('/specification/group/list', SpecificationAPI.getAllSpecificationGroups);
router.post("/specification",specificationValidator,requireSignin, isAuth,AuthUtils.checkPermission('product'),SpecificationAPI.createSpecification);
router.get("/specification/:code",SpecificationAPI.getSpecification);
router.delete("/specification/:code",requireSignin, isAuth,AuthUtils.checkPermission('product'),SpecificationAPI.deleteSpecification);
router.put("/specification/:code",specificationUpdateValidator,requireSignin, isAuth,AuthUtils.checkPermission('product'),SpecificationAPI.updateSpecification);
router.put("/specification/:code/status",requireSignin, isAuth,AuthUtils.checkPermission('product'),SpecificationAPI.updateSpecification);

module.exports = router;
