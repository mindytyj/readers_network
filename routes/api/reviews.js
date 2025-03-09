const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../../controllers/api/reviews");

// User Review
router.get("/:bookId/:userId", reviewsCtrl.getUserReview);
router.post("/add/:bookId/:userId", reviewsCtrl.addUserReview);
router.put("/edit/:bookId/:userId", reviewsCtrl.editUserReview);
router.delete("/remove/:bookId/:userId", reviewsCtrl.removeUserReview);

module.exports = router;
