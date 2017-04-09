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
  db._executeTransaction({
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
      const thisDb = require('@arangodb').db;
      const repo = thisDb[REPO].insert({ title });
      const tree = thisDb[TREE].save({ name: 'master', isMaster: true });
      const content = thisDb[CONTENT].save({ value: content });
      console.log('this is the repo', repo);
      console.log('this is the tree', tree);
      console.log('this is the content', content);
    }
  });
}

module.exports = {
  initializeRepo,
};
