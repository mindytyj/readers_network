const express = require("express");
const router = express.Router();
const wishlistsCtrl = require("../../controllers/api/wishlists");

router.get("/:userId", wishlistsCtrl.getWishlist);
router.get("/:bookId/:userId", wishlistsCtrl.getWishlistStatus);
router.post("/:userId/add/:bookId", wishlistsCtrl.addToWishlist);
router.delete("/:userId/remove/:bookId", wishlistsCtrl.removeWishlistItem);

module.exports = router;
