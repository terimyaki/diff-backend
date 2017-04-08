const joi = require('joi');

const id = joi.string().required();
const update = joi.object().required();
const entry = joi.object().required();

module.exports = {
  id,
  update,
  entry,
};
