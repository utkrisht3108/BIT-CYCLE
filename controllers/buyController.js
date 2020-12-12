const catchAsync = require('../utils/catchAsync');
const email = require('../utils/email');
const { Cycle } = require('../models/cycleModel');
const { User } = require('../models/userModel');



module.exports = {
  buyCycle: catchAsync(async (req, res, next) => {
    const { cycleId, ownerId, buyerId} = req.body;
    const owner = await User.findOne({ _id: ownerId }).select('email');
    const buyer = await User.findOne({ _id: buyerId }).select(
      'name room hostel phone email'
    );
    const cycle = await Cycle.findOne({ _id: cycleId }).select('brand model');
    const subject = 'BIT CYCLES Buy Offer';
    const message = `A user is interested in buying your ${cycle.brand} cycle for ${cycle.buyPrice}. 
    You can contact the user for finalizing the price.Click the link below to confirm the booking.Details of the your are also given below
    User: Name:${buyer.name}, mobile:${buyer.phone},email:${buyer.email},hostel:${buyer.hostel},
    Room:${buyer.room}
    
    ConfirmationLink: http://bit-cycle.ap-south-1.elasticbeanstalk.com/success%20page/index.html?owner=${ownerId}&cycle=${cycleId}&buyer=${buyerId}&buy=true`;
    await email({ email: owner.email, subject, message });
    res.status(200).json({ status: 'success' });
  }),
  confirmCycle: catchAsync(async (req, res) => {
    const { cycleId, ownerId, buyerId } = req.body;
    const owner = await User.findOne({ _id: ownerId }).select(
      'name room hostel phone email'
    );
    const buyer = await User.findOne({ _id: buyerId }).select(
      'name room hostel phone email'
    );
    const cycle = await Cycle.findOne({ _id: cycleId }).select('brand model');
    const subject = 'BIT CYCLES BUY CONFIRMATION';
    const buyerMessage = `Your request for buying ${cycle.brand} has been approved by owner. You can contact the owner from details given below
    Owner : Name: ${owner.name} Email:${owner.email} Phone:${owner.phone} Hostel:${owner.hostel} Room:${owner.room}`;
    const ownerMessage = `Your cycle ${cycle.brand} has been successfully bought by ${buyer.name} . You can contact the buyer from details given below
    Owner : Name: ${buyer.name} Email:${buyer.email} Phone:${buyer.phone} Hostel:${buyer.hostel} Room:${buyer.room}`;
    await email({
      email: buyer.email,
      message: buyerMessage,
      subject: subject,
    });
    await email({ email: owner.email, subject, message: ownerMessage });
    res.status(200).json({
      status: 'success',
    });
  }),
};
