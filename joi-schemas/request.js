const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

const getOrderSchema = ({ classesLastIndex, itemSchema }) => {
  return Joi.object({
    make: Joi.string().optional(),
    model: Joi.string()
      .allow("")
      .optional(),
    carNumber: Joi.string()
      .allow("")
      .optional(),
    clientName: Joi.string().optional(),
    phoneNumber: Joi.string().optional(),
    date: Joi.date()
      .timestamp()
      .required(),
    classIndex: Joi.number()
      .integer()
      .min(0)
      .max(classesLastIndex)
      .required(),
    items: Joi.array()
      .items(itemSchema)
      .min(1)
      .required(),
    price: Joi.number().required()
  });
};

module.exports.getCreateOrderSchema = getOrderSchema;

module.exports.getUpdateOrderSchema = ({ classesLastIndex, itemSchema }) => {
  const schema = getOrderSchema({ classesLastIndex, itemSchema });
  return schema.fork([...schema._ids._byKey.keys()], field => field.optional());
};
