const db = require('@arangodb').db;
const { REPO } = require('../names');
const repoVertex = db._collection(REPO);

const list = () => repoVertex.all().toArray();
const create = entry => repoVertex.insert(entry);

module.exports = {
  list,
  create,
};
