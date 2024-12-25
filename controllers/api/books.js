const { pool } = require("../../config/database");

async function getCompletedBooks(req, res) {
  const userId = req.params.userId;
  try {
    const completedBooks = await pool.query(
      "SELECT a.id, a.completion_status, b.title, b.image_url, c.first_name, c.last_name FROM books_tracker a LEFT JOIN books b ON a.book_id = b.id LEFT JOIN authors c ON b.author_id = c.id WHERE a.user_id = ($1) AND a.completion_status is true",
      [userId]
    );

    if (!completedBooks)
      throw new Error("There are no completed books available.");

    res.status(200).json(completedBooks.rows);
  } catch {
    res.status(400).json("Unable to retrieve profile completed books.");
  }
}

async function getBooksInProgress(req, res) {
  const userId = req.params.userId;
  try {
    const booksInProgress = await pool.query(
      "SELECT a.id, a.completion_status, b.title, b.image_url, c.first_name, c.last_name FROM books_tracker a LEFT JOIN books b ON a.book_id = b.id LEFT JOIN authors c ON b.author_id = c.id WHERE a.user_id = ($1) AND a.completion_status is false",
      [userId]
    );
    if (!booksInProgress)
      throw new Error("There are no books in-progress available.");

    res.status(200).json(booksInProgress.rows);
  } catch {
    res.status(400).json("Unable to retrieve profile books in-progress.");
  }
}

async function getBooksToRead(req, res) {
  const userId = req.params.userId;
  try {
    const booksToRead = await pool.query(
      "SELECT a.id, b.title, b.image_url, c.first_name, c.last_name FROM books_to_read a LEFT JOIN books b ON a.book_id = b.id LEFT JOIN authors c ON b.author_id = c.id WHERE a.user_id = ($1)",
      [userId]
    );
    if (!booksToRead) throw new Error("There are no books available.");

    res.status(200).json(booksToRead.rows);
  } catch {
    res.status(400).json("Unable to retrieve profile books to read.");
  }
}

async function searchBook(req, res) {
  try {
    const bookTitle = "%" + req.body.bookTitle.toLowerCase() + "%";
    const books = await pool.query(
      "SELECT a.id, a.title, a.isbn, a.publication_date, b.first_name, b.last_name from books a left join authors b on a.author_id = b.id where lower(title) like ($1)",
      [bookTitle]
    );

    if (!books)
      throw new Error("There are no book(s) found with the given search.");

    res.status(200).json(books.rows);
  } catch {
    res.status(400).json("Unable to search for the book(s).");
  }
}

async function addCompletedBook(req, res) {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const checkList = await pool.query(
      "SELECT book_id FROM books_tracker WHERE user_id = ($1) AND book_id = ($2)",
      [userId, bookId]
    );

    if (checkList.rowCount > 0)
      throw new Error(
        "The book is already in your completed books tracker list."
      );

    await pool.query(
      "INSERT INTO books_tracker (user_id, book_id, completion_status) VALUES ($1, $2, $3)",
      [userId, bookId, true]
    );

    res.status(200).json("Success");
  } catch {
    res
      .status(400)
      .json("Unable to add book into completed books tracker list.");
  }
}

async function addBookInProgress(req, res) {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const bookTitle = "%" + req.body.bookTitle.toLowerCase() + "%";
    const books = await pool.query(
      "SELECT a.title, a.isbn, a.publication_date, b.first_name, b.last_name from books a left join authors b on a.author_id = b.id where lower(title) like ($1)",
      [bookTitle]
    );

    if (!books)
      throw new Error("There are no book(s) found with the given search.");

    res.status(200).json(books.rows);
  } catch {
    res.status(400).json("Unable to search for the book(s).");
  }
}

module.exports = {
  getCompletedBooks,
  getBooksInProgress,
  getBooksToRead,
  searchBook,
  addCompletedBook,
  addBookInProgress,
};
