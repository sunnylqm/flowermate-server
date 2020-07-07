const { pass, error } = require('../utils/apiHelper');
const _ = require('lodash');

exports.index = async function () {
  const ctx = this;
  const { offset, limit, userId } = ctx.request.query;
  const dbQuery = {
    where: {},
    order: [['createdAt', 'DESC']],
    offset,
    limit,
    include: [
      {
        model: ctx.model.FeedLike,
        attributes: ['userId'],
        as: 'feedLikes',
      },
      {
        model: ctx.model.User,
        attributes: ['id', 'username', 'avatar'],
        as: 'user',
      },
    ],
  };
  if (userId) {
    if (userId != ctx.accessToken.id) {
      return (ctx.body = error('无权限'));
    }
    dbQuery.where.userId = userId;
  }
  const result = await ctx.service.feedService.findAndCountAll(dbQuery);
  ctx.body = pass(result);
};

exports.create = async function () {
  const ctx = this;
  const { desc, images } = ctx.request.body;
  const userId = ctx.accessToken.id;
  const newFeed = await ctx.model.Feed.create({
    images,
    desc,
    userId,
  });
  ctx.body = pass(newFeed);
};
