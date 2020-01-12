const { pass, error } = require("../utils/apiHelper");

exports.create = async function() {
  const ctx = this;
  const { tag } = ctx.request.query;
  const files = ctx.request.files || [];
  if (files.length) {
    const file = files[0];
    // const extName = path.extname(file.filename);
    // const randomFileName = `${ctx.accessToken.id}_${Date.now()}_${Math.round(
    //   Math.random() * 1000
    // )}${extName}`;
    // const filenameArray = file.filepath.split('/');
    // const filename = filenameArray[filenameArray.length - 1];
    // fs.moveSync(file.filepath, `storage/tmp/${filename}`);

    const fileId = await ctx.service.fileService.save(file, tag);
    return (ctx.body = pass(fileId));
  }
};

exports.show = async function() {
  const ctx = this;
  const { id: fileId } = this.params;
  const filePath = await ctx.service.fileService.getPublicPath(fileId);
  if (filePath) {
    return ctx.redirect(filePath);
  } else {
    return (ctx.status = 404);
  }
};
