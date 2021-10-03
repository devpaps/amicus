const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: process.env.JWT_EXPIRES,
	});
};

// Validating password, by hasing the inputed password,
//and comparing it to the already hashed password the user got when he signed up
const validatePassword = async (hashedPassword, userPassword) => {
	return await bcrypt.compare(hashedPassword, userPassword);
};

exports.signup = async (req, res, next) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(req.body.password, salt);

		const newUser = await User.create({
			username: req.body.username,
			password: password,
			fullName: req.body.fullName,
			email: req.body.email,
		});

		// create token
		const token = signToken(newUser);

		// Removes password from output
		newUser.password = undefined;

		res.status(201).json({
			status: 'Success',
			token,
			data: {
				user: newUser,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: error,
		});
	}
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).select('+password');

	if (!user) {
		return res.status(401).send({
			status: 'Failed',
			message: 'Ingen användare hittad',
		});
	}

	const validPassword = await validatePassword(
		req.body.password,
		user.password
	);

	// If user uis found, but password is wrong
	if (!validPassword)
		return res
			.status(401)
			.json({ status: 'Failed', message: 'Fel användarnamn eller lösenord' });

	// Removes the password from the response
	user.password = undefined;

	const token = signToken(user);

	//Decoding token, to get username and id
	const decoded = jwt_decode(token);

	console.log('Logging in');
	// Om det är rätt

	res.cookie('jwt', token, {
		maxAge: 24 * 60 * 60 * 1000,
		// You can't access these tokens in the client's javascript
		httpOnly: true,
		SameSite: 'strict',
		// Forces to use https in production
		secure: process.env.NODE_ENV === 'production' ? true : false,
	});

	res.status(200).json({
		status: 'Success',
		user: decoded.id,
		data: true,
	});
};

exports.logout = (req, res) => {
	res.clearCookie('jwt');
	console.log('Cookie cleared');
	res.status(200).json({
		status: 'Success',
	});
};

exports.verifyAuth = async (req, res) => {
	console.log(req.authUser);
	const { id } = req.authUser;
	// Is the user logged in with correct token?
	try {
		res.status(200).json({
			status: 'Success',
			user: id,
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: error,
		});
	}
};

exports.refreshToken = async (req, res) => {
	try {
		const { refreshToken } = req.body;
		if (!refreshToken) {
			res.status(401).json({
				status: 'Failed',
			});
		}
		res.status(200).json({
			status: 'Success',
		});
	} catch (error) {
		res.status(400).json({
			status: 'Failed',
			message: error,
		});
	}
};
