const Post = require('../model/postModel');
const Forum = require('../model/forumModel');
const User = require('../model/userModel');
const mongoose = require('mongoose');

exports.postToThread = async (req, res) => {
	// Returns a promise
	try {
		const newPost = await Post.create({
			user: req.body.user,
			post: req.body.post,
		});

		const user = mongoose.Types.ObjectId(req.body.user);

		const forumById = await Forum.findById(req.params.id);

		forumById.posts.push(newPost);

		await forumById.save();
		res.status(201).json({
			status: 'Success',
			data: { newPost },
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: 'Invalid data sent!',
		});
	}
};

exports.getAllPostsById = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id).populate('user');
		res.status(200).json({
			status: 'Success',
			data: [post],
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: err,
		});
	}
};

exports.updatePostById = async (req, res) => {
	try {
		const post = await Pet.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: 'Success',
			data: {
				post,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'Failed',
			message: err,
		});
	}
};
