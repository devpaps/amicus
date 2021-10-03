const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A pet must have a name'],
	},
	owner_name: {
		type: String,
		required: [true, 'A pet must have a owner'],
	},
	pet_age: {
		type: Number,
		required: [true, 'A pet must have a age'],
	},
	species: {
		type: String,
		required: [true, 'A pet must have a species'],
	},
	image_url: {
		type: String,
		required: [true, 'A tour must have a price'],
	},
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
