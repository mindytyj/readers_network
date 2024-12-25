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

module.exports = {
  getCompletedBooks,
  getBooksInProgress,
  getBooksToRead,
};
