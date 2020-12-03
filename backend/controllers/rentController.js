const catchAsync = require('../utils/catchAsync');
const email = require('../utils/email');
const { Cycle } = require('../models/cycleModel');
const { User } = require('../models/userModel');

module.exports = {
  rentCycle: catchAsync(async (req, res, next) => {
    const { cycleId, ownerId, renterId, from, to } = req.body;
    const owner = await User.findOne({ _id: ownerId }).select('email');
    const renter = await User.findOne({ _id: renterId }).select(
      'name room hostel mobile email'
    );
    const cycle = await Cycle.findOne({ _id: cycleId }).select('brand model');
    const subject = 'BIT CYCLES Rent Offer';
    const message = `A user is interested in renting your ${cycle.brand} cycle from ${from} to ${to} your cycle. 
    You can contact the user for finalizing the price.Click the link below to confirm the booking.Details of the your are also given below
    User: Name:${renter.name}, mobile:${renter.mobile},email:${renter.email},hostel:${renter.hostel},
    Room:${renter.room}
    
    ConfirmationLink: http://127.0.0.1:5500/IEEE-Megaproject/success%20page/index.html?owner=${ownerId}&cycle=${cycleId}&renter=${renterId}&from=${from}&to=${to}`;
    await email({ email: owner.email, subject, message });
    res.status(200).json({ status: 'success' });
  }),
};
