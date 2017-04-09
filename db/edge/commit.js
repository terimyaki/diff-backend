const db = require('@arangodb').db;
const { COMMIT } = require('../names');
const collectionName = module.context.collectionName(COMMIT);
const commitEdge = db._collection(collectionName);

const get = _id => commitEdge.document({ _id });

module.exports = {
  get,
};
