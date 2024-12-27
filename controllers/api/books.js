const { pool } = require("../../config/database");

async function getBooks(req, res) {
  try {
    const books = await pool.query(
      "SELECT books.id, books.title, books.image_url, authors.first_name, authors.last_name FROM books LEFT JOIN authors ON books.author_id = authors.id"
    );

    if (!books) throw new Error("There are no books available.");

    res.status(200).json(books);
  } catch {
    res.status(400).json("Unable to retrieve books.");
  }
}

async function getBookRecommendations(req, res) {
  try {
    const genre = await pool.query(
      "SELECT books.genre_id FROM books_tracker LEFT JOIN books ON books_tracker.book_id = books.id"
    );

    const genreId = genre.rows[0].genre_id;

    const recommendations = await pool.query(
      "SELECT books.id, books.title, books.image_url, authors.first_name, authors.last_name FROM books LEFT JOIN authors ON books.author_id = authors.id WHERE books.genre_id = ($1) ORDER BY random() LIMIT 9",
      [genreId]
    );

    if (!recommendations)
      throw new Error("There are no book recommendations available.");

    res.status(200).json(recommendations.rows);
  } catch {
    res.status(400).json("Unable to retrieve book recommendations.");
  }
}

async function getBookInfo(req, res) {
  const bookId = req.params.bookId;
  try {
    const book = await pool.query(
      "SELECT books.id, books.title, genres.genre_name, books.description, languages.language_name, books.pages, books.isbn, books.publication_date, publishers.publisher_name, authors.first_name, authors.last_name, books.image_url FROM books JOIN genres ON genres.id = books.genre_id JOIN languages ON languages.id = books.language_id JOIN publishers ON publishers.id = books.publisher_id JOIN authors ON authors.id = books.author_id WHERE books.id = ($1)",
      [bookId]
    );
    res.json(book.rows[0]);
  } catch {
    res.status(400).json("Unable to retrieve book information.");
  }
}

async function getCompletedBooks(req, res) {
  const userId = req.params.userId;
  try {
    const completedBooks = await pool.query(
      "SELECT books_tracker.id, books_tracker.completion_status, books.title, books.image_url, authors.first_name, authors.last_name FROM books_tracker LEFT JOIN books ON books_tracker.book_id = books.id LEFT JOIN authors ON books.author_id = authors.id WHERE books_tracker.user_id = ($1) AND books_tracker.completion_status is true",
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
      "SELECT books_tracker.id, books_tracker.completion_status, books.title, books.image_url, authors.first_name, authors.last_name FROM books_tracker LEFT JOIN books ON books_tracker.book_id = books.id LEFT JOIN authors ON books.author_id = authors.id WHERE books_tracker.user_id = ($1) AND books_tracker.completion_status is false",
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
      "SELECT books_to_read.id, books.title, books.image_url, authors.first_name, authors.last_name FROM books_to_read LEFT JOIN books ON books_to_read.book_id = books.id LEFT JOIN authors ON books.author_id = authors.id WHERE books_to_read.user_id = ($1)",
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
      "SELECT books.id, books.title, books.isbn, books.publication_date, books.image_url, authors.first_name, authors.last_name FROM books LEFT JOIN authors ON books.author_id = authors.id WHERE lower(title) LIKE ($1)",
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
      throw new Error("The book is already in your reading tracker list.");

    await pool.query(
      "INSERT INTO books_tracker (user_id, book_id, completion_status) VALUES ($1, $2, $3)",
      [userId, bookId, true]
    );

    res.status(200).json("Success");
  } catch {
    res.status(400).json("Unable to add book into reading tracker list.");
  }
}

async function addBookInProgress(req, res) {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const checkList = await pool.query(
      "SELECT book_id FROM books_tracker WHERE user_id = ($1) AND book_id = ($2)",
      [userId, bookId]
    );

    if (checkList.rowCount > 0)
      throw new Error("The book is already in your reading tracker list.");

    await pool.query(
      "INSERT INTO books_tracker (user_id, book_id, completion_status) VALUES ($1, $2, $3)",
      [userId, bookId, false]
    );

    res.status(200).json("Success");
  } catch {
    res.status(400).json("Unable to add book into reading tracker list.");
  }
}

async function addBookToRead(req, res) {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const checkList = await pool.query(
      "SELECT book_id FROM books_to_read WHERE user_id = ($1) AND book_id = ($2)",
      [userId, bookId]
    );

    if (checkList.rowCount > 0)
      throw new Error(
        "The book is already in your books to read tracker list."
      );

    await pool.query(
      "INSERT INTO books_to_read (user_id, book_id) VALUES ($1, $2)",
      [userId, bookId]
    );

    res.status(200).json("Success");
  } catch {
    res.status(400).json("Unable to add book into books to read tracker list.");
  }
}

module.exports = {
  getBooks,
  getBookRecommendations,
  getBookInfo,
  getCompletedBooks,
  getBooksInProgress,
  getBooksToRead,
  searchBook,
  addCompletedBook,
  addBookInProgress,
  addBookToRead,
};
