const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { create, listWishlists, removeFromWishlist } = require("../controllers/wishlist");

router.post("/wishlist/create/:userId", create);
router.get('/wishlist/by/user/:userId', listWishlists);

// router.get("/wishlist/list/", listOrders);
// router.param("wishlistId", orderById);
// router.get('/wishlist/:orderId', read);
// router.put("/wishlist/update/:orderId", updateOrder);
router.delete("/wishlist/delete/:wishlistId", removeFromWishlist);

module.exports = router;
