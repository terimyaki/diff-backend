const { REPO } = require('../names');
const getDbState = name => name ? require('@arangodb').db[name] : require('@arangodb').db;
const list = () => getDb(REPO).all().toArray();
const create = entry => getDb(REPO).save(entry);

module.exports = {
  list,
  create,
};
