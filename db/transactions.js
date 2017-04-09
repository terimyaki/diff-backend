const db = require('@arangodb').db;
const { 
  REPO,
  TREE,
  CONTENT,
  BRANCH,
  HEAD
} = require('./names');
const repoVertex = require('./vertex/repo');

const initializeRepo = ({ title, content }) => {
  return db._executeTransaction({
    collections: {
      write: [
        REPO,
        TREE,
        CONTENT,
        BRANCH,
        HEAD,
      ]
    },
    action: function() {
      console.log('performing action...');
      const thisDb = require('@arangodb').db;
      const repo = thisDb[REPO].save({ title }, { returnNew: true });
      const tree = thisDb[TREE].save({ name: 'master' }, { returnNew: true });
      const content = thisDb[CONTENT].save({ value: content }, { returnNew: true });
      const branch = thisDb[BRANCH].save({ _from: repo._id, _to: tree.__id, isMaster: true });
      const head = thisDb[HEAD].save({ _from: tree._id, _to: content._id });
      return content;
    }
  });
}

module.exports = {
  initializeRepo,
};
