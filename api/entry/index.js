const createRouter = require('@arangodb/foxx/router');
const controllers = require('./controllers');
const schemas = require('./schemas');
const router = createRouter();

router.tag('entry');

router.get('/', controllers.list)
.response(200, schemas.list)
.summary('List Entries')
.description('Retrieves a list of entries');

router.post('/', controllers.create)
.body(schemas.entry, ["application/json"], 'JSON note entry')
.summary('Create Entry')
.description('Creates a entry');

router.get('/:id', controllers.get)
.pathParam('id', schemas.id)
.summary('Get an Entry')
.description('Retrieves an entry by id');

router.patch('/:id', controllers.update)
.pathParam('id', schemas.id)
.body(schemas.update, ["application/json"], 'JSON entry update')
.summary('Update an Entry')
.description('Updates an entry by id');

router.put('/:id', controllers.update)
.pathParam('id', schemas.id)
.body(schemas.update, ["application/json"], 'JSON entry update')
.summary('Update an Entry')
.description('Updates an entry by id');

router.delete('/:id', controllers.destroy)
.pathParam('id', schemas.id)
.summary('Delete a Entry')
.description('Deletes an entry by id');

router.get('/:id/branches', controllers.listBranches)
.pathParam('id', schemas.id, 'Id of Entry')
.response(200, schemas.list)
.summary('List Branches of an Entry')
.description('List all branches of an entry');

module.exports = router;