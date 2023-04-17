const express = require('express');
const router = express.Router();

const { getFECartDetails,createFECart, updateFECart, deleteFECart,getCartDetails,createUpdateCart,addItemToCart } = require('../controllers/cart');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/customer');
const { categoryValidator,categoryUpdateValidator } = require("../validator");
const AuthUtils =  require("../utils/authUtils");

//router.get('/category/:categoryId', read);

// router.post('/cart', requireSignin, isAuth, /*,AuthUtils.isCustomer*/ createFECart);
router.get('/cart/:cartid', requireSignin, isAuth, /*,AuthUtils.isCustomer*/ getFECartDetails);
// router.put('/cart/:cartid/', requireSignin, isAuth, /*AuthUtils.isCustomer, */ updateFECart);
// router.put('/cart/:cartid/status', requireSignin, isAuth, /*AuthUtils.isCustomer, */ updateFECart);
router.delete('/cart/:cartid', requireSignin, isAuth, /*AuthUtils.isCustomer, */ deleteFECart);

router.get('/customer/:mobile/cart', requireSignin, isAuth, /*AuthUtils.isCustomer,*/ getCartDetails);
router.post('/customer/:mobile/cart', requireSignin, isAuth, /*AuthUtils.isCustomer,*/createUpdateCart);
router.put('/customer/:mobile/cart', requireSignin, isAuth, /*AuthUtils.isCustomer,*/ createUpdateCart);

router.post('/customer/:mobile/cart/item', requireSignin, isAuth, /*AuthUtils.isCustomer,*/addItemToCart);



module.exports = router;
