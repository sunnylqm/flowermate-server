const { passwordWithSalt, createToken } = require('../utils/password');
const { pass, error } = require('../utils/apiHelper');

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// 注册
exports.create = async function() {
  const ctx = this;
  const { username, email, pwd } = ctx.request.body;

  if (!username) {
    return (ctx.body = error('请输入用户名'));
  }
  if (!emailRegex.test(email)) {
    return (ctx.body = error('请输入正确的邮箱'));
  }
  if (pwd.length < 6) {
    return (ctx.body = error('密码不能小于6个字符'));
  }

  const userWithTheSameName = await ctx.model.User.findOne({
    where: { username },
  });
  if (userWithTheSameName) {
    return (ctx.body = error('用户名已存在'));
  }

  const userWithTheSameEmail = await ctx.model.User.findOne({
    where: { email },
  });
  if (userWithTheSameEmail) {
    return (ctx.body = error('此邮箱已注册'));
  }
  const userToCreate = {
    username,
    email,
    pwd: passwordWithSalt(pwd),
  };
  const newUser = await ctx.model.User.create(userToCreate);

  const token = createToken({
    id: newUser.id,
    exp: Date.now() + 7 * 24 * 3600 * 1000,
  });
  await newUser.update({
    token,
  });
  delete newUser.pwd;
  ctx.body = pass(newUser);
};

// 更新
exports.update = async function() {
  const ctx = this;
  const { id } = ctx.params;
  if (parseInt(id) !== ctx.accessToken.id) {
    return (ctx.body = error('无权限'));
  }
  await ctx.model.User.update(ctx.request.body, { where: { id } });
  return (ctx.body = pass());
};
