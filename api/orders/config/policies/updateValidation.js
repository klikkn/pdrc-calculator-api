const getPartSchema = require('../../../../joi-schemas/part')
const { getUpdateOrderSchema } = require('../../../../joi-schemas/request')

module.exports = async (ctx, next) => {
    const { squares, classes, parts, categories } = strapi.config.params;

    const squaresLastIndex = squares.length - 1;
    const classesLastIndex = classes.length - 1;

    const itemSchema = getPartSchema({ parts, squaresLastIndex, categories })
    const requestSchema = getUpdateOrderSchema({ classesLastIndex, itemSchema })

    try {
        await requestSchema.validateAsync(ctx.request.body);
        await next();
    }
    catch (err) {
        if (err.isJoi) return ctx.response.badRequest(err.details.map(e => e.message))
        return ctx.throw();
    }
};