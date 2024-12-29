const { pool } = require("../../config/database");

async function getUserReview(req, res) {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;

    const userReview = await pool.query(
      "SELECT review, rating, created_date FROM reviews WHERE book_id = ($1) AND user_id = ($2)",
      [bookId, userId]
    );

    res.status(200).json(userReview.rows[0]);
  } catch {
    res.status(400).json("Unable to retrieve user's review.");
  }
}

async function addUserReview(req, res) {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;
    const data = req.body.reviewData;

    await pool.query(
      "INSERT INTO reviews (user_id, book_id, review, rating) VALUES ($1, $2, $3, $4)",
      [userId, bookId, data.review, data.rating]
    );

    res.status(200).json("Successfully added user's review.");
  } catch {
    res.status(400).json("Unable to add user's review.");
  }
}

async function editUserReview(req, res) {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;
    const data = req.body.reviewData;

    await pool.query(
      "UPDATE reviews SET review = ($1), rating = ($2), updated_date = NOW() WHERE book_id = ($3) AND user_id = ($4)",
      [data.review, data.rating, bookId, userId]
    );

    res.status(200).json("Successfully updated user's review.");
  } catch {
    res.status(400).json("Unable to update user's review.");
  }
}

module.exports = {
  getUserReview,
  addUserReview,
  editUserReview,
};
