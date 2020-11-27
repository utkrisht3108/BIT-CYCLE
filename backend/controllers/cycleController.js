const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util');
const { Cycle } = require('../models/cycleModel');
const { User } = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'img/');
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split('/')[1];
    callback(null, Date.now() + file.originalname);
  },
});
const filter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type'), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: filter,
});

module.exports = {
  getAllCycles: catchAsync(async (req, res, next) => {
    console.log(__dirname);
    const cycle = await Cycle.find();
    console.log('hahhahhah');
    res.status(200).json({
      status: 'success',
      data: {
        cycle,
      },
    });
  }),
  addCycle: catchAsync(async (req, res, next) => {
    const newCycle = await Cycle.create(req.body);
    const cycleId = newCycle._id;
    const cycleOwner = await User.findById(newCycle.owner);
    if (!cycleOwner) {
      next(new Error('No such user exists'));
    }
    if (!cycleOwner.cycles.includes(cycleId)) {
      await cycleOwner.updateOne({ cycles: [...cycleOwner.cycles, cycleId] });
    }
    if (req.files) {
      newCycle.images = req.files.map((file) => file.filename);
      newCycle.save();
    }
    res.status(201).json({
      status: 'success',
      data: {
        newCycle,
      },
    });
  }),
  getCycle: catchAsync(async (req, res, next) => {
    const cycle = await Cycle.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        cycle,
      },
    });
  }),
  updateCycle: catchAsync(async (req, res, next) => {
    let updatedCycle = await Cycle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (req.file) {
      updatedCycle = await Cycle.findByIdAndUpdate(
        req.params.id,
        { image: req.file.filename },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    res.status(200).json({
      status: 'success',
      data: { updatedCycle },
    });
  }),
  uploadImage: upload.array('images', 8),
  deleteCycle: catchAsync(async (req, res, next) => {
    const deletedCycle = await Cycle.findByIdAndDelete(req.params.id);
    if (!deletedCycle) {
      throw new Error('No cycle with such id found');
    }
    if (deletedCycle.image) {
      await promisify(fs.unlink)(`img/${deletedCycle.image}`);
    }
    const cycleId = deletedCycle._id.toString();
    const ownerId = deletedCycle.owner;
    const cycleOwner = await User.findById(ownerId);
    const cycles = cycleOwner.cycles.filter(
      (userCycle) => userCycle != cycleId
    );
    await cycleOwner.updateOne({ cycles: cycles });
    res.status(200).json({
      status: 'success',
      deletedCycle,
    });
  }),
};
