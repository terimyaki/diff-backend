const joi = require('joi');
const createRouter = require('@arangodb/foxx/router');
const controllers = require('./controllers');

const router = createRouter();

router.tag('commits');

router.get('/', controllers.list)
.summary('List Commits')
.description('Gets all commits');

router.get('/:id', controllers.get)
.pathParam('id', joi.string().required())
.summary('Get A Commit')
.description('Gets a commit by id');

module.exports = router;