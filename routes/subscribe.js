const SUB = require('../controllers/suscribe');

module.exports = (router) => {
	router.post('/subscribe', SUB.subscribe);
};
