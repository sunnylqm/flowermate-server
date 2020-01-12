const Service = require('egg').Service;

class ReportService extends Service {
  async findAndCountAll(params) {
    return this.ctx.model.Report.findAndCountAll(params);
  }

  async findAll(params) {
    return this.ctx.model.Report.findAll(params);
  }
}
module.exports = ReportService;
