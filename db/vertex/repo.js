const { REPO } = require('../names');
const getDb = name => name ? require('@arangodb').db[name] : require('@arangodb').db;
const list = () => getDb(REPO).all().toArray();
const create = entry => getDb(REPO).save(entry);

module.exports = {
  list,
  create,
};
