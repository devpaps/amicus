const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	date: {
		type: Date,
		default: Date.now,
	},
	author: {
		type: String,
	},
	post: {
		type: String,
	},
	forum: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Forum',
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
