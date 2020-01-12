const { parseToken } = require('../app/utils/password');
const path = require('path');

const specSequelize = require('sequelize');
// 使用 cls-hooked 才能支持在 sequelize 的事务中使用 async/await
const sequelizeCLSNamespace = require('cls-hooked').createNamespace(
  'com.flowermate',
);
specSequelize.useCLS(sequelizeCLSNamespace);
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1556350678215_1275';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    static: {
      gzip: true,
      usePrecompiledGzip: true,
      dir: [
        {
          prefix: '/public/',
          dir: path.join(appInfo.baseDir, 'app/public'),
        },
        {
          prefix: '/files/public/',
          dir: path.join(appInfo.baseDir, 'storage/files/public'),
        },
      ],
    },
    logger: {
      dir: 'storage/logs',
    },
    sequelize: {
      dialect: 'sqlite',
      username: 'sqlite',
      password: 'sqlite',
      database: 'flowermatedb',
      define: {
        timestamps: true,
        paranoid: true, // soft delete
      },
      Sequelize: specSequelize,
      storage: 'storage/database.sqlite',
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    rest: {
      urlprefix: '/api/', // Prefix of rest api url. Default to /api/
      authRequest: ctx => {
        const authHeader = ctx.request.headers.authorization;
        if (typeof authHeader !== 'string') {
          return null;
        }
        const rawToken = authHeader.replace('Bearer ', '');
        const accesstoken = parseToken(rawToken);
        if (accesstoken && accesstoken.id) {
          return ctx.service.userService.findOne({
            where: { id: accesstoken.id },
          });
        }
        return null;
      },
      authIgnores: {
        login: {
          create: true,
        },
        file: {
          show: true,
        },
        user: {
          create: true,
        },
      },
    },
    multipart: {
      mode: 'file',
      tmpdir: 'storage/tmp/upload',
    },
  };

  return {
    ...config,
    ...userConfig,
    ...require('./site'),
  };
};
