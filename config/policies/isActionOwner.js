module.exports = async (ctx, next) => {
  try {
    const { id, role } = ctx.state.user;
    const { url } = ctx.request;

    const isAdministrator = role === 'administrator';
    const resourceName = url.match(/([^\/]+[^\/])/gm)[0];
    const resourceId = ctx.params.id;

    const item = await strapi.query(resourceName).findOne({ id: resourceId })

    if (item && item.owner.id !== id && !isAdministrator)
      return ctx.unauthorized('You are not allowed to perform this action! (You are not the Owner)');

    await next();
  } catch (err) {
    ctx.throw(error);
  }
};