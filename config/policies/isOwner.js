module.exports = async (ctx, next) => {
  const { role, id } = ctx.state.user;

  const fieldId = ctx.params._id;

  if (typeof fieldId !== "undefined")
    Client.findOne({ _id: fieldId, owner: id }).then(result => {
      if (!result && role.type !== "administrator")
        return ctx.unauthorized("You are not allowed to perform this action.");
    });

  await next();
}