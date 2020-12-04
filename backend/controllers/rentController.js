const catchAsync = require('../utils/catchAsync');
const email = require('../utils/email');
const { Cycle } = require('../models/cycleModel');
const { User } = require('../models/userModel');

const sendRenter = async (cycle, owner, renter) => {
  try {
  } catch (error) {}
};

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
    
    ConfirmationLink: http://127.0.0.1:5500/IEEE-Megaproject/success%20page/index.html?owner=${ownerId}&cycle=${cycleId}&renter=${renterId}&from=${from}&to=${to}&rent=true`;
    await email({ email: owner.email, subject, message });
    res.status(200).json({ status: 'success' });
  }),
  confirmCycle: catchAsync(async (req, res) => {
    const { cycleId, ownerId, renterId, from, to } = req.body;
    const owner = await User.findOne({ _id: ownerId }).select(
      'name room hostel mobile email'
    );
    const renter = await User.findOne({ _id: renterId }).select(
      'name room hostel mobile email'
    );
    const cycle = await Cycle.findOne({ _id: cycleId }).select('brand model');
    const subject = 'BIT CYCLES RENT CONFIRMATION';
    const renterMessage = `Your request for renting ${cycle.brand} from ${from} to ${to} has been approved by owner. You can contact the owner from details given below
    Owner : Name: ${owner.name} Email:${owner.email} Phone:${owner.phone} Hostel:${owner.hostel} Room:${owner.room}`;
    const ownerMessage = `Your cycle ${cycle.brand} has been successfully rented by ${renter.name} from ${from} to ${to}. You can contact the renter from details given below
    Owner : Name: ${renter.name} Email:${renter.email} Phone:${renter.phone} Hostel:${renter.hostel} Room:${renter.room}`;
    await email({
      email: renter.email,
      message: renterMessage,
      subject: subject,
    });
    await email({ email: owner.email, subject, message: ownerMessage });
    res.status(200).json({
      status: 'success',
    });
  }),
};
