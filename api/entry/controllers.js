const transactions = require('../../db/transactions');
const repoVertex = require('../../db/vertex/repo');

const list = (req, res) => {
  try {
    console.log('got list request');
    const data = repoVertex.list();
    res.json(data);
  }
  catch(e) {
    console.log('cant find anything', e);
    res.sendStatus(404);
  }
}

const get = (req, res) => {

}

const create = (req, res) => {
  try {
    console.log('received create request');
    const { body } = req;
    const data = transactions.initializeRepo(body);
    res.json(data);
  }
  catch(e) {
    console.log('cant create', e);
    res.sendStatus(500);
  }
}

const update = (req, res) => {

}

const destroy = (req, res) => {

}

const listBranches = (req, res) => {

}

module.exports = {
  list,
  get,
  create,
  update,
  destroy,
  listBranches,
};
