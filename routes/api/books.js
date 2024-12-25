const express = require("express");
const router = express.Router();
const booksCtrl = require("../../controllers/api/books");

router.get("/:userId/completed-books", booksCtrl.getCompletedBooks);
router.get("/:userId/books-in-progress", booksCtrl.getBooksInProgress);
router.get("/:userId/books-to-read", booksCtrl.getBooksToRead);

module.exports = router;
