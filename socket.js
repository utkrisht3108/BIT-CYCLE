const socketIo = require('socket.io');
const Message = require('./models/messageModel');
const Conversation = require('./models/conversationModel');

module.exports = (server) => {
  const io = socketIo(server);
  io.on('connection', (socket) => {
    socket.emit('connected');
    console.log('User connected', socket.id);
    socket.on('chat-message', async (req) => {
      const conversationId = req.conId;
      console.log(conversationId);
      socket.to(conversationId).emit('received', { message: req.message,time: Date.now() });
      await Message.create({
        time: Date.now(),
        conversation: conversationId,
        message: req.message,
        receiver: req.secondUser,
      });
    });
    socket.on('load', async (users) => {
      let conversation = await Conversation.findOne({
        participants: { $all: [users.firstUser, users.secondUser] },
      });
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [users.firstUser, users.secondUser],
        });
      }
      const conversationId = conversation._id;
      socket.join(`${conversationId}`);
      const oldMessages = await Message.find({
        conversation: conversationId,
      })
        .sort('time')
        .limit(100);
      socket.emit('displayOldMessages', { oldMessages, conversationId });
    });
  });
};

//5fb8ba3bbe2f7734546a0fad
//5fbb8df9ca4cb540eced2d4a
