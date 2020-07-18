const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("SendStroke", (stroke) => {
    console.log(stroke);
    io.emit("SendStroke", stroke);
  });
});

server.listen(port, () => console.log("server running on port:" + port));
