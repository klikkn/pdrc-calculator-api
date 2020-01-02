'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    updateMe: async ctx => {
        const { id } = ctx.state.user
        const { username, email, password, prices } = ctx.request.body;

        const data = { username, email, password };

        if (prices) {
            const { categories, squares, classes } = strapi.config.params;
            const categoriesLen = categories.length;
            const squaresLen = squares.length;
            const classesLen = classes.length;

            if (prices.length !== categoriesLen) throw new Error('Prices count validation error');

            prices.forEach((_, i) => {
                if (prices[i].length !== squaresLen) throw new Error('Prices rows validation error');

                prices[i].forEach((_, j) => {
                    if (prices[i][j].length !== classesLen) throw new Error('Prices columns validation error');
                })
            })

            data.prices = prices;
        }

        const newUser = await strapi.plugins['users-permissions'].services.user.edit({ id }, data)
        ctx.send(newUser);
    },
};
