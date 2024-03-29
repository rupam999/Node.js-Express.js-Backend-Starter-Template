const mongoose = require('mongoose');

const subscriberSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = {
	Subscriber,
};
