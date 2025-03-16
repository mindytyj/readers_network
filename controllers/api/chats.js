const { pool } = require("../../config/database");

async function getChats(req, res) {
  try {
    const chats = await pool.query(
      "SELECT id, u.first_name, u.last_name, u.username FROM chats c LEFT JOIN users u ON c.user_id = u.id"
    );

    if (!chats) throw new Error("There are no chats available.");

    res.status(200).json(chats.rows);
  } catch {
    res.status(400).json("Unable to retrieve chats.");
  }
}

async function getChatID(req, res) {
  const userId = req.params.userId;
  const friendId = req.params.friendId;

  try {
    const chatId = await pool.query(
      "SELECT id FROM chats WHERE user_id = ($1) AND friend_id = ($2) OR user_id = ($2) AND friend_id = ($1)",
      [userId, friendId]
    );

    if (chatId.rowCount == 0)
      chatId = await pool.query(
        "INSERT INTO chats (user_id, friend_id) VALUES ($1, $2) RETURNING chats.id",
        [userId, friendId]
      );

    if (chatId.rowCount == 0)
      throw new Error(
        "Unable to retrieve chat id. Failed to create a new chat."
      );

    res.status(200).json(chatId.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function getPreviousMessages(req, res) {
  const chatId = req.params.chatId;

  try {
    const messages = await pool.query(
      "SELECT sent_recipient, message, sent_date FROM messages WHERE chat_id = ($1) ORDER BY sent_date desc",
      [chatId]
    );

    if (!messages) throw new Error("There are no messages available.");

    res.status(200).json(messages.rows);
  } catch {
    res.status(400).json("Unable to retrieve messages.");
  }
}

async function addNewMessage(req, res) {
  const chatId = req.params.chatId;
  const userId = req.params.userId;
  const friendId = req.params.friendId;
  const data = req.body.messageData;

  try {
    const chatID = await pool.query("SELECT id FROM chats WHERE id = ($1)", [
      chatId,
    ]);

    if (chatID.rowCount == 0) throw new Error("Unable to find chat ID.");

    await pool.query(
      "INSERT INTO messages (chat_id, sent_recipient, receive_recipient, message) VALUES ($1, $2, $3, $4)",
      [chatId, userId, friendId, data.messageInput]
    );

    res.status(200).json("Success");
  } catch (error) {
    res.status(400).json("Unable to add message.");
  }
}

module.exports = {
  getChats,
  getChatID,
  getPreviousMessages,
  addNewMessage,
};
