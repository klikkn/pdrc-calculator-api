const getUserSchema = require('../../../../joi-schemas/user')

module.exports = async (ctx, next) => {
    const { categories, squares, classes } = strapi.config.params;
    const userSchema = getUserSchema({ categories, squares, classes })

    try {
        await userSchema.validateAsync(ctx.request.body);
        await next();
    }
    catch (err) {
        if (err.isJoi) return ctx.response.badRequest(err.details.map(e => e.message))
        return ctx.throw();
    }
};