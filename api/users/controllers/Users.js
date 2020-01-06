"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  updateMe: async ctx => {
    const { id } = ctx.state.user;
    const newUser = await strapi.plugins["users-permissions"].services.user.edit({ id }, ctx.request.body);
    ctx.send(newUser);
  }
};
