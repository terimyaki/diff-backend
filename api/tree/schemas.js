const joi = require('joi');

const id = joi.string().required();

module.exports = {
  id,
};
