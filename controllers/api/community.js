const { pool } = require("../../config/database");

async function getReview(req, res) {
  try {
    const reviewId = req.params.reviewId;

    const review = await pool.query(
      "SELECT r.id, r.user_id, r.review, r.rating, r.created_date, u.first_name, u.last_name, u.username FROM reviews r LEFT JOIN users u ON r.user_id = u.id WHERE r.id = ($1)",
      [reviewId]
    );

    // if (!review) throw new Error("There is no review with the given ID.");

    res.status(200).json(review.rows);
  } catch {
    res.status(400).json("Unable to retrieve review.");
  }
}

async function getReviewComments(req, res) {
  try {
    const reviewId = req.params.reviewId;

    const comments = await pool.query(
      "SELECT c.id, c.user_id, c.comment, c.created_date, u.first_name, u.last_name, u.username, (SELECT COUNT(*) from review_likes l where l.review_id = c.id) as likes FROM review_comments c LEFT JOIN users u ON c.user_id = u.id WHERE c.review_id = ($1);",
      [reviewId]
    );

    // if (!comments) throw new Error("There are no comments available.");

    res.status(200).json(comments.rows);
  } catch {
    res.status(400).json("Unable to retrieve comments.");
  }
}

module.exports = {
  getReview,
  getReviewComments,
};
