const Joi = require('@hapi/joi');

module.exports = ({ parts, squaresLastIndex, categoriesLastIndex }) => {
    return Joi.object({
        part: Joi.string().valid(...parts).required(),
        square: Joi.number().integer().min(0).max(squaresLastIndex).required(),
        category: Joi.number().integer().min(0).max(categoriesLastIndex).required()
    })
};
