const { passwordWithSalt, createToken } = require('../utils/password');
const { pass, error } = require('../utils/apiHelper');

exports.create = async function() {
  const ctx = this;
  const { username, pwd } = ctx.request.body;
  const user = await ctx.model.User.findOne({ where: { username } });
  if (user && passwordWithSalt(pwd) === user.pwd) {
    const now = Date.now();
    const token = createToken({
      id: user.id,
      exp: now + 7 * 24 * 3600 * 1000,
    });
    await user.update({
      token,
    });
    user.pwd = undefined;
    ctx.body = pass(user);
  } else {
    ctx.body = error('登录失败，请检查用户名或密码');
  }
};
