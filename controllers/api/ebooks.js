const { pool } = require("../../config/database");

async function geteBooks(req, res) {
  try {
    const userId = req.params.userId;

    const eBooks = await pool.query(
      "SELECT books.id, books.title, books.image_url, books.rental_price, books.rental_duration, authors.first_name, authors.last_name, orders.created_date, DATE_PART('day', CURRENT_TIMESTAMP - orders.created_date::timestamp) AS days FROM order_items LEFT JOIN books ON books.id = order_items.book_id LEFT JOIN orders ON orders.id = order_items.order_id LEFT JOIN authors ON books.author_id = authors.id WHERE orders.user_id = ($1) AND DATE_PART('day', CURRENT_TIMESTAMP - orders.created_date::timestamp) <= books.rental_duration ORDER BY order_items.order_id DESC",
      [userId]
    );

    if (!eBooks) throw new Error("There is no eBooks rented by the user.");

    res.status(200).json(eBooks.rows);
  } catch (error) {
    res.status(400).json("Unable to retrieve eBooks rented by the user.");
  }
}

async function geteBookAccess(req, res) {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;

    const access = await pool.query(
      "SELECT order_items.book_id FROM orders LEFT JOIN order_items ON order_items.order_id = orders.id LEFT JOIN books ON books.id = order_items.book_id WHERE orders.user_id = ($1) AND order_items.book_id = ($2) AND DATE_PART('day', CURRENT_TIMESTAMP - orders.created_date::timestamp) <= books.rental_duration",
      [userId, bookId]
    );

    res.status(200).json(access.rowCount);
  } catch (error) {
    res.status(400).json("Unable to retrieve user's eBook access.");
  }
}

module.exports = {
  geteBooks,
  geteBookAccess,
};
