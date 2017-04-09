const db = require('@arangodb').db;
const { COMMIT } = require('../names');
const commitEdge = db._collection(COMMIT);

const get = _id => commitEdge.document({ _id });

module.exports = {
  get,
};
