const db = require('@arangodb').db;
const { REPO } = require('../names');

const list = () => db[REPO].all().toArray();

const create = entry => db[REPO].insert(entry);

module.exports = {
  list,
  create,
};
