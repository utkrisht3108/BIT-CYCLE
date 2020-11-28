const socketIo = require('socket.io');
const Message = require('./models/messageModel');

module.exports = (server) => {
  const socket = socketIo(server);
  socket.on('connection', (socket) => {
    socket.emit("connected");
    console.log('User connected');
    socket.on('chat-message', async (message) => {
      message.time = Date.now();
      socket.emit('received', { message: message.message });
      const newMessage = await Message.create(message);
      console.log(newMessage);
    });
    socket.on('load', async (users) => {
      console.log("hiiiiiiiii");
      const oldMessages = await Message.find({
        sender: users.firstUser,
        receiver: users.secondUser,
      }).limit(100);
      socket.emit('loadOldMessages', oldMessages);
    });
  });
  
};

//5fb8ba3bbe2f7734546a0fad
//5fbb8df9ca4cb540eced2d4a
