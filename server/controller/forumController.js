const Forum = require('../model/forumModel');
const User = require('../model/userModel');
const Categories = require('../model/categoriesModel');

exports.getAllThreads = async (req, res) => {
	try {
		const thread = await Forum.find({});
		res.status(200).json({
			status: 'success',
			results: thread.length,
			data: { thread },
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: error,
		});
	}
};

exports.getThreadById = async (req, res) => {
	try {
		const { id } = req.params;
		const thread = await Forum.findById(id)
			.populate('user')
			.populate({
				path: 'posts', // populate posts
				populate: {
					path: 'user', // in posts, populate comments
				},
			});

		res.status(200).json({
			status: 'success',
			results: thread.posts.length,
			data: thread,
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: error,
		});
	}
};

exports.createThread = async (req, res) => {
	try {
		const newForum = await Forum.create({
			title: req.body.newThread.title,
			content: req.body.newThread.content,
			user: req.body.user,
		});

		const categoriesById = await Categories.findById(req.params.id);

		categoriesById.threads.push(newForum);

		await categoriesById.save();
		res.status(200).json({
			status: 'success',
			data: { newForum },
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: err,
		});
	}
};

exports.updateThread = async (req, res) => {
	try {
		const forum = await Forum.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: 'Success',
			data: {
				forum,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'Failed',
			message: err,
		});
	}
};

exports.deleteThread = (req, res) => {
	res.status(500).send({
		status: 'err',
		message: 'This route is not yet defined',
	});
};
