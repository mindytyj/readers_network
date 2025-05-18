const express = require("express");
const router = express.Router();
const groupsCtrl = require("../../controllers/api/groups");

router.get("/", groupsCtrl.getGroups);
router.post("/add/:userId", groupsCtrl.addGroup);
router.post("/search", groupsCtrl.searchGroup);
router.get("/:groupId", groupsCtrl.getGroupInfo);
router.get("/:groupId/members/:userId", groupsCtrl.getJoinStatus);
router.post("/:groupId/join/:userId", groupsCtrl.joinGroup);
router.delete("/:groupId/leave/:userId", groupsCtrl.leaveGroup);
router.delete("/:groupId/delete", groupsCtrl.deleteGroup);
router.get("/:groupId/mod/:userId", groupsCtrl.getModStatus);
router.put("/edit/:groupId", groupsCtrl.editGroupInformation);

module.exports = router;
