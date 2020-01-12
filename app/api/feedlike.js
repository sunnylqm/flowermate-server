const { pass, error } = require('../utils/apiHelper');

exports.create = async function() {
  const ctx = this;
  const { action, feedId } = ctx.request.body;
  const userId = ctx.accessToken.id;
  try {
    if (action === 'like') {
      const ret = await ctx.model.FeedLike.create({
        userId,
        feedId,
      });
      ctx.body = pass(ret);
    } else {
      const feedLike = await ctx.model.FeedLike.findOne({
        where: {
          userId,
          feedId,
        },
      });
      if (feedLike) {
        await feedLike.destroy({ force: true });
        ctx.body = pass();
      } else {
        ctx.body = error();
      }
    }
  } catch (e) {
    ctx.body = error();
  }
};
