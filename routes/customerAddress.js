const express = require('express');
const router = express.Router();
const { 
    addAddress, 
    fetchAllAddressById, 
    removeFromAddressById, 
    fetchAllAddressData,
    fetchAddressDataById, 
    updateAddress,
    fetchAllAddressByMobile
} = require('../controllers/customerAddress');
const { requireSignin, isAuth } = require('../controllers/auth');

router.post("/customeraddress/add/:mobile", addAddress);
//router.get("/customeraddress/read/:id", fetchAllAddressById);
//router.get("/customeraddress/readdata/:addressId", requireSignin, isAuth, fetchAddressDataById);
router.post("/customeraddress/update/:id", updateAddress);
router.delete("/customeraddress/delete/:addressId", removeFromAddressById);
router.get("/customeraddress/read/mobile/:mobile", fetchAllAddressByMobile);

module.exports = router;