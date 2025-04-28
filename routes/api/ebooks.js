const express = require("express");
const router = express.Router();
const eBooksCtrl = require("../../controllers/api/ebooks");

router.get("/:userId", eBooksCtrl.geteBooks);
router.get("/:bookId/access/:userId", eBooksCtrl.geteBookAccess);

module.exports = router;
