const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authControllers');
const viewController = require('../controllers/viewsController');

const router = express.Router();

router.post('/signupRequest', authController.signupRequest);
router.get('/signup/:token/approved', authController.approveUser);
router.get('/signup/:token/rejected', authController.rejectUser);
router.post('/setPassword/:token', authController.setPassword);

router.post('/login', authController.login);

router.use(authController.protect);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassowrd/:token', authController.resetPassword);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
