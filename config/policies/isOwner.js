module.exports = async (ctx, next) => {
  const { id, role } = ctx.state.user;

  if (role !== "administrator") {
    ctx.query = {
      ...ctx.query,
      owner: id
    };
  }

  await next();

  if (ctx.params.id) {
    let owner = ctx.response.body.get("owner");
    if (owner !== id && role !== "administrator") {
      return ctx.unauthorized("You are not allowed to perform this action.");
    }
  }
};
