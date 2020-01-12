module.exports = {
  schedule: {
    interval: '10y',
    type: 'worker',
    immediate: true,
  },
  async task(ctx) {
    const { model } = ctx;
    await model.sync({
      // force: true,
    });
  },
};
