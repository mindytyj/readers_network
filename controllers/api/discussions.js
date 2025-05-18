const { pool } = require("../../config/database");

async function getTopics(req, res) {
  try {
    const groupId = req.params.groupId;

    const topics = await pool.query(
      "SELECT id, topic_name FROM discussion_topics WHERE group_id = ($1)",
      [groupId]
    );

    if (!topics) throw new Error("There are no discussion topics available.");

    res.status(200).json(topics.rows);
  } catch {
    res.status(400).json("Unable to retrieve discussion topics.");
  }
}

async function getModStatus(req, res) {
  try {
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    const status = await pool.query(
      "SELECT creator, moderator FROM group_members WHERE group_id = ($1) AND user_id = ($2)",
      [groupId, userId]
    );

    if (!status)
      throw new Error("There is no mod status available for the user.");

    res.status(200).json(status.rows[0]);
  } catch {
    res.status(400).json("Unable to retrieve user's mod status.");
  }
}

async function addTopic(req, res) {
  try {
    const groupId = req.params.groupId;
    const topic = req.body.topicData;

    const lowerCaseTopic = topic.toLowerCase();

    const checkTopicName = await pool.query(
      "SELECT topic_name FROM discussion_topics WHERE lower(topic_name) = ($1)",
      [lowerCaseTopic]
    );

    if (checkTopicName.rowCount > 0)
      throw new Error(
        "There is an existing topic with the same name. Failed to create a new topic."
      );

    const addTopic = await pool.query(
      "INSERT INTO discussion_topics (group_id, topic_name) VALUES ($1, $2)",
      [groupId, topic]
    );

    if (addTopic.rowCount == 0)
      throw new Error("Failed to create a new topic.");

    res.status(200).json("Successfully added discussion topic.");
  } catch {
    res.status(400).json("Unable to add discussion topic.");
  }
}

async function getPosts(req, res) {
  try {
    const groupId = req.params.groupId;
    const topicId = req.params.topicId;

    const posts = await pool.query(
      "SELECT p.id, p.discussion_topics_id, d.topic_name, p.sub_topic_title, p.sub_topic_description, p.created_date, COUNT(c.id) AS comments FROM sub_topics p LEFT JOIN discussion_topics d ON p.discussion_topics_id = d.id LEFT JOIN sub_topics_comments c ON p.id = c.sub_topics_id WHERE p.group_id = ($1) AND p.discussion_topics_id = ($2) GROUP BY p.id, d.topic_name LIMIT 10",
      [groupId, topicId]
    );

    if (!posts) throw new Error("There are no discussion posts available.");

    res.status(200).json(posts.rows);
  } catch {
    res.status(400).json("Unable to retrieve discussion posts.");
  }
}

async function getAllPosts(req, res) {
  try {
    const groupId = req.params.groupId;
    const topicId = req.params.topicId;

    const posts = await pool.query(
      "SELECT p.id, p.discussion_topics_id, d.topic_name, p.sub_topic_title, p.sub_topic_description, p.created_date, COUNT(c.id) AS comments FROM sub_topics p LEFT JOIN discussion_topics d ON p.discussion_topics_id = d.id LEFT JOIN sub_topics_comments c ON p.id = c.sub_topics_id WHERE p.group_id = ($1) AND p.discussion_topics_id = ($2) GROUP BY p.id, d.topic_name",
      [groupId, topicId]
    );

    if (!posts) throw new Error("There are no discussion posts available.");

    res.status(200).json(posts.rows);
  } catch {
    res.status(400).json("Unable to retrieve discussion posts.");
  }
}

async function addPost(req, res) {
  try {
    const groupId = req.params.groupId;
    const userId = req.params.userId;
    const data = req.body.postData;

    const addPost = await pool.query(
      "INSERT INTO sub_topics (group_id, discussion_topics_id, user_id, sub_topic_title, sub_topic_description) VALUES ($1, $2, $3, $4, $5)",
      [groupId, data.postTopic, userId, data.postTitle, data.postContent]
    );

    if (addPost.rowCount == 0) throw new Error("Failed to create a new post.");

    res.status(200).json("Successfully added post to discussion topic.");
  } catch {
    res.status(400).json("Unable to add post to discussion topic.");
  }
}

async function getPost(req, res) {
  try {
    const postId = req.params.postId;

    const post = await pool.query(
      "SELECT s.id, s.user_id, s.sub_topic_title, s.sub_topic_description, s.created_date, u.first_name, u.last_name, u.username FROM sub_topics s LEFT JOIN users u ON s.user_id = u.id WHERE s.id = ($1);",
      [postId]
    );

    if (!post) throw new Error("There is no post with the given ID.");

    res.status(200).json(post.rows[0]);
  } catch {
    res.status(400).json("Unable to retrieve post.");
  }
}

async function getPostComments(req, res) {
  try {
    const groupId = req.params.groupId;
    const topicId = req.params.topicId;
    const postId = req.params.postId;

    const comments = await pool.query(
      "SELECT c.id, c.user_id, c.comment, c.created_date, u.first_name, u.last_name, u.username FROM sub_topics_comments c LEFT JOIN users u ON c.user_id = u.id WHERE c.sub_topics_id = ($1) ORDER BY c.created_date DESC",
      [postId]
    );

    if (!comments) throw new Error("There are no post comments available.");

    res.status(200).json(comments.rows);
  } catch {
    res.status(400).json("Unable to retrieve post comments.");
  }
}

async function addPostComment(req, res) {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const data = req.body.commentData;

    await pool.query(
      "INSERT INTO sub_topics_comments (sub_topics_id, user_id, comment) VALUES ($1, $2, $3)",
      [postId, userId, data.comment]
    );

    res.status(200).json("Successfully added post comment.");
  } catch {
    res.status(400).json("Unable to add post comment.");
  }
}

module.exports = {
  getTopics,
  getModStatus,
  addTopic,
  getPosts,
  getAllPosts,
  addPost,
  getPost,
  getPostComments,
  addPostComment,
};
