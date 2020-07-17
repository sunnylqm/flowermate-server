const { Service } = require('egg');
const { checkParams } = require('../utils/apiHelper');
const { Op } = require('sequelize');
// import getDistance from "geolib/es/getDistance";
// import findNearest from "geolib/es/findNearest";

// const radius = 10000;
class LocationService extends Service {
  async query(params) {
    return this.findReports(params);
  }

  async findReports(params) {
    const { ctx } = this;
    let { lon, lat, lonDelta, latDelta } = params;
    lon = parseFloat(lon);
    lat = parseFloat(lat);
    lonDelta = parseFloat(lonDelta);
    latDelta = parseFloat(latDelta);
    checkParams({ lon, lat, lonDelta, latDelta });
    return ctx.service.reportService.findAll({
      attributes: ['id', 'image', 'lon', 'lat', 'extra', 'createdAt'],
      where: {
        type: 'plant',
        lon: {
          [Op.between]: [lon - lonDelta / 2, lon + lonDelta / 2],
        },
        lat: {
          [Op.between]: [lat - latDelta / 2, lat + latDelta / 2],
        },
      },
      include: [
        {
          model: ctx.model.User,
          attributes: ['id', 'username'],
          as: 'user',
        },
      ],
    });
  }
}

module.exports = LocationService;
