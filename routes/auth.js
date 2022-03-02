const Auth = require('../controllers/auth');

module.exports = (router) => {
	router.post('/user/register', Auth.signUp);
	router.post('/user/login', Auth.login);
};
