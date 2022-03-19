const SUBSCRIBER_MODEL = require('../models/subscriber');
const sgMail = require('@sendgrid/mail');

const subscribe = async (req, res) => {
	const { email } = req.body;

	const subscriber = new SUBSCRIBER_MODEL.Subscriber({
		email,
	});

	try {
		await subscriber.save(async (err, response) => {
			if (err) {
				console.log(err);
				res.json({
					message: 'User Exists',
				});
			} else {
				// Mail Sent starts here
				sgMail.setApiKey(process.env.SENDGRID_API_KEY);

				const content = {
					to: email,
					from: 'apploys2020@gmail.com',
					subject: `Welcome to Apployss`,
					text: 'message',
					html: `
                        <h4>Hi ${email},</h4>
                        <p>Welcome to Apployss family!!!</p>
                        <p><a href='https://www.apployss.com'>Click here</a> to visit Apployss.</p>
                    `,
				};

				try {
					await sgMail.send(content);
					res.status(200);
					res.json({
						message: 'success',
					});
				} catch (error) {
					console.log('ERROR', error);
					res.status(400).send('Message not sent.');
				}
			}
		});
	} catch (error) {
		res.status(400).send('error');
	}
};

module.exports = {
	subscribe,
};
