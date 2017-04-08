const createRouter = require('@arangodb/foxx/router');
const controllers = require('./controllers');
const schemas = require('./schemas');
const router = createRouter();

router.get('/', controllers.list)
.summary('List Notes')
.description('Retrieves a list of notes');

router.post('/', controllers.create)
.body(schemas.entry, 'JSON note entry')
.summary('Create Note')
.description('Creates a note');

router.get('/:id', controllers.get)
.pathParam('id', schemas.id)
.summary('Get a Note')
.description('Retrieves a note by id');

router.patch('/:id', controllers.update)
.pathParam('id', schemas.id)
.body(schemas.update, 'JSON note update')
.summary('Update a Note')
.description('Updates a note by id');

router.put('/:id', controllers.update)
.pathParam('id', schemas.id)
.body(schemas.update, 'JSON note update')
.summary('Update a Note')
.description('Updates a note by id');

router.delete('/:id', controllers.destroy)
.pathParam('id', schemas.id)
.summary('Delete a Note')
.description('Deletes a note by id');

module.exports = router;