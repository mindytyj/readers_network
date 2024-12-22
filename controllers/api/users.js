const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    res.status(200).json(createJWTToken(user.rows[0]));
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
}

async function register(req, res) {
  try {
    const hashedPW = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const checkUsername = await pool.query(
      "SELECT username FROM users WHERE username = ($1)",
      [req.body.username]
    );
    if (checkUsername.rowCount > 0)
      throw new Error("Username is already taken.");

    await pool.query(
      "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
      [req.body.firstName, req.body.lastName, req.body.username, hashedPW]
    );

    const user = await pool.query(
      "SELECT id, first_name, last_name, username FROM users WHERE username = ($1)",
      [req.body.username]
    );

    res.status(200).json(createJWTToken(user.rows[0]));
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
}

async function updateProfile(req, res) {
  const userId = req.params.userId;
  try {
    const hashedPW = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.SALT_ROUNDS)
    );

    await pool.query("UPDATE users SET first_name = ($1) WHERE id = ($2)", [
      req.body.firstName,
      userId,
    ]);

    await pool.query("UPDATE users SET last_name = ($1) WHERE id = ($2)", [
      req.body.lastName,
      userId,
    ]);

    await pool.query("UPDATE users SET password = ($1) WHERE id = ($2)", [
      req.body.password,
      userId,
    ]);

    const user = await pool.query(
      "SELECT id, first_name, last_name, username FROM users WHERE id = ($1)",
      [userId]
    );

    if (!user) throw new Error("User not found.");

    res.status(200).json(createJWTToken(user.rows[0]));
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
}

function createJWTToken(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "1h" });
}

module.exports = {
  login,
  register,
  updateProfile,
};
