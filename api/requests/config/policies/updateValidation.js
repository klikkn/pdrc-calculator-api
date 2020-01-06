const getPartSchema = require('../../../../joi-schemas/part')
const { getUpdateRequestSchema } = require('../../../../joi-schemas/request')

module.exports = async (ctx, next) => {
    const { squares, classes, parts } = strapi.config.params;

    const squaresLastIndex = squares.length - 1;
    const classesLastIndex = classes.length - 1;

    const itemSchema = getPartSchema({ parts, squaresLastIndex })
    const requestSchema = getUpdateRequestSchema({ classesLastIndex, itemSchema })

    try {
        await requestSchema.validateAsync(ctx.request.body);
        await next();
    }
    catch (err) {
        //TODO: Should be removed, but I don't know why it happens
        if (err.message === 'ctx.response.body.get is not a function') return;
        if (err.isJoi) return ctx.response.badRequest(err.details.map(e => e.message))
        return ctx.throw();
    }
};