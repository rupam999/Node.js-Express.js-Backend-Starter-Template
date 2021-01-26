const DummyQuery = require('../controllers/dummy');

module.exports = (router) => {
    router.get('/dummy', DummyQuery.getRequest);
}