const util = require('util');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const upload = require('../utils/imageUpload');
const email = require('../utils/email');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
module.exports = {
  signup: catchAsync(async (req, res, next) => {
    let userId, userImage;
    if (!req.files) {
      throw new Error('Please upload your id');
    } else {
      req.files.forEach((file) => {
        if (file.fieldname === 'userId') {
          userId = file.filename;
        } else if (file.fieldname === 'userImage') {
          userImage = file.filename;
        }
      });
    }
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      mobile: req.body.phone,
      userId: userId,
      userImage: userImage,
      hostel: req.body.hostel,
      room: req.body.room,
    });
    const token = generateToken(newUser._id);
    res.cookie('token', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });
    res.status(201).json({
      status: 'success',
      token,
      data: {
        newUser,
      },
    });
  }),
  login: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Enter email and password');
    }
    const user = await User.findOne({ email: email }).select('+password');
    if (!user || !(await user.checkPassword(password, user.password))) {
      throw new Error('Incorrect e-mail or password!!');
    }
    const token = generateToken(user._id);
    res.cookie('token', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });
    res.status(200).json({
      status: 'success',
      token,
      user_id: user._id,
    });
  }),
  protect: catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      // eslint-disable-next-line prefer-destructuring
      token = req.cookies.token;
    }
    if (!token) {
      throw new Error('Not Authorised');
    }
    const decodedJWT = await util.promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );
    const user = await User.findById(decodedJWT.id);
    if (!user) {
      throw new Error('User account deleted after token issue');
    }
    if (user.checkPasswordChange(decodedJWT.iat)) {
      throw new Error(
        'Password changed after token issue. Enter updated password'
      );
    }

    next();
  }),
  logout: (req, res) => {
    res.cookie('token', '', {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
  },
  getAllUser: catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ status: 'success', users });
  }),
  uploadImage: upload.any(),
  forgotPassword: catchAsync(async (req, res, next) => {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error('NO user with this email exists');
    }
    const resetToken = await user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const subject = 'BIT-CYCLES password reset';
    const message = `Your password reset token is ${resetToken}. Paste this token in the forgot password form. This token will expire in 10 mins. If you don't want to reset your password kindly ignore this email`;
    await email({ email: user.email, subject, message });
    res.status(200).json({
      status: 'success',
    });
  }),
  resetPasssword: catchAsync(async (req, res, next) => {
    const { email, resetToken } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('No User with such email exists');
    }
    const check = await user.checkResetToken(resetToken);
    if (check.status === 'success') {
      user.passwordResetToken = undefined;
      user.resetTokenExpires = undefined;
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      user.passwordChangedAt = Date.now();
      await user.save();
      const token = generateToken(user._id);
      res.cookie('token', token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      });
      res.status(200).json({
        status: 'success',
        token,
      });
    } else {
      throw new Error(check.message);
    }
  }),
  getUser: catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error('No such user exists');
    }
    res.status(200).json({
      status: 'success',
      user,
    });
  }),
};
