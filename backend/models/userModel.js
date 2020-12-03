const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { cycleSchema, Cycle } = require('./cycleModel');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
    unique: false,
  },
  mobile: {
    type: Number,
    // required: [true, 'Please enter a mobile number'],
    match: [
      /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/,
      'Please enter a valid mobile number',
    ],
    unique: false,
  },
  password: {
    type: String,
    required: [true, 'Please Enter a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Confirm your password'],
    validate: {
      validator: function (element) {
        return element === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  cycles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cycle',
      unique: false,
    },
  ],
  hostel: {
    type: Number,
    min: 1,
    max: 14,
  },
  room: {
    type: Number,
    min: 1,
    max: 500,
  },
  userImage: {
    type: String,
  },
  userId: {
    type: String,
  },
  passwordResetToken: String,
  resetTokenExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.passwordConfirm = undefined;
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.checkPassword = async function (
  enteredPassword,
  actualPassword
) {
  return await bcrypt.compare(enteredPassword, actualPassword);
};

userSchema.methods.checkPasswordChange = function (timestamp) {
  if (!this.passwordChangedAt) {
    return false;
  }

  const lastChange = this.passwordChangedAt.getTime() / 1000;
  return lastChange > timestamp;
};

userSchema.methods.generatePasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = await bcrypt.hash(resetToken, 12);
  this.resetTokenExpires = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

userSchema.methods.checkResetToken = async function (userToken) {
  if (!(await bcrypt.compare(userToken, this.passwordResetToken))) {
    return {
      status: 'error',
      message: 'Invalid reset token',
    };
  } else if (this.resetTokenExpires < Date.now()) {
    return {
      status: 'error',
      message: 'Token has expired',
    };
  } else {
    return {
      status: 'success',
      message: 'Correct reset token and token is not expired',
    };
  }
};
exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;
