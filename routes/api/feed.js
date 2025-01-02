const express = require("express");
const router = express.Router();
const feedCtrl = require("../../controllers/api/feed");

router.get("/:userId", feedCtrl.getFeedPosts);
router.post("/add/:userId", feedCtrl.addPost);
router.get("/:userId/like/:postId", feedCtrl.getLike);
router.post("/:userId/like/add/:postId", feedCtrl.addLike);
router.delete("/:userId/like/remove/:postId", feedCtrl.removeLike);
router.get("/comments/:postId", feedCtrl.getFeedComments);
router.get("/post/:postId", feedCtrl.getPost);
router.post("/:userId/comments/add/:postId", feedCtrl.addComment);
router.get("/:userId/comments/like/:commentId", feedCtrl.getCommentLike);
router.post("/:userId/comments/add/like/:commentId", feedCtrl.addCommentLike);
router.delete(
  "/:userId/comments/remove/like/:commentId",
  feedCtrl.removeCommentLike
);

module.exports = router;
