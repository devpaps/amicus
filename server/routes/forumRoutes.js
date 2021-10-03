const express = require('express');
const verifyToken = require('../util/authToken');
const forumController = require('../controller/forumController');
const router = express.Router();

router.route('/:id/addthread').post(forumController.createThread);
router.route('/').get(forumController.getAllThreads);

router
	.route('/:id')
	.get(forumController.getThreadById)
	.patch(forumController.updateThread)
	.delete(forumController.deleteThread);

module.exports = router;
