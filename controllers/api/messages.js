const { pool } = require("../../config/database");

async function getMessages(req, res) {
  try {
    const messages = await pool.query(
      "SELECT m.*, u.first_name, u.last_name, u.username FROM messages m LEFT JOIN users u ON m.sender_id = u.id"
    );

    if (!messages) throw new Error("There are no messages available.");

    res.status(200).json(messages.rows);
  } catch {
    res.status(400).json("Unable to retrieve messages.");
  }
}

module.exports = {
  getMessages,
};
