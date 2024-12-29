const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../../controllers/api/reviews");

router.get("/:bookId/:userId", reviewsCtrl.getUserReview);
router.post("/add/:bookId/:userId", reviewsCtrl.addUserReview);
router.put("/edit/:bookId/:userId", reviewsCtrl.editUserReview);

module.exports = router;
