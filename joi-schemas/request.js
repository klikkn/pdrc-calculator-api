const Joi = require('@hapi/joi')
  .extend(require('@hapi/joi-date'));

const getRequestSchema = ({ classesLastIndex, itemSchema }) => {
  return Joi.object({
    vin: Joi.string().required(),
    make: Joi.string().required(),
    model: Joi.string(),
    carNumber: Joi.string(),
    clientName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    createdDate: Joi.date().format('YYYY-MM-DD').required(),
    classIndex: Joi.number().integer().min(0).max(classesLastIndex).required(),
    items: Joi.array().items(itemSchema).min(1).required()
  })
};

module.exports.getCreateRequestSchema = getRequestSchema;

module.exports.getUpdateRequestSchema = ({ classesLastIndex, itemSchema }) => {
  const schema = getRequestSchema({ classesLastIndex, itemSchema });
  return schema.fork([...schema._ids._byKey.keys()], field => field.optional())
}