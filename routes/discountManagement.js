const express = require("express");
const router = express.Router();
const {userById, read, list, remove, update, create ,updateStatus, changeStatus} = require('../controllers/discountManagement');
const { userUpdateValidator } = require("../validator");


router.get('/discountManagement/:userId', read);
router.get('/discountManagement', list);
router.delete("/discountManagement/:userId", remove);
router.put("/discountManagement/:userId",userUpdateValidator, update);
router.post('/discountManagement/create', create);
router.post("/discountManagement/status/:userId", updateStatus);
router.post("/discountManagement/statusChange/:userId", changeStatus);
router.param('userId', userById);

module.exports = router;
