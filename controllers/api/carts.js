const { pool } = require("../../config/database");

async function getCart(req, res) {
  try {
    const userId = req.params.userId;

    const cart = await pool.query(
      "SELECT books.id, books.title, books.rental_price, books.rental_duration, books.image_url, authors.first_name, authors.last_name FROM carts LEFT JOIN books ON books.id = carts.book_id LEFT JOIN authors ON authors.id = books.author_id WHERE carts.user_id = ($1)",
      [userId]
    );

    res.status(200).json(cart.rows);
  } catch (error) {
    res.status(400).json("Unable to retrieve cart items.");
  }
}

async function getCartStatus(req, res) {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;

    const cartStatus = await pool.query(
      "SELECT book_id FROM carts WHERE user_id = ($1) AND book_id = ($2)",
      [userId, bookId]
    );

    res.status(200).json(cartStatus.rowCount);
  } catch (error) {
    res.status(400).json("Unable to retrieve user's book cart status.");
  }
}

async function addToCart(req, res) {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const checkDuplicate = await pool.query(
      "SELECT book_id, user_id FROM carts WHERE book_id = ($1) AND user_id = ($2)",
      [bookId, userId]
    );

    if (
      checkDuplicate?.rows[0]?.book_id == bookId &&
      checkDuplicate?.rows[0]?.user_id == userId
    ) {
      throw new Error("Book is already in cart.");
    }

    await pool.query("INSERT INTO carts (book_id, user_id) VALUES ($1, $2)", [
      bookId,
      userId,
    ]);

    res.status(200).json("Successfully added book to cart.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function removeCartItem(req, res) {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    await pool.query(
      "DELETE FROM carts WHERE user_id = ($1) AND book_id = ($2)",
      [userId, bookId]
    );

    res.status(200).json("Book has been successfully deleted from cart.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  getCart,
  getCartStatus,
  addToCart,
  removeCartItem,
};
