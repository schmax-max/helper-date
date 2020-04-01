const Joi = require('@hapi/joi');
exports.body = Joi.object({
  source_url: Joi.string().required(), 
  source_type: Joi.string().required(), 
  links: Joi.array().required(), 
  extras: Joi.array(),
})