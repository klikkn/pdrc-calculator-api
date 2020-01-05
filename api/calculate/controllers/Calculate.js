"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  index: async ctx => {
    const { prices } = ctx.state.user;
    const { classIndex, items } = ctx.request.body;

    const result = items
      .reduce((acc, item) => {
        const priceTable = item.value !== "roof" ? (item.complicated ? prices[1] : prices[0]) : prices[2];
        return (acc += priceTable[classIndex][item.square]);
      }, 0);

    ctx.send({ result });
  }
};
