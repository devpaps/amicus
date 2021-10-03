const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const verifyToken = require('../util/authToken');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', verifyToken, authController.logout);

router
	.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUser);

router
	.route('/profile/:id')
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
