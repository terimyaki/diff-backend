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

[BRANCH, HEAD, COMMIT].forEach(name => {
  console.log('Starting on edge collection ...', name);
  const collection = module.context.collectionName(name);
  if(db._collection(collection) === null) {
    db._createEdgeCollection(collection);
    console.log('Created edge collection.');
  }
  else console.log('Edge collection exists. Doing nothing.');
});

[REPO, TREE, CONTENT].forEach(name => {
  console.log('Starting on vertex collection ...', name);
  const collection = module.context.collectionName(name);
  if(db._collection(collection) === null) {
    db._createDocumentCollection(collection);
    console.log('Created vertex collection.');
  }
  else console.log('Edge collection exists. Doing nothing.');
});

// Seed one representation
const content1 = { value: 'initial text' };
const content2 = { value: 'second text' };
const content3 = { value: 'third text' };

const repoVertex = db._collection(REPO);
const treeVertex = db._collection(TREE);
const contentVertex = db._collection(CONTENT);
const branchEdge = db._collection(BRANCH);
const headEdge = db._collection(HEAD);
const commitEdge = db._collection(COMMIT);

const repo = repoVertex.save({ title: 'Test Title' });
const masterTree = treeVertex.save({ name: 'master', isMaster: true });
const devTree = treeVertex.save({ name: 'dev' });
const contentDoc1 = contentVertex.save(content1);
const contentDoc2 = contentVertex.save(content2);
const contentDoc3 = contentVertex.save(content3);
console.log('this is the docs', repo, masterTree, devTree);
console.log('this is the content', contentDoc1, contentDoc2, contentDoc3);

console.log('Setup script completed!');