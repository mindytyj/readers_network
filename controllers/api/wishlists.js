const { pool } = require("../../config/database");

async function getWishlist(req, res) {
  try {
    const userId = req.params.userId;

    const wishlist = await pool.query(
      "SELECT books.id, books.title, books.isbn, books.publication_date, books.image_url, authors.first_name, authors.last_name FROM wishlists LEFT JOIN books ON books.id = wishlists.book_id LEFT JOIN authors ON books.author_id = authors.id WHERE wishlists.user_id = ($1)",
      [userId]
    );

    res.status(200).json(wishlist.rows);
  } catch (error) {
    res.status(400).json("Unable to retrieve wishlist.");
  }
}

async function getWishlistStatus(req, res) {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;

    const wishlistStatus = await pool.query(
      "SELECT book_id FROM wishlists WHERE user_id = ($1) AND book_id = ($2)",
      [userId, bookId]
    );

    res.status(200).json(wishlistStatus.rowCount);
  } catch (error) {
    res.status(400).json("Unable to retrieve user's book wishlist status.");
  }
}

async function addToWishlist(req, res) {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const checkDuplicate = await pool.query(
      "SELECT book_id, user_id FROM wishlists WHERE book_id = ($1) AND user_id = ($2)",
      [bookId, userId]
    );

    if (
      checkDuplicate?.rows[0]?.book_id == bookId &&
      checkDuplicate?.rows[0]?.user_id == userId
    ) {
      throw new Error("Book is already in wishlist.");
    }

    await pool.query(
      "INSERT INTO wishlists (book_id, user_id) VALUES ($1, $2)",
      [bookId, userId]
    );

    res.status(200).json("Successfully added book to wishlist.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function removeWishlistItem(req, res) {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    await pool.query(
      "DELETE FROM wishlists WHERE user_id = ($1) AND book_id = ($2)",
      [userId, bookId]
    );

    res.status(200).json("Book has been successfully deleted from wishlist.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  getWishlist,
  getWishlistStatus,
  addToWishlist,
  removeWishlistItem,
};
