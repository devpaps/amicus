const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		require: [true, 'Ange en titel'],
	},
	content: {
		type: String,
		trim: true,
		require: [true, 'Du måste skriva något'],
	},
	postdate: {
		type: Date,
		default: Date.now,
	},
	posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Forum = mongoose.model('Forum', forumSchema);
module.exports = Forum;
