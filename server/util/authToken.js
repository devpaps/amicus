const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
// middleware to validate token
const verifyToken = (req, res, next) => {
	// check if token is undefined
	if (!req.headers.cookie) {
		return res.status(401).json({
			status: 'Failed',
			message: 'Du måste logga in för att se denna sida',
		});
	}

	let token;
	const rawCookies = req.headers.cookie.split('; ');
	const parsedCookies = {};
	rawCookies.forEach((rawCookie) => {
		const parsedCookie = rawCookie.split('=');
		if (parsedCookie.includes('jwt')) {
			parsedCookies[parsedCookie[0]] = parsedCookie[1];

			[parsedCookie[0]] = parsedCookie[1];

			return parsedCookie;
		}
	});
	token = parsedCookies.jwt;
	var decoded = jwt_decode(token);
	if (!token)
		return res.status(401).json({
			status: 'Failed',
			message: 'Du måste logga in för att se denna sida',
		});
	try {
		const verified = jwt.verify(
			token,
			process.env.TOKEN_SECRET,
			// If there is something wrong with the token, expired or someone has change the JWT token for example
			function (err) {
				if (err) {
					return res.status(400).json({
						status: 'Failed',
						message: err.name,
					});
				}
			}
		);
		// If it's all good
		req.user = verified;
		req.authUser = decoded;

		next();
		//res.status(200).json({
		//status: 'Success',
		//data: true,
		//}); // continue
	} catch (error) {
		res.status(400).json({ status: 'Failed', message: false });
	}
};

module.exports = verifyToken;
