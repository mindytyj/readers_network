const { pool } = require("../../config/database");

async function getFeedPosts(req, res) {
  try {
    const userId = req.params.userId;

    const posts = await pool.query(
      "SELECT s.id, s.user_id, s.post, s.created_date, u.first_name, u.last_name, u.username, (SELECT COUNT(*) from feed_likes l where l.feed_post_id = s.id) as likes FROM feed_posts s LEFT JOIN users u ON s.user_id = u.id WHERE s.user_id IN (SELECT friend_id FROM friends WHERE user_id = ($1)) OR s.user_id = ($1) ORDER BY s.created_date DESC",
      [userId]
    );

    if (!posts) throw new Error("There are no posts available.");

    res.status(200).json(posts.rows);
  } catch {
    res.status(400).json("Unable to retrieve posts.");
  }
}

async function addPost(req, res) {
  try {
    const userId = req.params.userId;
    const data = req.body.postData;

    await pool.query("INSERT INTO feed_posts (user_id, post) VALUES ($1, $2)", [
      userId,
      data.post,
    ]);

    res.status(200).json("Successfully added post.");
  } catch {
    res.status(400).json("Unable to add post.");
  }
}

async function getLike(req, res) {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    const like = await pool.query(
      "SELECT user_id FROM feed_likes WHERE feed_post_id = ($1) AND user_id = ($2)",
      [postId, userId]
    );

    if (!like) throw new Error("There is no like yet.");

    res.status(200).json(like.rows);
  } catch {
    res.status(400).json("Unable to retrieve like.");
  }
}

async function addLike(req, res) {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    await pool.query(
      "INSERT INTO feed_likes (feed_post_id, user_id) VALUES ($1, $2)",
      [postId, userId]
    );

    res.status(200).json("Successfully liked post.");
  } catch {
    res.status(400).json("Unable to like post.");
  }
}

async function removeLike(req, res) {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    await pool.query(
      "DELETE FROM feed_likes WHERE feed_post_id = ($1) AND user_id = ($2)",
      [postId, userId]
    );

    res.status(200).json("Successfully removed like.");
  } catch {
    res.status(400).json("Unable to remove like.");
  }
}

async function getFeedComments(req, res) {
  try {
    const postId = req.params.postId;

    const comments = await pool.query(
      "SELECT c.id, c.user_id, c.comment, c.created_date, u.first_name, u.last_name, u.username, (SELECT COUNT(*) from comment_likes l where l.feed_comment_id = c.id) as likes FROM feed_comments c LEFT JOIN users u ON c.user_id = u.id WHERE c.feed_post_id = ($1) ORDER BY c.created_date DESC",
      [postId]
    );

    if (!comments) throw new Error("There are no comments available.");

    res.status(200).json(comments.rows);
  } catch {
    res.status(400).json("Unable to retrieve comments.");
  }
}

async function getPost(req, res) {
  try {
    const postId = req.params.postId;

    const post = await pool.query(
      "SELECT s.id, s.user_id, s.post, s.created_date, u.first_name, u.last_name, u.username FROM feed_posts s LEFT JOIN users u ON s.user_id = u.id WHERE s.id = ($1);",
      [postId]
    );

    if (!post) throw new Error("There is no post with the given ID.");

    res.status(200).json(post.rows[0]);
  } catch {
    res.status(400).json("Unable to retrieve post.");
  }
}

async function addComment(req, res) {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const data = req.body.commentData;

    await pool.query(
      "INSERT INTO feed_comments (feed_post_id, user_id, comment) VALUES ($1, $2, $3)",
      [postId, userId, data.comment]
    );

    res.status(200).json("Successfully added comment.");
  } catch {
    res.status(400).json("Unable to add comment.");
  }
}

async function getCommentLike(req, res) {
  try {
    const userId = req.params.userId;
    const commentId = req.params.commentId;

    const like = await pool.query(
      "SELECT user_id FROM comment_likes WHERE feed_comment_id = ($1) AND user_id = ($2);",
      [commentId, userId]
    );

    if (!like) throw new Error("There is no like yet.");

    res.status(200).json(like.rows);
  } catch {
    res.status(400).json("Unable to retrieve like.");
  }
}

async function addCommentLike(req, res) {
  try {
    const userId = req.params.userId;
    const commentId = req.params.commentId;

    await pool.query(
      "INSERT INTO comment_likes (feed_comment_id, user_id) VALUES ($1, $2)",
      [commentId, userId]
    );

    res.status(200).json("Successfully liked comment.");
  } catch {
    res.status(400).json("Unable to like comment.");
  }
}

async function removeCommentLike(req, res) {
  try {
    const userId = req.params.userId;
    const commentId = req.params.commentId;

    await pool.query(
      "DELETE FROM comment_likes WHERE feed_comment_id = ($1) AND user_id = ($2)",
      [commentId, userId]
    );

    res.status(200).json("Successfully removed like.");
  } catch {
    res.status(400).json("Unable to remove like.");
  }
}

module.exports = {
  getFeedPosts,
  addPost,
  getLike,
  addLike,
  removeLike,
  getFeedComments,
  getPost,
  addComment,
  getCommentLike,
  addCommentLike,
  removeCommentLike,
};
