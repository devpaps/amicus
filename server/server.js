const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: `${__dirname}/../config.env` });

const app = require('./app');

/* mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    const online = res.connections;
    console.log(online);
  }); */

const db = async () => {
	try {
		await mongoose.connect(process.env.DATABASE, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
	} catch (error) {
		console.log(error);
	}
};

mongoose.connection.on('connected', () => {
	console.log('Connection Established to MongoDB');
});

db();

const port = process.env.PORT || 5000;

//Server
app.listen(port, () => {
	console.log(`Lyssnar på port https://localhost:${port}`);
});
