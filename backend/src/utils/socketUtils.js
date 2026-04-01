const { Server } = require('socket.io');

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`⚡ Socket connected: ${socket.id}`);

    // Join room based on user ID
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`👤 User ${userId} joined room`);
    });

    socket.on('disconnect', () => {
      console.log('🔥 Socket disconnected');
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

/**
 * Emit notification to specific user
 * @param {string} userId recipient ID
 * @param {object} notificationData The created notification object
 */
const emitNotification = (userId, notificationData) => {
  if (io) {
    io.to(userId.toString()).emit('notification', notificationData);
  }
};

module.exports = { initSocket, getIO, emitNotification };
