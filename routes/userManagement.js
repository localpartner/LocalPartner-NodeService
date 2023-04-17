const express = require("express");
const router = express.Router();
const {userById, read, list, remove, update, create ,updateStatus, changeStatus} = require('../controllers/user');
const { userValidator,updateUserValidator } = require("../validator");

const AuthUtils = require("../utils/authUtils");
const auth = require("../controllers/auth");

router.post('/usermgmt/store/:storeId/user', userValidator,auth.requireSignin,auth.isAuth,AuthUtils.checkPermission('users'), AuthUtils.isValidStore, create);
router.put('/usermgmt/store/:storeId/user/:userId', updateUserValidator,auth.requireSignin,auth.isAuth,AuthUtils.checkPermission('users'), AuthUtils.isValidStore, update);
router.delete('/usermgmt/store/:storeId/user/:userId',auth.requireSignin,auth.isAuth,AuthUtils.checkPermission('users'), AuthUtils.isValidStore, remove);
router.get('/usermgmt/store/:storeId/user/list',auth.requireSignin,auth.isAuth, AuthUtils.isValidStore, list);
router.get('/usermgmt/store/:storeId/user/:userId',auth.requireSignin,auth.isAuth, AuthUtils.isValidStore, read);
router.post('/usermgmt/store/:storeId/user/:userId/status',auth.requireSignin,auth.isAuth, AuthUtils.isValidStore, updateStatus);

// router.get('/userManagement/:userId', read);
// router.get('/userManagement', list);
// router.delete("/userManagement/:userId", remove);
// router.put("/userManagement/:userId",userUpdateValidator, update);


// router.post("/userManagement/status/:userId", updateStatus);

// router.post("/userManagement/statusChange/:userId", changeStatus);

// router.param('userId', userById);

module.exports = router;
