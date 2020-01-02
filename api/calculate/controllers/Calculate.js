'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    index: async ctx => {
        const { prices } = ctx.state.user;
        const { classIndex, selected, complicated, squares } = ctx.request.body;

        const result = selected.reduce((acc, curr) => {
            const selectedSquare = squares[curr];

            console.log(1, selectedSquare)
            if (selectedSquare === undefined) return acc += 0;

            const priceTable = curr != 'roof' ? complicated[curr] ? prices[1] : prices[0] : prices[2];
            return acc += priceTable[classIndex][selectedSquare];
        }, 0)

        ctx.send({ result });
    },
};
