const express = require('express');
const verifyToken = require('../util/authToken');
const postController = require('../controller/postController');
const router = express.Router();

router.route('/:id/addpost').post(verifyToken, postController.postToThread);

router.route('/:id').get(verifyToken, postController.getAllPostsById);
module.exports = router;
