const mongoose = require('mongoose');

const connectDB = async () => {
	// console.log(process.env);
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			// useCreateIndex: true,
		});

		console.log(`Connection Establish ${conn.connection.host}`);
	} catch (error) {
		console.log('Error in connection ', error);
	}
};

module.exports = {
	connectDB,
};
