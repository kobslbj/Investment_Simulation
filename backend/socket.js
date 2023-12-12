// socket.js
const { Server } = require("socket.io");
let io = null;

function init(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  return io;
}

module.exports = { init, getIo: () => io };
