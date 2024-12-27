const express = require("express");
const router = express.Router();
const booksCtrl = require("../../controllers/api/books");

router.get("/", booksCtrl.getBooks);
router.get("/recommendations", booksCtrl.getBookRecommendations);
router.get("/:bookId", booksCtrl.getBookInfo);
router.get("/:userId/completed-books", booksCtrl.getCompletedBooks);
router.get("/:userId/books-in-progress", booksCtrl.getBooksInProgress);
router.get("/:userId/books-to-read", booksCtrl.getBooksToRead);
router.post("/search", booksCtrl.searchBook);
router.post("/:userId/completed-books/add/:bookId", booksCtrl.addCompletedBook);
router.post(
  "/:userId/books-in-progress/add/:bookId",
  booksCtrl.addBookInProgress
);
router.post("/:userId/books-to-read/add/:bookId", booksCtrl.addBookToRead);

module.exports = router;
