const Conversation = require('../models/conversationModel');
const catchAsync = require('../utils/catchAsync');

module.exports = {
  getConversations: catchAsync(async (req, res, next) => {
    const userId = req.params.id;
    const conversations = await Conversation.find({
      participants: { $in: [userId] },
    }).populate('participants', 'name userImage');
    res.status(200).json({ status: 'success', conversations });
  }),
};
