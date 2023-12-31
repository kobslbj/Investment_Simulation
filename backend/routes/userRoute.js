const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/1.0/user/signup', userController.signUp);
router.post('/1.0/user/signin', userController.signIn);
router.get('/1.0/user/profile', userController.getUserProfile);
router.get('/1.0/user/:userId/orders', userController.getAllOrders);
module.exports = router;
