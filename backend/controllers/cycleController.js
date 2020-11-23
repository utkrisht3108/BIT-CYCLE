const multer = require('multer');
const { Cycle } = require('../models/cycleModel');
const catchAsync = require('../utils/catchAsync');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/upload/');
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split('/')[1];
    callback(null, file.originalname);
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
    const cycle = await Cycle.find();
    console.log("hahhahhah");
    res.status(200).json({
      status: 'success',
      data: {
        cycle,
      },
    });
  }),
  addCycle: catchAsync(async (req, res, next) => {
    const newCycle = await Cycle.create(req.body);
    
    if (req.file) {
      newCycle.image = req.file.filename;
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
  uploadImage: upload.single('image'),
  deleteCycle: catchAsync(async (req, res, next) => {
    const deletedCycle = await Cycle.findByIdAndDelete(req.params.id);
    if (!deletedCycle) {
      throw new Error('No cycle with such id found');
    }
    res.status(200).json({
      status: 'success',
      deletedCycle,
    });
  }),
};
