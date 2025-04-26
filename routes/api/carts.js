const express = require("express");
const router = express.Router();
const cartsCtrl = require("../../controllers/api/carts");

router.get("/:userId", cartsCtrl.getCart);
router.get("/:bookId/:userId", cartsCtrl.getCartStatus);
router.post("/:userId/add/:bookId", cartsCtrl.addToCart);
router.delete("/:userId/remove/:bookId", cartsCtrl.removeCartItem);

module.exports = router;
