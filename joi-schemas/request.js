const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

const getOrderSchema = ({ classesLastIndex, itemSchema }) => {
  return Joi.object({
    make: Joi.string().allow("").required(),
    model: Joi.string()
      .allow("")
      .required(),
    carNumber: Joi.string()
      .allow("")
      .required(),
    client: Joi.string().allow("").required(),
    phone: Joi.string().allow("").required(),
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
