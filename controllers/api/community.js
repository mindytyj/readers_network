const { pool } = require("../../config/database");

async function getCommunityReads(req, res) {
  try {
    const recommendations = await pool.query(
      "SELECT books.id, books.title, books.image_url, authors.first_name, authors.last_name FROM books_tracker LEFT JOIN books ON books_tracker.book_id = books.id LEFT JOIN authors ON books.author_id = authors.id WHERE completion_status = true ORDER BY books_tracker.created_date DESC LIMIT 10"
    );

    if (!recommendations)
      throw new Error("There are no recent community reads available.");

    res.status(200).json(recommendations.rows);
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Unable to retrieve community reads.");
  }
}

async function getCommunityReviews(req, res) {
  const bookId = req.params.bookId;

  try {
    const communityReviews = await pool.query(
      "SELECT r.id, r.user_id, r.review, r.rating, r.created_date, u.first_name, u.last_name, u.username, (SELECT COUNT(*) from review_likes l where l.review_id = r.id) as likes FROM reviews r LEFT JOIN users u ON r.user_id = u.id WHERE r.book_id = ($1) ORDER BY r.created_date DESC",
      [bookId]
    );

    // if (!review) throw new Error("There is no review with the given ID.");

    res.status(200).json(communityReviews.rows);
  } catch {
    res.status(400).json("Unable to retrieve review.");
  }
}

async function getReviewLikes(req, res) {
  try {
    const userId = req.params.userId;
    const reviewId = req.params.reviewId;

    const likes = await pool.query(
      "SELECT user_id FROM review_likes WHERE review_id = ($1) AND user_id = ($2)",
      [reviewId, userId]
    );

    if (!likes) throw new Error("There is no review likes yet.");

    res.status(200).json(likes.rows);
  } catch {
    res.status(400).json("Unable to retrieve review likes.");
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

    res.status(200).json("Successfully liked review.");
  } catch {
    res.status(400).json("Unable to like review.");
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

    res.status(200).json("Successfully removed review like.");
  } catch {
    res.status(400).json("Unable to remove review like.");
  }
}

async function getReview(req, res) {
  try {
    const reviewId = req.params.reviewId;

    const review = await pool.query(
      "SELECT r.id, r.user_id, r.review, r.rating, r.created_date, u.first_name, u.last_name, u.username FROM reviews r LEFT JOIN users u ON r.user_id = u.id WHERE r.id = ($1)",
      [reviewId]
    );

    if (!review)
      throw new Error("There is no book rating and review with the given ID.");

    res.status(200).json(review.rows[0]);
  } catch {
    res.status(400).json("Unable to retrieve book rating and review.");
  }
}

async function getReviewComments(req, res) {
  try {
    const reviewId = req.params.reviewId;

    const comments = await pool.query(
      "SELECT c.id, c.user_id, c.comment, c.created_date, u.first_name, u.last_name, u.username, (SELECT COUNT(*) from review_likes l where l.review_id = c.id) as likes FROM review_comments c LEFT JOIN users u ON c.user_id = u.id WHERE c.review_id = ($1) ORDER BY c.created_date DESC",
      [reviewId]
    );

    if (!comments) throw new Error("There are no comments available.");

    res.status(200).json(comments.rows);
  } catch {
    res.status(400).json("Unable to retrieve comments.");
  }
}

async function addReviewComment(req, res) {
  try {
    const userId = req.params.userId;
    const reviewId = req.params.reviewId;
    const data = req.body.commentData;

    await pool.query(
      "INSERT INTO review_comments (review_id, user_id, comment) VALUES ($1, $2, $3)",
      [reviewId, userId, data.comment]
    );

    res.status(200).json("Successfully added review comment.");
  } catch {
    res.status(400).json("Unable to add review comment.");
  }
}

module.exports = {
  getCommunityReads,
  getCommunityReviews,
  getReviewLikes,
  addReviewLike,
  removeReviewLike,
  getReview,
  getReviewComments,
  addReviewComment,
};
