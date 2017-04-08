'use strict';
const createGraphqlRouter = require('@arangodb/foxx/graphql'); // TODO: Look into adding GraphQL queries and mutations
const createRouter = require('@arangodb/foxx/router');
const app = createRouter();

app.get('/', (req, res) => res.status(200).send('Everything is good'));
app.use('*', (req, res) => res.sendStatus(500));

module.context.use('/api/tree', require('./api/tree'));
module.context.use('/api/entry', require('./api/entry'));
module.context.use('/api/commit', require('./api/commit'));
module.context.use(app);