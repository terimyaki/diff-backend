const db = require('@arangodb').db;
const graph = require("@arangodb/general-graph");
const jsdiff = require('diff');
const names = require('../db/names');

console.log('Starting setup script ...');
const {
  REPO, 
  TREE, 
  CONTENT,
  BRANCH, 
  HEAD, 
  COMMIT
} = Object.keys(names).reduce((accum, key) => {
  accum[key] = module.context.collectionName(names[key]);
  return accum;
})
[REPO, TREE, CONTENT].forEach(name => {
  console.log('Starting on vertex collection ...', name);
  if(db._collection(name) === null) {
    db._createDocumentCollection(name);
    console.log('Created vertex collection.');
  }
  else console.log('Edge collection exists. Doing nothing.');
});

[BRANCH, HEAD, COMMIT].forEach(name => {
  console.log('Starting on edge collection ...', name);
  if(db._collection(name) === null) {
    db._createEdgeCollection(name);
    console.log('Created edge collection.');
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

// Testing graph creation
const relation = graph._relation(COMMIT, CONTENT, CONTENT);
const edgeDefinitions = graph._extendEdgeDefinitions(relation);
const commitGraph = graph._create('commitGraph', edgeDefinitions);
console.log('created graph', commitGraph);

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