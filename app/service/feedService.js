const Service = require('egg').Service;

class FeedService extends Service {
  async findAndCountAll(params) {
    return this.ctx.model.Feed.findAndCountAll(params);
  }

  async findAll(params) {
    return this.ctx.model.Feed.findAll(params);
  }
}
module.exports = FeedService;
