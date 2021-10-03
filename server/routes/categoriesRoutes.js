const express = require('express');
const verifyToken = require('../util/authToken');
const categoriesController = require('../controller/categoriesController');
const router = express.Router();

router
	.route('/')
	.get(categoriesController.getAllCategories)
	.post(categoriesController.createCategories);

router.route('/:id').get(categoriesController.getCategoriesById);

module.exports = router;
