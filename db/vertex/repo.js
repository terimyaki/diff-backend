const db = require('@arangodb').db;
const { REPO } = require('../names');
const collectionName = module.context.collectionName(REPO);
const repoVertex = db._collection(collectionName);

const list = () => repoVertex.all().toArray();
const create = entry => repoVertex.insert(entry);

module.exports = {
  list,
  create,
};
