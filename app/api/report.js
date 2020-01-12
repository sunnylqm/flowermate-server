const { pass, error } = require('../utils/apiHelper');
const { animalDetect, plantDetect } = require('../utils/imageCognition');
const _ = require('lodash');

exports.index = async function() {
  const ctx = this;
  const { type, offset, limit } = ctx.request.query;
  const dbQuery = {
    where: {},
    order: [['createdAt']],
    offset,
    limit,
  };
  if (type) {
    dbQuery.where.type = type;
  }
  const user = ctx.accessToken;
  dbQuery.where.userId = user.id;
  const result = await ctx.service.reportService.findAndCountAll(dbQuery);
  ctx.body = pass(result);
};

exports.create = async function() {
  const ctx = this;

  const { type = 'plant', image, lon, lat } = ctx.request.body;
  let cogResult;
  if (type === 'animal' || type === 'plant') {
    const filePath = await ctx.service.fileService.getLocalPath(image);
    cogResult =
      type === 'animal'
        ? await animalDetect(filePath)
        : await plantDetect(filePath);
  }

  const userId = ctx.accessToken.id;
  const newReport = await ctx.model.Report.create({
    image,
    userId,
    extra: cogResult,
    type,
    lon,
    lat,
  });
  ctx.body = pass(newReport);
};