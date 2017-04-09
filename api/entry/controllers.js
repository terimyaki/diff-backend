const transactions = require('../../db/transactions');
const repoVertex = require('../../db/vertex/repo');

const list = (req, res) => {
  try {
    console.log('got list request');
    const data = repoVertex.list();
    return res.json(data);
  }
  catch(e) {
    console.log('cant find anything', e);
    return res.sendStatus(404);
  }
}

const get = (req, res) => {
  res.sendStatus(200);
}

const create = (req, res) => {
  try {
    console.log('received create request');
    const { body } = req;
    const data = transactions.initializeRepo(body);
    return res.json(data);
  }
  catch(e) {
    console.log('cant create', e);
    return res.sendStatus(500);
  }
}

const update = (req, res) => {
  res.sendStatus(200);
}

const destroy = (req, res) => {
  res.sendStatus(200);
}

const listBranches = (req, res) => {
  res.sendStatus(200);
}

module.exports = {
  list,
  get,
  create,
  update,
  destroy,
  listBranches,
};
