const createRouter = require('@arangodb/foxx/router');
const controllers = require('./controllers');
const schemas = require('./schemas');

const router = createRouter();

router.tag('commit');

router.get('/:id', controllers.get)
.pathParam('id', schemas.id)
.summary('Get A Commit')
.description('Gets a commit by id');

module.exports = router;