module.exports = async (ctx, next) => {
  ctx.request.body = { ...ctx.request.body, is_deleted: false };
  await next();
};
