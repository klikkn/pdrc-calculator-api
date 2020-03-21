"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  index: async ctx => {
    const { prices } = ctx.state.user;
    const { classIndex, items } = ctx.request.body;

    const price = items.reduce((acc, item) => {
      let priceTable = prices[item.category];
      return (acc += priceTable[classIndex][item.square] * item.count);
    }, 0);

    ctx.send({ price });
  }
};
