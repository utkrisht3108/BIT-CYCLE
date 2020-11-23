const util = require('util');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
module.exports = {
  signup: catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      mobile: req.body.mobile,
      passwordChangedAt: req.body.passwordChangedAt,
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
    console.log(req.body);
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
};
