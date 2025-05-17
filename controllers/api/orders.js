const { pool } = require("../../config/database");

async function getOrders(req, res) {
  try {
    const userId = req.params.userId;

    const orderHistory = await pool.query(
      "SELECT order_items.id AS order_item_id, books.id, books.title, books.image_url, books.rental_price, books.rental_duration, authors.first_name, authors.last_name, orders.created_date FROM order_items LEFT JOIN books ON books.id = order_items.book_id LEFT JOIN orders ON orders.id = order_items.order_id LEFT JOIN authors ON books.author_id = authors.id WHERE orders.user_id = ($1) ORDER BY order_items.order_id DESC",
      [userId]
    );

    if (!orderHistory)
      throw new Error("There is no order history for the user.");

    res.status(200).json(orderHistory.rows);
  } catch (error) {
    res.status(400).json("Unable to retrieve order history.");
  }
}

async function getOrderHistory(req, res) {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;

    const orderHistory = await pool.query(
      "SELECT order_items.book_id FROM orders LEFT JOIN order_items ON order_items.order_id = orders.id LEFT JOIN books ON books.id = order_items.book_id WHERE orders.user_id = ($1) AND order_items.book_id = ($2) AND DATE_PART('day', CURRENT_TIMESTAMP - orders.created_date::timestamp) > books.rental_duration",
      [userId, bookId]
    );

    res.status(200).json(orderHistory.rowCount);
  } catch (error) {
    res.status(400).json("Unable to retrieve user's order history.");
  }
}

async function addToOrder(req, res) {
  try {
    const userId = req.params.userId;

    const orderId = await pool.query(
      "INSERT INTO orders (user_id) VALUES ($1) RETURNING id",
      [userId]
    );

    if (!orderId)
      throw new Error(
        "Unable to retrieve order id. Failed to create a new order."
      );

    const cart = await pool.query(
      "SELECT book_id FROM carts WHERE user_id = ($1)",
      [userId]
    );

    await cart.rows.map((cartItem) => {
      pool.query(
        "INSERT INTO order_items (order_id, book_id) VALUES ($1, $2)",
        [orderId.rows[0].id, cartItem.book_id]
      );
    });

    await pool.query("DELETE from carts WHERE user_id = ($1)", [userId]);

    res.status(200).json("Order placed successfully.");
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  getOrders,
  getOrderHistory,
  addToOrder,
};
