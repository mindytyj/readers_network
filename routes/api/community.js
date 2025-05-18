const express = require("express");
const router = express.Router();
const communityCtrl = require("../../controllers/api/community");

// Community Reviews
router.get("/reads", communityCtrl.getCommunityReads);
router.get("/:bookId", communityCtrl.getCommunityReviews);
router.get("/:userId/likes/:reviewId", communityCtrl.getReviewLikes);
router.post("/:userId/likes/add/:reviewId", communityCtrl.addReviewLike);
router.delete(
  "/:userId/likes/remove/:reviewId",
  communityCtrl.removeReviewLike
);
router.get("/review/:reviewId", communityCtrl.getReview);
router.get("/comments/:reviewId", communityCtrl.getReviewComments);
router.post("/:userId/comments/add/:reviewId", communityCtrl.addReviewComment);

module.exports = router;
