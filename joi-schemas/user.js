const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

module.exports = ({ categories, squares, classes }) => {
  const priceRowSchema = Joi.array()
    .items(Joi.number())
    .length(classes.length);

  const priceCategorySchema = Joi.array()
    .items(priceRowSchema)
    .length(squares.length);

  return Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    prices: Joi.array()
      .items(priceCategorySchema)
      .length(categories.length)
  });
};
