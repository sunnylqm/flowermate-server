const fs = require('fs-extra');
module.exports = app => {
  const DataTypes = app.Sequelize;
  const File = app.model.define(
    "File",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      path: DataTypes.STRING,
      tag: DataTypes.STRING,
      uploaderId: DataTypes.INTEGER,
      public: DataTypes.BOOLEAN,
    },
    {
      freezeTableName: true
    }
  );
  // File.beforeDestroy((file) => {
  //   const ctx = app.createAnonymousContext();
  //   const localPath = ctx.service.fileService.getLocalPathByFile(file);
  //   if (localPath) {
  //     fs.remove(localPath);
  //   }
  // });
  return File;
};
