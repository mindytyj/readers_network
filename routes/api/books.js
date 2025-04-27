const express = require("express");
const router = express.Router();
const booksCtrl = require("../../controllers/api/books");

router.get("/", booksCtrl.getBooks);
router.get("/recommendations", booksCtrl.getBookRecommendations);
router.get("/:bookId", booksCtrl.getBookInfo);
router.get("/:userId/completed-books", booksCtrl.getCompletedBooks);
router.get("/:userId/books-in-progress", booksCtrl.getBooksInProgress);
router.get("/:userId/books-to-read", booksCtrl.getFutureReads);
router.get(
  "/:userId/books-to-read/status/:bookId",
  booksCtrl.getFutureReadsStatus
);
router.post("/search", booksCtrl.searchBook);
router.get(
  "/:userId/completed-books/status/:bookId",
  booksCtrl.getCompletedBookStatus
);
router.get(
  "/:userId/books-in-progress/status/:bookId",
  booksCtrl.getBookInProgressStatus
);
router.post("/:userId/completed-books/add/:bookId", booksCtrl.addCompletedBook);
router.post(
  "/:userId/books-in-progress/add/:bookId",
  booksCtrl.addBookInProgress
);
router.post("/:userId/books-to-read/add/:bookId", booksCtrl.addBookToRead);
router.delete(
  "/:userId/completed-books/remove/:bookId",
  booksCtrl.removeCompletedBook
);
router.delete(
  "/:userId/books-in-progress/remove/:bookId",
  booksCtrl.removeBookInProgress
);
router.delete(
  "/:userId/books-to-read/remove/:bookId",
  booksCtrl.removeBookToRead
);

module.exports = router;
