const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));

module.exports = async (ctx, next) => {
    const { squares, classes, parts } = strapi.config.params;
    const squaresLastIndex = squares.length - 1;
    const classesLastIndex = classes.length - 1;

    const itemSchema = Joi.object({
        value: Joi.string().valid(...parts).required(),
        square: Joi.number().integer().min(0).max(squaresLastIndex).required(),
        complicated: Joi.boolean().required()
    })

    const schema = Joi.object({
        vin: Joi.string().required(),
        make: Joi.string().required(),
        model: Joi.string().required(),
        carNumber: Joi.string(),
        clientName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        createdDate: Joi.date().format('YYYY-MM-DD').required(),
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
