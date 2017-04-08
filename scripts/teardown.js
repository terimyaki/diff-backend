const db = require('@arangodb').db;
const namesDict = require('../db/names');

console.log('Starting teardown script ...');

Object.keys(namesDict).forEach(name => {
  console.log('Starting on collection ...', namesDict[name]);
  const collection = module.context.collectionName(namesDict[name]);
  if(collection) {
    collection.drop();
    console.log('Dropped collection.');
  }
  else console.log('Collection does not exist. Doing nothing.');
});

console.log('Teardown script completed!');