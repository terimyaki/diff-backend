const commitEdge = require('../../db/edge/commit');

const get = (req, res) => {
  try {
    const { id } = req.params;
    const data = commitEdge.get(id);
    return res.json(data);
  }
  catch(e){
    console.error('Couldnt find commit', e);
    return res.sendStatus(404);
  }
}

module.exports = {
  get,
};
