const express = require("express");
const router = express.Router();
const discussionsCtrl = require("../../controllers/api/discussions");

router.get("/:groupId", discussionsCtrl.getTopics);
router.get("/:groupId/mod/:userId", discussionsCtrl.getModStatus);
router.post("/:groupId/add", discussionsCtrl.addTopic);
router.get("/:groupId/posts/:topicId", discussionsCtrl.getPosts);
router.get("/:groupId/posts/all/:topicId", discussionsCtrl.getAllPosts);
router.post("/:groupId/posts/add/:userId", discussionsCtrl.addPost);
router.get("/post/:postId", discussionsCtrl.getPost);
router.get(
  "/:groupId/comments/:topicId/:postId",
  discussionsCtrl.getPostComments
);
router.post("/:userId/comments/add/:postId", discussionsCtrl.addPostComment);

module.exports = router;
