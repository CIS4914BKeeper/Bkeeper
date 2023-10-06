const express = require('express');
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authControllers')

const router = express.Router();

router.get('/signup', authController.isLoggedIn, viewController.getSignupRequestForm);
router.get('/setPassword/:token', viewController.getPasswordForm);

router.get('/login', authController.isLoggedIn, viewController.getLoginForm, viewController.getOverview);
router.get('/', authController.isLoggedIn, viewController.getOverview);

router.get('/dashboard', authController.protect, viewController.getDashboard)

module.exports = router;
