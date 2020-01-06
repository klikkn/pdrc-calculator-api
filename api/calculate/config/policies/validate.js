const Joi = require('@hapi/joi')
const getPartSchema = require('../../../../joi-schemas/part')

module.exports = async (ctx, next) => {
    const { squares, classes, parts } = strapi.config.params;

    const squaresLastIndex = squares.length - 1;
    const classesLastIndex = classes.length - 1;

    const itemSchema = getPartSchema({ parts, squaresLastIndex });
    const schema = Joi.object({
        classIndex: Joi.number().integer().min(0).max(classesLastIndex).required(),
        items: Joi.array().items(itemSchema).min(1).required()
    })

    try {
        await schema.validateAsync(ctx.request.body);
        await next();
    }
    catch (err) {
        if (err.isJoi) return ctx.response.badRequest(err.details.map(e => e.message))
        return ctx.throw();
    }
};
