const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifyToken = require('../util/authToken');

router.get('/', verifyToken, authController.refreshToken);

module.exports = router;
