/**
 *  公共信息入口
 */
const KoaRouter = require('koa-router');
const FilesService = require(':services/common/FilesService');
const controller = new KoaRouter();
const service = new FilesService();

//文件上传接口(单文件)
controller.post('/uploadFile', async(ctx) => {
    ctx.body = await service.uploadFile({ state: ctx.state, files: ctx.request.files });
});

//文件上传接口(多文件)
controller.post('/uploadFiles', async(ctx) => {
    ctx.body = await service.uploadFiles({ state: ctx.state, files: ctx.request.files });
});

//文件删除接口(多文件)
controller.delete('/deleteFiles', async(ctx) => {
    ctx.body = await service.deleteFiles({ state: ctx.state, body: ctx.request.body });
});

//获取文件列表接口
controller.get('/getFiles', async(ctx) => {
    ctx.body = await service.getFiles({ state: ctx.state, query: ctx.request.query });
});

//获取文件列表接口
controller.get('/getFileById/:fileId', async(ctx) => {
    ctx.body = await service.getFileById(ctx.params);
});

//获取文件列表接口
controller.get('/readeFileContent', async(ctx) => {
    ctx.body = await service.readeFileContent(ctx.request.query);
});

module.exports = controller;
