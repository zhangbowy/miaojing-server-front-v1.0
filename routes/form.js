const router = require('koa-router')();
const  userDb = require('../sequelize/user')
const formApi = require("../views/form");
const FormApi = new formApi();
router.prefix('/form');
router.get('/print', async function (ctx, next) {
    await FormApi.print(ctx)
});
router.get('/getQrCode', async function (ctx, next) {
    await FormApi.getQrCode(ctx)
});
router.get('/getForm', async function (ctx, next) {
    await FormApi.getForm(ctx)
});
module.exports = router;
