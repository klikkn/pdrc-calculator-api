const Joi = require('@hapi/joi');

module.exports = ({ parts, squaresLastIndex }) => {
    return Joi.object({
        value: Joi.string().valid(...parts).required(),
        square: Joi.number().integer().min(0).max(squaresLastIndex).required(),
        complicated: Joi.boolean().required()
    })
};
