module.exports = async (ctx, next) => {
    const { id } = ctx.state.user;
    const { body } = ctx.request;

    console.log(ctx.state.user)
  
    body.owner = id.toString();
  
    await next();
  };