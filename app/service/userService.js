const Service = require('egg').Service;

class UserService extends Service {
  async findAndCountAll(params) {
    return this.ctx.model.User.findAndCountAll(params);
  }

  async findOne(params) {
    return this.ctx.model.User.findOne(params);
  }
}

module.exports = UserService;
