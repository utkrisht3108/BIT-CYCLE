const socketIo = require('socket.io');
const Message = require('./models/messageModel');

module.exports = (server) => {
  const io = socketIo(server);
  io.on('connection', (socket) => {
    socket.emit('connected');
    console.log('User connected',socket.id);
    socket.on('chat-message', async (message) => {
      message.time = Date.now();
      socket.broadcast.emit('received', { message: message.message });
      await Message.create(message);
    });
    socket.on('load', async (users) => {
      console.log('hiiiiiiiii');
      const oldMessages = await Message.find({
        $or: [
          {
            sender: users.firstUser,
            receiver: users.secondUser,
          },
          {
            sender: users.secondUser,
            receiver: users.firstUser,
          },
        ],
      })
        .sort('time')
        .limit(100);
      socket.emit('loadOldMessages', oldMessages);
    });
  });
};

//5fb8ba3bbe2f7734546a0fad
//5fbb8df9ca4cb540eced2d4a
