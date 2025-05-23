const express = require("express");
const path = require("path");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

require("dotenv").config();

require("./config/database");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/books", require("./routes/api/books"));
app.use("/api/reviews", require("./routes/api/reviews"));
app.use("/api/feed", require("./routes/api/feed"));
app.use("/api/community", require("./routes/api/community"));
app.use("/api/chats", require("./routes/api/chats"));
app.use("/api/groups", require("./routes/api/groups"));
app.use("/api/discussions", require("./routes/api/discussions"));
app.use("/api/wishlists", require("./routes/api/wishlists"));
app.use("/api/carts", require("./routes/api/carts"));
app.use("/api/orders", require("./routes/api/orders"));
app.use("/api/ebooks", require("./routes/api/ebooks"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3001;

io.on("connection", (socket) => {
  console.log(`Socket ID [${socket.id}] A user has connected to the server.`);

  socket.on("joinChat", (message) => {
    socket.join(message);
  });

  socket.on("sendMessage", (message) => {
    const data = {
      id: message.id,
      sent_recipient: message.sent_recipient,
      message: message.message,
      sent_date: message.sent_date,
    };

    io.to(message.chatID).emit("sendMessage", data);
  });

  socket.on("disconnect", () => {
    console.log(
      `Socket ID [${socket.id}] A user has disconnected from the server.`
    );
  });
});

server.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
