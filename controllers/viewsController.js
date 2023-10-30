const catchAsync = require('../utils/catchAsync');

exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Bkeeper'
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
}

exports.getSignupRequestForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Request your account',
  });
}

exports.getPasswordForm = (req, res) => {
  res.status(200).render('setPassword', {
    title: 'Set your password'
  });
}

exports.getApprove = (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'User signup request sent for admin review',
  });
}

exports.getDashboard = (req, res) => {
  res.status(200).render('dashboard', {
    title: 'Dashboard',
  })
}

// Metrics intake
exports.metricsIntake = (req, res) => {
  res.render('metricsIntake'); 
};