const express = require("express");
const router = express.Router();
const communityCtrl = require("../../controllers/api/community");

// router.get("/community/:bookId/:userId", communityCtrl.getCommunityReviews);
// router.get(":userId/like/:reviewId", communityCtrl.getReviewLike);
// router.post("/:userId/like/add/:reviewId", communityCtrl.addReviewLike);
// router.delete("/:userId/like/remove/:reviewId", communityCtrl.removeReviewLike);
router.get("/review/:reviewId", communityCtrl.getReview);
router.get("/community/comments/:reviewId", communityCtrl.getReviewComments);
// router.post("/:userId/comments/add/:reviewId", communityCtrl.addComment);

module.exports = router;
