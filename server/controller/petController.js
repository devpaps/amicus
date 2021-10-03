const Pet = require('../model/petModel');

//function
exports.getAllPets = async (req, res) => {
	try {
		const pets = await Pet.find();
		res.status(200).json({
			status: 'success',
			results: pets.length,
			data: { pets },
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: error,
		});
	}
};

exports.getAllPetsById = async (req, res) => {
	try {
		const pet = await Pet.findById(req.params.id);
		res.status(200).json({
			status: 'Success',
			data: { pet },
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: err,
		});
	}
};

exports.addNewPet = async (req, res) => {
	try {
		// Returns a promise
		const newPet = await Pet.create(req.body);

		res.status(201).json({
			status: 'Success',
			data: {
				pet: newPet,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: 'Invalid data sent!',
		});
	}
};

exports.updatePetById = async (req, res) => {
	try {
		const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: 'Success',
			data: {
				pet,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'Failed',
			message: err,
		});
	}
};

exports.deletePet = async (req, res) => {
	try {
		await Pet.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: 'Success',
			data: 'Deleted',
		});
	} catch (err) {
		res.status(400).json({
			status: 'Failed',
			message: err,
		});
	}
};
