const { pass, error } = require("../utils/apiHelper");

exports.index = async function() {
  const ctx = this;
  const ret = await ctx.service.locationService.query(ctx.request.query);
  ctx.body = pass(ret);
};
