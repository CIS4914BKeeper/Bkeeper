const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  school: {
    type: String,
    required: [true, 'Please provide your school'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  studentId: {
    type: Number,
    required: [true, 'Please provide your studentID'],
  },
  name: {
    type: String,
    required: [true, 'Plesae tell us your name!'],
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, ['en-US']);
      },
      message: 'Please provide a valid phone number!',
    },
  },
  password: {
    type: String,
    // required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    // required: [true, 'Please confirm your password'],
  },
  class: {
    type: [String],
    required: [true, 'Please provide your class.'],
  },
  passwordChangedAt: Date,
  token: String,
  tokenExpires: Date,
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    default: 'student',
  },

});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  if (this.password !== this.passwordConfirm) {
    return next(new Error('Passwords do not match'));
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.generateToken = function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.token = crypto.createHash('sha256').update(token).digest('hex');
  this.tokenExpires = Date.now() + 10 * 60 * 1000;

  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
