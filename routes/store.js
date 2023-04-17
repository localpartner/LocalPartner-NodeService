const express = require("express");
const router = express.Router();
const {requireSignin,isAuth} = require("../controllers/auth")
const AuthUtils =  require("../utils/authUtils");


const { storeValidator,userRoleValidator,updateStoreValidator } = require('../validator');


const { addStoreData,updateStoreData, storeList,getStoreDataById,deleteStoreData, updateStatus } = require('../controllers/store');
 

// const { storeSignin } = require("../controllers/store");
// router.post("/storesignin",storeSignin); 

router.post("/store",storeValidator,requireSignin, isAuth,AuthUtils.checkPermission('store'), addStoreData);
router.put("/store/:storeId",updateStoreValidator,requireSignin, isAuth,AuthUtils.checkPermission('store'),AuthUtils.isValidStore, updateStoreData);
router.delete("/store/:storeId",requireSignin, isAuth,AuthUtils.checkPermission('store'),AuthUtils.isValidStore,deleteStoreData); 
router.get("/store/list", requireSignin, isAuth,AuthUtils.checkPermission('store'),storeList);
router.get("/store/:storeId",requireSignin, isAuth,AuthUtils.checkPermission('store'),AuthUtils.isValidStore,getStoreDataById); 
router.post("/store/:storeId/status" ,requireSignin, isAuth,AuthUtils.checkPermission('store'),AuthUtils.isValidStore, updateStatus);
//router.get("/deleteStoreData/:storeId",deleteStoreData); 
//router.post("/addUserRoleData",userRoleValidator, addUserRole);
//router.get("/getUserRoleListData/:storeId" , getUserRoleListData);
//router.get("/getUserRoleByIdData/:roleId" ,getUserRoleByIdData);
//router.get("/deleteUserRoleData/:userRoleId" ,deleteUserRole);
//router.get("/storeUserList/:storeId" , storeUserList);

//router.get("/store/statusChange/:storeId" , changeStatus);



module.exports = router;
