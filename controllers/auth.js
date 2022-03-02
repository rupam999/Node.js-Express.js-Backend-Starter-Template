const moment = require('moment');
const { v4 } = require('uuid');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const dotenv = require('dotenv');

dotenv.config();

const connection = require('../DB');
const utils = require('../utils/utilities');

const signUp = async (req, res) => {
	const { firstName, lastName, email, password, type } = req.body;
	const ID = v4();
	const date = utils.changeDateFormat(moment());
	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) res.status(500);
		const createUserSql = `INSERT INTO users(uid, first_name, last_name, email, password, type, date) VALUES('${ID}','${firstName}', '${lastName}', '${email}', '${hash}', '${type}', '${date}');`;
		connection.query(createUserSql, (err) => {
			if (err) {
				res.status(500);
			} else {
				res.send({
					error: 0,
					msg: 'User Created Successfully!',
					uid: ID,
					type,
					email,
					name: `${firstName} ${lastName}`,
				});
			}
		});
	});
};

const login = (req, res) => {
	const { phone, password } = req.body;
	const sql = `SELECT * from users WHERE phone='${phone}';`;
	connection.query(sql, (err, emailResult) => {
		if (err) {
			res.status(500);
		} else if (emailResult.length) {
			bcrypt.compare(password, emailResult[0].password, (error, result) => {
				if (error) {
					res.status(500);
				} else if (result === true) {
					res.send({
						uid: emailResult[0].id,
						name: emailResult[0].name,
						phone: emailResult[0].phone,
						type: emailResult[0].type,
					});
				} else {
					res.send({
						error: 1,
						msg: 'Wrong Information',
					});
				}
			});
		} else {
			res.send({
				error: 1,
				msg: 'Wrong Information',
			});
		}
	});
};

module.exports = {
	signUp,
	login,
};
