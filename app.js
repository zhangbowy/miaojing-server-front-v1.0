const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
var cors = require('koa2-cors');
const index = require('./routes/index');
const users = require('./routes/users');
const form = require('./routes/form');
const wx = require('./routes/wx');
let userDb = require("./sequelize/wxUser")
app.use(cors());
// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());



// app.use(require('koa-static')(__dirname + '/public/laozhangyou/nx.laozhangyou.net/q1/'));
// logger
app.use(async (ctx, next) => {
  app.use(views(__dirname + '/views', {
    extension: 'pug'
  }));
  const start = new Date();
  await next();
  const ms = new Date() - start;
  var times = getTime();
  console.log(`${times} - ${ctx.method} ${ctx.url} - ${ms}ms`)
});
function getTime()
{
  var now = new Date();
  var year = now.getFullYear(); //得到年份
  var month = now.getMonth();//得到月份
  var date = now.getDate();//得到日期
  var day = now.getDay();//得到周几
  var hour = now.getHours();//得到小时
  var minu = now.getMinutes();//得到分钟
  var sec = now.getSeconds();//得到秒
  var MS = now.getMilliseconds();//获取毫秒
  var week;
  month = month + 1;
  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;
  if (hour < 10) hour = "0" + hour;
  if (minu < 10) minu = "0" + minu;
  if (sec < 10) sec = "0" + sec;
  if (MS < 100)MS = "0" + MS;
  var arr_week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  week = arr_week[day];
  var time = "";
  time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week;
  //当前日期赋值给当前日期输入框中（jQuery easyUI）
  return time
}





const path = require("path");
const fs = require("fs")
let render = require("koa-swig")
let co = require("co")
app.context.render = co.wrap(render({
  // ...your setting
  root: path.join(__dirname, 'public/template/fastwhale/index'),
  autoescape: true,
  cache: false, // disable, set to false
  ext: 'html',
  encoding: 'utf8',
  writeBody: true
}));

app.use(async function(ctx, next)
{
   
    let filePath = path.join(__dirname,"/public/zhichuang/xc.kang-120.cn/sgzc/1.htm");
    if(ctx.path == "/zy")
    {
        // filePath = path.join(__dirname,"/public/template/fastwhale/index","/index.htm");
        let isHaveFile = await getStat(filePath)
        let reg = new RegExp(".htm");
        if(reg.test(filePath))
        {
            if(isHaveFile)
            {
                console.log("in")
                let saleId = ctx.request.query.saleId;
                // let saleId = "5241a47dcb9f960c90dbdf2e1ccd021e";
                if(!saleId)
                {
                  ctx.body = {
                    code:-1,
                    data:[],
                    errorMsg:"参数未正确配置"

                }
                return

                }
                let res = await userDb.findAll({
                    where:{
                        saleId:saleId
                    }
                })
                console.log(res[0])
                if(res[0])
                {
                    let tempInfo = res[0].dataValues;
                    ctx.body = await ctx.render(filePath,tempInfo)
                }
                else
                {
                    ctx.body = {
                        code:-1,
                        data:[],
                        errorMsg:"SaleId不存在"
                    }
                }
            }
            else
            {
                ctx.body = {status:404}
            }
        }
        else
        {
            await next()
        }
    }
    else
        {
            await next()
        }

})
app.use(require('koa-static')(__dirname + '/public/zhichuang/xc.kang-120.cn'));
app.use(require('koa-static')(__dirname + '/public/zhichuang/xc.kang-120.cn/sgzc'));

app.use(require('koa-static')(__dirname + '/public'));




//判断文件夹是否存在
function getStat(path)
{
    return new Promise((resolve, reject) => 
    {
        fs.stat(path, (err, stats) => 
        {
            if(err)
            {
                resolve(false);

            }else
            {
                resolve(stats);
            }
        })
    })
}


// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(form.routes(), form.allowedMethods());
app.use(wx.routes(), form.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
module.exports = app;
