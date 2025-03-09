const express = require("express");
const router = express.Router();
const messagesCtrl = require("../../controllers/api/messages");

router.get("/:userId", messagesCtrl.getMessages);

module.exports = router;
