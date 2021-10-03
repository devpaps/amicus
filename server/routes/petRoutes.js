const express = require('express');
const petController = require('../controller/petController');
const router = express.Router();

// Chaining the functions
// Checking if the request is a post or get
// Then run the middleware accordingly
router.route('/').get(petController.getAllPets).post(petController.addNewPet);

router
	.route('/:id')
	.get(petController.getAllPetsById)
	.patch(petController.updatePetById)
	.delete(petController.deletePet);

module.exports = router;
