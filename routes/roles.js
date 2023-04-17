const express = require("express");
const router = express.Router();
const {createRole,updateRole,deleteRole,getRoleList,getRole} = require("../controllers/roles");
const AuthUtils = require("../utils/authUtils");
const auth = require("../controllers/auth");




router.post("/usermgmt/store/:storeId/role",auth.requireSignin,auth.isAuth,AuthUtils.checkPermission('users'), AuthUtils.isValidStore,createRole);
router.put("/usermgmt/store/:storeId/role/:roleId", auth.requireSignin,auth.isAuth,AuthUtils.checkPermission('users'),AuthUtils.isValidStore,updateRole);
router.delete("/usermgmt/store/:storeId/role/:roleId", auth.requireSignin,auth.isAuth,AuthUtils.checkPermission('users'),AuthUtils.isValidStore,deleteRole);
router.get("/usermgmt/store/:storeId/role/list",auth.requireSignin,auth.isAuth, AuthUtils.isValidStore,getRoleList);
router.get("/usermgmt/store/:storeId/role/:roleId",auth.requireSignin,auth.isAuth, AuthUtils.isValidStore,getRole);


module.exports = router;