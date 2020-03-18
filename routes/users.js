const router = require('koa-router')();
const  userDb = require('../sequelize/user')
const userApi = require("../views/user");
const multer = require('koa-multer')

const UserApi = new userApi();


let storage = multer.diskStorage({
    //文件保存路径
    destination: function(req, file, cb) {
        cb(null, 'public/wx_img/');
    },
    //修改文件名称
    filename: function(req, file, cb) {
        var fileFormat = file.originalname.split('.')
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    },
})
//加载配置
let upload = multer({ storage })

router.prefix('/user');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
});
router.post('/login', async function (ctx, next) {
    await UserApi.login(ctx)
});
router.get('/info', async function (ctx, next) {
    await UserApi.info(ctx)
});
router.get('/getWeb', async function (ctx, next) {
    await UserApi.getWeb(ctx)
});
router.get('/getUser', async function (ctx, next) {
    await UserApi.getUserList(ctx)
});
router.get('/delUser', async function (ctx, next) {
    await UserApi.delUser(ctx)
});
router.get('/register', async function (ctx, next) {
    await UserApi.register(ctx)
});
router.get('/update', async function (ctx, next) {
    await UserApi.update(ctx)
});
router.post('/upLoadImg',upload.single('file'), async function (ctx, next) {
    await UserApi.upLoadImg(ctx)
});
router.get('/getStatus',  async function (ctx, next) {
    await UserApi.getStatus(ctx)
});
router.get('/makeSale',  async function (ctx, next) {
    await UserApi.makeSale(ctx)
});
router.get('/getSale',  async function (ctx, next) {
    await UserApi.getSale(ctx)
});
router.get('/saveLog',  async function (ctx, next) {
    await UserApi.saveLog(ctx)
});
module.exports = router;
