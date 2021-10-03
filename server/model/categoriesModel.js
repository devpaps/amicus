const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		require: [true, 'Ange en titel'],
	},
	description: {
		type: String,
		trim: true,
		require: [true, 'Ange en titel'],
	},
	threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Forum' }],
});

const Categories = mongoose.model('Categories', categoriesSchema);
module.exports = Categories;
