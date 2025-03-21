const express = require("express");
const router = express.Router();
const chatsCtrl = require("../../controllers/api/chats");

router.get("/:userId", chatsCtrl.getChats);
router.get("/chatID/:userId/:friendId", chatsCtrl.getChatID);
router.get("/recipient/:chatId/:userId", chatsCtrl.getRecipientInfo);
router.get("/messages/:chatId", chatsCtrl.getPreviousMessages);
router.post("/add/:chatId/:userId/:friendId", chatsCtrl.addNewMessage);

module.exports = router;
