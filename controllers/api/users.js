const bcrypt = require("bcrypt");
const { pool } = require("../../config/database");

async function login(req, res) {
  try {
    const user = await pool.query(
      "SELECT id, first_name, last_name, username FROM users WHERE username = ($1)",
      [req.body.username]
    );
    if (user.rowCount == 0) throw new Error("User not found.");

    const password = await pool.query(
      "SELECT password FROM users WHERE username = ($1)",
      [req.body.username]
    );

    const match = await bcrypt.compare(
      req.body.password,
      password.rows[0].password
    );
    if (!match) throw new Error("Incorrect password provided.");
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
}

module.exports = {
  login,
};
