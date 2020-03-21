module.exports = async (ctx, next) => {
  try {
    ctx.query = { ...ctx.query, is_deleted: false };
    await next();
  } catch (err) {
    console.log(err);
  }
};
