const User = require('../model/userModel');

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();

		res.status(201).json({
			status: 'Success',
			results: users.length,
			data: { users },
		});
	} catch (error) {
		res.status(500).send({
			status: 'Error',
			message: error,
		});
	}
};
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		res.status(201).json({
			status: 'Success',
			data: { user },
		});
	} catch (error) {
		res.status(500).send({
			status: 'Error',
			message: error,
		});
	}
};

exports.createUser = (req, res) => {
	res.status(500).send({
		status: 'err',
		message: 'This route is not yet defined',
	});
};

exports.updateUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		//!TODO update user here, get form data from front-end and update user
	} catch (error) {
		res.status(500).send({
			status: 'err',
			message: 'This route is not yet defined',
		});
	}
};

exports.deleteUser = (req, res) => {
	res.status(500).send({
		status: 'err',
		message: 'This route is not yet defined',
	});
};
