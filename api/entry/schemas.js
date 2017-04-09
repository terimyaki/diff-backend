const joi = require('joi');

const id = joi.string().required();
const update = joi.string().required();
const entry = joi.object().keys({
  title: joi.string().required(),
  content: joi.string().required()
}).required();
const list = joi.array().required();

module.exports = {
  id,
  update,
  entry,
  list,
};
