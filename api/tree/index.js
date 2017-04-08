const createRouter = require('@arangodb/foxx/router');
const controllers = require('./controllers');
const schemas = require('./schemas');
const router = createRouter();

router.tag('tree');

router.get('/:id', controllers.get)
.pathParam('id', schemas.id)
.summary('Get Branch')
.description('Retrieves a branch by id');

router.get('/:id/commits', controllers.listCommits)
.pathParam('id', schemas.id, 'Id of Branch')
.summary('List commits of branch')
.description('Retrieves all commits for a branch');

module.exports = router;