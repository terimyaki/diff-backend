const db = require('@arangodb').db;
const namesDict = require('../db/names');

console.log('Starting setup script ...');

Object.keys(namesDict).forEach(name => {
  console.log('Starting on collection ...', namesDict[name]);
  const collection = module.context.collectionName(namesDict[name]);
  if(db._collection(collection) === null) {
    db._create(collection);
    console.log('Created collection.');
  }
  else console.log('Collection exists. Doing nothing.');
});

console.log('Setup script completed!');