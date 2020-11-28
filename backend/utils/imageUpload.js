const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === 'cycleImages') {
      callback(null, 'img/cycle');
    } else if (file.fieldname === 'userImage') {
      callback(null, 'img/user');
    } else if (file.fieldname === 'userId') {
      callback(null, 'img/userId');
    }
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
module.exports = multer({
  storage: storage,
  fileFilter: filter,
});
