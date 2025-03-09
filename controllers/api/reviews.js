const { pool } = require("../../config/database");

async function getUserReview(req, res) {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;

    const userReview = await pool.query(
      "SELECT review, rating, created_date FROM reviews WHERE book_id = ($1) AND user_id = ($2)",
      [bookId, userId]
    );

    res.status(200).json(userReview.rows);
  } catch {
    res.status(400).json("Unable to retrieve user's review.");
  }
}

async function getCommunityReviews(req, res) {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;

    const review = await pool.query(
      "SELECT r.id, r.user_id, r.review, r.rating, r.created_date, u.first_name, u.last_name, u.username, (SELECT COUNT(*) from review_likes l where l.review_id = r.id) as likes FROM reviews r LEFT JOIN users u ON r.user_id = u.id WHERE r.book_id = ($1)",
      [bookId]
    );

    res.status(200).json(review.rows);
  } catch {
    res.status(400).json("Unable to retrieve community reviews.");
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

async function removeUserReview(req, res) {
  try {
    const bookId = req.params.bookId;
    const userId = req.params.userId;

    await pool.query(
      "DELETE FROM reviews WHERE book_id = ($1) AND user_id = ($2)",
      [bookId, userId]
    );

    res.status(200).json("Successfully deleted review.");
  } catch {
    res.status(400).json("Unable to delete review.");
  }
}

async function getReviewLike(req, res) {
  try {
    const userId = req.params.userId;
    const reviewId = req.params.reviewId;

    const like = await pool.query(
      "SELECT user_id FROM review_likes WHERE review_id = ($1) AND user_id = ($2);",
      [reviewId, userId]
    );

    if (!like) throw new Error("There is no like yet.");

    res.status(200).json(like.rows);
  } catch {
    res.status(400).json("Unable to retrieve like.");
  }
}

async function addReviewLike(req, res) {
  try {
    const userId = req.params.userId;
    const reviewId = req.params.reviewId;

    await pool.query(
      "INSERT INTO review_likes (review_id, user_id) VALUES ($1, $2)",
      [reviewId, userId]
    );

    res.status(200).json("Successfully liked post.");
  } catch {
    res.status(400).json("Unable to like post.");
  }
}

async function removeReviewLike(req, res) {
  try {
    const userId = req.params.userId;
    const reviewId = req.params.reviewId;

    await pool.query(
      "DELETE FROM review_likes WHERE review_id = ($1) AND user_id = ($2)",
      [reviewId, userId]
    );

    res.status(200).json("Successfully removed like.");
  } catch {
    res.status(400).json("Unable to remove like.");
  }
}

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

async function addComment(req, res) {
  try {
    const userId = req.params.userId;
    const reviewId = req.params.reviewId;
    const data = req.body.commentData;

    await pool.query(
      "INSERT INTO review_comments (review_id, user_id, comment) VALUES ($1, $2, $3)",
      [reviewId, userId, data.comment]
    );

    res.status(200).json("Successfully added comment.");
  } catch {
    res.status(400).json("Unable to add comment.");
  }
}

module.exports = {
  getUserReview,
  getCommunityReviews,
  addUserReview,
  editUserReview,
  removeUserReview,
  getReviewLike,
  addReviewLike,
  removeReviewLike,
  getReview,
  getReviewComments,
  addComment,
};
