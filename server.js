const express = require("express");
const path = require("path");

require("dotenv").config();

require("./config/database");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/books", require("./routes/api/books"));
app.use("/api/reviews", require("./routes/api/reviews"));
app.use("/api/feed", require("./routes/api/feed"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
