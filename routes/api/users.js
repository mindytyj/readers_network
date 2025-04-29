const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");

router.post("/login", usersCtrl.login);
router.post("/register", usersCtrl.register);
router.put("/:userId/update-profile", usersCtrl.updateProfile);
router.get("/:userId/friends", usersCtrl.getFriends);
router.delete("/:userId/friends/remove/:friendId", usersCtrl.removeFriend);
router.get("/profile/:userId", usersCtrl.getUserProfile);
router.get("/:userId/friend/status/:friendId", usersCtrl.getFriendStatus);
router.post("/:userId/friends/add/:friendId", usersCtrl.addFriend);

module.exports = router;
