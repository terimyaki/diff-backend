const jsdiff = require('diff');
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

const updateRepo = (treeId, content) => {
  return db._executeTransaction({
    collections: {
      write: [
        CONTENT,
        COMMIT,
        HEAD,
      ]
    },
    action: () => {
      const headOld = db[HEAD].inEdges(treeId)[0];
      const contentOld = db[CONTENT].document({ _id: headOld._to });
      const contentNew = db[CONTENT].save({ value: content }, { returnNew: true });
      const commit = db[COMMIT].save({ _from: contentOld._id, _to: contentNew._id, diff: jsdiff.diffWords(contentOld.value, contentNew.value)});
      const head = db[HEAD].update(headOld._id, { _to: contentNew._id });
      return contentNew;
    }
  });
}

const createBranch = (repoId, treeId, name) => {
  return db._executeTransaction({
    collections: {
      write: [
        BRANCH,
        TREE,
        HEAD,
      ]
    },
    action: () => {
      const tree = db[TREE].save({ name });
      const branch = db[BRANCH].save({ _from: repoId, _to: tree._id });
      const headOld = db[HEAD].inEdges(treeId)[0];
      const headNew = db[HEAD].save({ _from: tree._id, _to: headOld._to });
      return branch;
    }
  });
}

const createFork = (repoId) => {
  return db._executeTransaction({
    collections: {
      write: [
        REPO,
        BRANCH,
      ]
    },
    action: () => {
      const branchesOld = db[BRANCH].inEdges(repoId);
      const repoOld = db[REPO].document({ _id: repoId });
      const repo = db[REPO].save({ title: repoOld.title });
      branchesOld.forEach(branchDoc => db[BRANCH].save({ _from: repo._id, _to: branchDoc._id }));
      return repo;
    }
  });
}

module.exports = {
  initializeRepo,
  updateRepo,
};
