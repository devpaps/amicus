const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const petRouter = require('./routes/petRoutes');
const userRouter = require('./routes/userRoutes');
const forumRouter = require('./routes/forumRoutes');
const postRouter = require('./routes/postRoutes');
const categoriesRouter = require('./routes/categoriesRoutes');
const verifyRouter = require('./routes/verifyRoutes');
const refreshTokenRouter = require('./routes/refreshTokenRoutes');

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Middleware, to use req.body.
app.use(express.json());

app.use(express.static(`${__dirname}/dist`));

/* app.use((req, res, next) => {
	console.log(req.headers);
}); */

// Routes, mount
// Endpoints
app.use('/api/v1/pets', petRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/forum', forumRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/verifyAuth', verifyRouter);
app.use('/api/v1/refreshToken', refreshTokenRouter);

module.exports = app;
