const AllNews = require('../controllers/news');

module.exports = (router) => {
	router.get('/news/fundraise', AllNews.getRequest);
};
