require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());
const { Server } = require("socket.io");
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("new user joined", socket.id);
  socket.on("message-sent", (data) => {
    socket.broadcast.emit("message-got", data);
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log("server is running");
});
