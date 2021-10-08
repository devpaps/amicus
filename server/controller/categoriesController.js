const { populate } = require('../model/categoriesModel');
const Categories = require('../model/categoriesModel');

exports.createCategories = async (req, res) => {
	try {
		const newCategories = await Categories.create(req.body);
		res.status(201).json({
			status: 'Success',
			data: { newCategories },
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: error,
		});
	}
};

exports.getAllCategories = async (req, res) => {
	try {
		const categories = await Categories.find();
		res.status(200).json({
			status: 'success',
			results: categories.length,
			data: { categories },
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: error,
		});
	}
};

exports.getCategoriesById = async (req, res) => {
	try {
		const categories = await Categories.findById(req.params.id).populate({
			path: 'threads', // populate blogs
			populate: {
				path: 'user', // in blogs, populate comments
			},
		});
		res.status(200).json({
			status: 'Success',
			data: { categories },
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: err,
		});
	}
};
