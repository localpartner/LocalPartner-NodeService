const express = require("express");
const router = express.Router();

const { createAttribute,updateAttribute,deleteAttribute,getAllAttributes,getAttribute} = require('../controllers/attribute');
const { attributeValidator,attributeUpdateValidator } = require("../validator");
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const AuthUtils =  require("../utils/authUtils");

router.get('/attribute/list', getAllAttributes);
router.get('/attribute/:attributeName', getAttribute);
router.post('/attribute',attributeValidator,requireSignin, isAuth,AuthUtils.checkPermission('product'), createAttribute);
router.put("/attribute/:attributeName/status", requireSignin, isAuth,AuthUtils.checkPermission('product'),updateAttribute);
router.put("/attribute/:attributeName", attributeUpdateValidator,requireSignin, isAuth,AuthUtils.checkPermission('product'),updateAttribute );
router.delete("/attribute/:attributeName", deleteAttribute);

module.exports = router;
