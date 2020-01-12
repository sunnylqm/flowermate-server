const fs = require('fs-extra');
const Service = require('egg').Service;

class FileService extends Service {
  async getPublicPath(id) {
    const { ctx } = this;
    const file = await ctx.model.File.findByPk(id);
    if (file && file.public) {
      return `/files/public/${file.path}`;
    }
    return null;
  }

  getLocalPathByFile(file) {
    if (file) {
      let parentPath = 'storage/files/public';
      if (!file.public) {
        parentPath = 'storage/files/internal';
      }
      return `${parentPath}/${file.path}`;
    }
    return null;
  }

  async getLocalPath(id) {
    const { ctx } = this;
    const file = await ctx.model.File.findByPk(id);
    return this.getLocalPathByFile(file);
  }

  async save(file, tag, internal) {
    const { ctx } = this;
    let fileId;
    await ctx.model.transaction(async () => {
      const newFile = await ctx.model.File.create();
      let parentPath = 'storage/files/public';
      if (internal) {
        parentPath = 'storage/files/internal';
      }
      const filePath = `${tag}/${newFile.id}/${file.filename}`;
      fs.moveSync(file.filepath, `${parentPath}/${filePath}`, {
        overwrite: true,
      });
      let uploaderId;
      if (ctx.accessToken && ctx.accessToken.id) {
        uploaderId = ctx.accessToken.id;
      }
      await newFile.update({
        tag,
        path: filePath,
        uploaderId,
        public: !internal,
      });
      fileId = newFile.id;
    });
    return fileId;
  }
}

module.exports = FileService;
