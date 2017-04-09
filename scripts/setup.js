const db = require('@arangodb').db;
const jsdiff = require('diff');
const {
  BRANCH,
  HEAD,
  COMMIT,
  REPO,
  TREE,
  CONTENT,
} = require('../db/names');

console.log('Starting setup script ...');

[REPO, TREE, CONTENT].forEach(name => {
  console.log('Starting on vertex collection ...', name);
  const collectionName = module.context.collectionName(name);
  if(db._collection(collectionName) === null) {
    db._createDocumentCollection(collectionName);
    console.log('Created vertex collection.');
  }
  else console.log('Edge collection exists. Doing nothing.');
});

[BRANCH, HEAD, COMMIT].forEach(name => {
  console.log('Starting on edge collection ...', name);
  const collectionName = module.context.collectionName(name);
  if(db._collection(collectionName) === null) {
    db._createEdgeCollection(collectionName);
    console.log('Created edge collection.');
  }
  else console.log('Edge collection exists. Doing nothing.');
});

// Seed one representation
const content1 = { value: 'initial text' };
const content2 = { value: 'second text' };
const content3 = { value: 'third text' };

const repoVertex = module.context.collection(REPO);
const treeVertex = module.context.collection(TREE);
const contentVertex = module.context.collection(CONTENT);
const branchEdge = module.context.collection(BRANCH);
const headEdge = module.context.collection(HEAD);
const commitEdge = module.context.collection(COMMIT);

const repo = repoVertex.save({ title: 'Test Title' });
const masterTree = treeVertex.save({ name: 'master' });
const devTree = treeVertex.save({ name: 'dev' });
const contentDoc1 = contentVertex.save(content1);
const contentDoc2 = contentVertex.save(content2);
const contentDoc3 = contentVertex.save(content3);
const commit1 = commitEdge.save({ _from: contentDoc2._id, _to: contentDoc1._id, diff: jsdiff.diffWords(content1.value, content2.value) });
const commit2 = commitEdge.save({ _from: contentDoc3._id, _to: contentDoc2._id, diff: jsdiff.diffWords(content2.value, content3.value) });
const masterHead = headEdge.save({ _from: masterTree._id, _to: contentDoc3._id });
const devHead = headEdge.save({ _from: devTree._id, _to: contentDoc2._id });
const masterBranch = branchEdge.save({ _from: repo._id, _to: masterTree._id, isDefault: true });
const devBranch = branchEdge.save({ _from: repo._id, _to: masterTree._id });

console.log('Setup script completed!');