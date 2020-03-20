const Joi = require("@hapi/joi");

module.exports = ({
  partsLastIndex,
  squaresLastIndex,
  categoriesLastIndex
}) => {
  return Joi.object({
    part: Joi.number()
      .integer()
      .min(0)
      .max(partsLastIndex)
      .required(),
    square: Joi.number()
      .integer()
      .min(0)
      .max(squaresLastIndex)
      .required(),
    category: Joi.number()
      .integer()
      .min(0)
      .max(categoriesLastIndex)
      .required(),
    count: Joi.number()
      .integer()
      .min(0)
      .required()
  });
};
