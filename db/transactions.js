const db = require('@arangodb').db;
const names = require('./names');
const {
  REPO, 
  TREE,
  CONTENT,
  BRANCH,
  HEAD,
  COMMIT,
} = Object.keys(names).reduce((accum, key) => { 
  accum[key] = module.context.collectionName(names[key]);
  return accum;
}, {});

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
    action: () => {
      const repo = db[REPO].save({ title });
      const tree = db[TREE].save({ name: 'master' });
      const contentDoc = db[CONTENT].save({ value: content }, { returnNew: true });
      const branch = db[BRANCH].save({ _from: repo._id, _to: tree._id, isDefault: true });
      const head = db[HEAD].save({ _from: tree._id, _to: contentDoc._id });
      return repo;
    }
  });
}

const updateRepo = (branchId, content) => {
  return db._executeTransaction({
    collections: {
      read: [
        BRANCH,
        HEAD,
        CONTENT,
      ],
      write: [
        CONTENT,
        COMMIT,
        HEAD,
      ]
    },
    action: () => {

    }
  });
}

module.exports = {
  initializeRepo,
  updateRepo,
};
