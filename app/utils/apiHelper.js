exports.pass = data => ({
  ok: true,
  data,
});
exports.error = (msg, code) => ({
  ok: false,
  code,
  msg,
});

exports.checkParams = params => {
  for (const paramName in params) {
    const param = params[paramName];
    if (param === undefined || param === '' || param === null) {
      throw new Error(paramName);
    }
  }
};
