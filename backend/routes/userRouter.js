const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
router.route('/signup').post(authController.uploadImage, authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword').patch(authController.resetPasssword);
router.route('/').get(authController.getAllUser);
router.route('/:id').get(authController.getUser);
module.exports = router;
