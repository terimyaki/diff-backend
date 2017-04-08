const joi = require('joi');
const createRouter = require('@arangodb/foxx/router');
const controllers = require('./controllers');

const router = createRouter();

router.get('/', controllers.list)
.description('Gets all commits');

router.get('/:id', controllers.get)
.pathParam('id', joi.string().required())
.description('Gets a commit by id');

module.exports = router;