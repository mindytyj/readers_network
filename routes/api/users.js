const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");

router.post("/login", usersCtrl.login);
router.post("/register", usersCtrl.register);

module.exports = router;
