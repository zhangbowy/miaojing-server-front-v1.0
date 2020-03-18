const router = require('koa-router')()
const path = require("path");
const fs = require("fs");
router.get('/', async (ctx, next) => {
  ctx.body = "張博--------------"
  // var filePath = path.join(__dirname ,'../','/public/laozhangyou/nx.laozhangyou.net/q1/index.htm')
  // console.log(filePath)
  // fs.readFile('filePath','utf-8', function(err,data){
  //   if(err){
  //     ctx.body = 'error'
  //   }else{
  //     ctx.body = data
  //   }
  // })


});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});

module.exports = router;
