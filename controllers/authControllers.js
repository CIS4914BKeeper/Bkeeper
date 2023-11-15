const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const Metrics = require("../models/metricsModel");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN, });

const getHashedToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.setPassword = catchAsync(async (req, res, next) => {
  const hashedToken = getHashedToken(req.params.token);

  const user = await User.findOne({
    token: hashedToken,
    tokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired'), 400);
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  user.token = undefined;
  user.tokenExpires = undefined;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.signupRequest = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    school: req.body.school,
    email: req.body.email,
    studentId: req.body.studentId,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    role: req.body.role,
  });

  // await newUser.save({ validateBeforeSave: false });
  const signUpToken = newUser.generateToken();

  await newUser.save();

  const url = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/signup/${signUpToken}`;

  try {
    //reject url
    // await new Email(newUser, url).sendAdmin();

    // return next();
    res.status(200).json({
      status: 'success',
      signUpToken,
      message: 'User signup request sent for admin review.',
    });
  } catch (err) {
    return next(
      new AppError('There was an error sending the email. Tey again later!'),
      500,
    );
  }
});

exports.approveUser = catchAsync(async (req, res, next) => {
  const hashedToken = getHashedToken(req.params.token);

  const user = await User.findOne({
    token: hashedToken,
    tokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired'), 400);
  }

  // Update user status to 'approved'
  user.status = 'approved';
  await user.save();

  const signupURL = `${req.protocol}://${req.get('host')}/setPassword/${req.params.token}`;

  await new Email(user, signupURL).sendApprove();

  res.status(200).json({
    status: 'success',
    signupURL,
    message: 'User approved successfully. Email sent for password setup.',
  });
});

exports.rejectUser = catchAsync(async (req, res, next) => {
  const hashedToken = getHashedToken(req.params.token);

  const user = await User.findOneAndDelete({
    token: hashedToken,
    tokenExpires: { $gt: Date.now() },
  });


  if (!user) {
    return next(new AppError('Token is invalid or has expired'), 400);
  }

  const signupURL = `${req.protocol}://${req.get('host')}/signup`;

  await new Email(user, signupURL).sendReject();

  res.status(200).json({
    status: 'success',
    signupURL,
    message: 'User rejected successfully. Email sent to the user.',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);

});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};


// USE LATER FOR ACCESSING THEIR DATA
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access.', 401),
    );
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401),
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      res.locals.user = currentUser;

      return next();
    }
  } catch (err) {
    return next();
  }
  next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }

  const resetToken = user.generateToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfrim it ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Tey again later!'),
      500,
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = getHashedToken(req.params.token);

  const user = await User.findOne({
    token: hashedToken,
    tokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired'), 400);
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.token = undefined;
  user.tokenExpires = undefined;
  await user.save();

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission', 403),
      );
    }

    next();
  };
};

exports.metricsIntake = catchAsync(async (req, res, next) => {
  const newMetric = await Metrics.create({
    studentId: req.body.studentId,
    studentName: req.body.studentName,
    infractionType: req.body.infractionType,
    Bgrade: req.body.Bgrade,
    classID: req.body.classID,
    description: req.body.description,
  });

  await newMetric.save();
  res.status(200).json({
    status: 'success',
    data: newMetric,
  });

});