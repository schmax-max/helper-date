const Joi = require('@hapi/joi');
exports.params = Joi.object({
  type: Joi.string()
})

// .valid('publishers', 'slugs', 'curators', 'photos')