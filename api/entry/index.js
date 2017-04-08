const createRouter = require('@arangodb/foxx/router');
const controllers = require('./controllers');
const schemas = require('./schemas');
const router = createRouter();

router.get('/', controllers.list)
.summary('List Entries')
.description('Retrieves a list of entries');

router.post('/', controllers.create)
.body(schemas.entry, 'JSON note entry')
.summary('Create Entry')
.description('Creates a entry');

router.get('/:id', controllers.get)
.pathParam('id', schemas.id)
.summary('Get an Entry')
.description('Retrieves an entry by id');

router.patch('/:id', controllers.update)
.pathParam('id', schemas.id)
.body(schemas.update, 'JSON entry update')
.summary('Update an Entry')
.description('Updates an entry by id');

router.put('/:id', controllers.update)
.pathParam('id', schemas.id)
.body(schemas.update, 'JSON entry update')
.summary('Update an Entry')
.description('Updates an entry by id');

router.delete('/:id', controllers.destroy)
.pathParam('id', schemas.id)
.summary('Delete a Entry')
.description('Deletes an entry by id');

module.exports = router;