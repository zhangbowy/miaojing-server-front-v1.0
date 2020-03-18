const router = require('koa-router')();
const  userDb = require('../sequelize/user')
const userApi = require("../views/wechart");
const UserApi = new userApi();
router.prefix('/wx');


router.get('/getVideo', async function (ctx, next) {
    await UserApi.getVideo(ctx)
});
module.exports = router;
