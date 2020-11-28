const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
router.route('/signup').post(authController.uploadImage, authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);
router.route('/').get(authController.getAllUser);
module.exports = router;
