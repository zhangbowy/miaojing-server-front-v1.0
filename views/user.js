const  userDb = require('../sequelize/user');
const  classDb = require('../sequelize/class');
const  wxUser = require('../sequelize/wxUser');
const  errlogDb = require('../sequelize/error_log')
const jwt = require('jsonwebtoken');
const phantom = require('phantom');
const http = require("http");
console.log("starting!");
wxUser.sync();

const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}
class UserApi {
    constructor()
    {
        this._list = [];
        this._hash = {};
    }

    async login(ctx)
    {

        const token = tokens['admin'];
        let reqData = ctx.request.query;
        let user = reqData.user;
        let pwd = reqData.pwd;

        // mock error
        if (!token) {
            ctx.body = {
                code: 60204,
                data: {},
                message: 'Account and password are incorrect.'
            };
            return
        }

        ctx.body = {
            code: 20000,
            data: token,
            msg: "登录成功！"
        }

    }
    async info(ctx)
    {
        const info = users['admin-token']

        // mock error
        if (!info) {
            ctx.body =  {
                code: 50008,
                message: 'Login failed, unable to get user details.'
            }
            return
        }

        ctx.body =  {
            code: 20000,
            data: info
        }
    }
    async getWeb(ctx)
    {


        let cookiesList =[
            {
                "domain": ".wx.qq.com",
                "expires": "Fri, 01 Jan 2038 00:00:00 GMT",
                "expiry": 2145916800,
                "httponly": false,
                "name": "wxuin",
                "path": "/",
                "secure": false,
                "value": "1473083972" //is change  flase
            },{
                "domain": ".wx.qq.com",
                "expires": "Fri, 01 Jan 2038 00:00:00 GMT",
                "expiry": 2145916800,
                "httponly": false,
                "name": "wxsid",
                "path": "/",
                "secure": false,
                "value": "1Qi5pPnPR9ssHv8G" //is change  true
            },{
                "domain": ".wx.qq.com",
                "expires": "Fri, 01 Jan 2038 00:00:00 GMT",
                "expiry": 2145916800,
                "httponly": false,
                "name": "wxpluginkey",
                "path": "/",
                "secure": false,
                "value": "1571202122" //这里省略了，输入自己的value即可
            },{
                "domain": ".wx.qq.com",
                "expires": "Fri, 01 Jan 2038 00:00:00 GMT",
                "expiry": 2145916800,
                "httponly": false,
                "name": "wxloadtime",
                "path": "/",
                "secure": false,
                "value": "1571205800_expired" //这里省略了，输入自己的value即可
            },{
                "domain": ".wx.qq.com",
                "expires": "Fri, 01 Jan 2038 00:00:00 GMT",
                "expiry": 2145916800,
                "httponly": false,
                "name": "webwxuvid",
                "path": "/",
                "secure": false,
                "value": "069a7b2ab2c788f80ba723c4df60c1fbe9b1859d13efeed90bee14f50b61446cc19eb16009f738c708ef4e318c135f81" //true自己的value即可
            },{
                "domain": ".qq.com",
                "expires": "Fri, 01 Jan 2038 00:00:00 GMT",
                "expiry": 2145916800,
                "httponly": false,
                "name": "webwx_data_ticket",
                "path": "/",
                "secure": false,
                "value": "gSdaDI0pOOKYlAoeCjz8dvFO" //这里省略了，输入自己的value即可
            },{
                "domain": ".wx.qq.com",
                "expires": "Fri, 01 Jan 2038 00:00:00 GMT",
                "expiry": 2145916800,
                "httponly": false,
                "name": "webwx_auth_ticket",
                "path": "/",
                "secure": false,
                "value":"CIsBEIP08t4LGoABtXrZrmhtTpXX7kY0Q+JPjrOaElU5DXvF38Do3kHDX22382sm52yZQ/SuMyrCZYWBpU05ERVmM6SUYLh5P+QcoTCp0WfWAvdmwCChB14dBOSoRy+tmW9R+dx+WlLsF79rISNHqrttwE1SHKQcIcDnzF9rnrjX4YPZMOtPxY4oEaE="
            },{
                "domain": ".wx.qq.com",
                "expires": "Fri, 01 Jan 2038 00:00:00 GMT",
                "expiry": 2145916800,
                "httponly": false,
                "name": "last_wxuin",
                "path": "/",
                "secure": false,
                "value": "1473083972" //这里省略了，输入自己的value即可
            }
        ];
            const instance = await phantom.create();
            const page = await instance.createPage();
            // console.log(page);
            for(var item of cookiesList);
            {
                // await page.addCookie({
                //     "domain": ".baidu.com",
                //     "expires": "Fri, 01 Jan 2038 00:00:00 GMT",
                //     "expiry": 2145916800,
                //     "httponly": false,
                //     "name": "BDUSS",
                //     "path": "/",
                //     "secure": false,
                //     "value": "Jva2dtM0pwS3p-S0xNblNRdGZWcS0zeGI5ck54SlZBcDFWSnRKTFZ1azN3S3RkSVFBQUFBJCQAAAAAAAAAAAEAAADpLfun1cWyqXd5MTMxNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADczhF03M4RdRn" //这里省略了，输入自己的value即可
                // });
                await page.addCookie(item);
            }


            // await page.on('onResourceRequested', function(requestData) {
            //     console.info('Requesting', requestData.url);
            // });
            // const status = await page.open('https://wx.qq.com/');
            // // const content = await page.property('content');
            // console.log(2);
            // await page.render('./sc11reen.png');
            // await page.render('./sc11reen.png');
            // await page.render('./sc11reen.png');
            // await page.render('./sc11reen.png');
            // await page.render('./sc2reen.png');
            // await page.render('./sc2reen.png');
            // await page.render('./sc11reen.png');
            // await page.render('./sc11reen.png');
            // await page.render('./sc4reen.png');
            await page.open('https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxcheckurl?requrl=http%3A%2F%2Fqinkeji.cn&skey=%40crypt_53a790b_58631447b2dc6013c8661e09b9fd5fbc&deviceid=e131085125328665&pass_ticket=undefined&opcode=2&scene=1&username=@18aff852ff0113abffb731ac5f217005040a5abf783c50dd44ad87cb647a0a4b')
            const content = await page.property('content');
            const cook = await  instance.cookies();
            var title = await page.evaluate(function() {
                return document.title;
            });
        await page.render('./sc4reen.png');

        console.log(title);
            await instance.exit();
            ctx.body ={
                data:content,
                c:cook,
                t:title
            }

    }
    async getUserList(ctx)
    {
        let res  = await wxUser.findAll();

        ctx.body = {
            code:20000,
            data:res,
            msg:"请求成功！"
        }

    }
    async update(ctx)
    {
        let reqData = ctx.request.query;
        let id  = reqData.id;
        let row = await wxUser.findAll({
            where:{
                id:id
            }
        });
        let updateList = {};
        for(let k in row[0].dataValues)
        {
            updateList[k] = reqData[k]
        }
        console.log(updateList,"_updateList");
        let result = await wxUser.update(updateList,{
            where:{
                id:id
            }
        });
        if(result.length>0)
        {
            ctx.body = {code:20000,data:result,msg:"请求成功!"};
        }
        else
        {
            ctx.body = {code:0,data:result,errorMsg:"检测到数据未做改动,故本次请求未被正确响应！"};
        }
    }
    async register(ctx)
    {
        let reqData = ctx.request.query;
        let _params = {};
        _params.wx_user = reqData.wx_user;
        _params.wx_img = reqData.wx_img;
        _params.visitTime = 0;
        _params.status = 1;
        const  res1 = await wxUser.create(_params);
        if(res1)
        {
            ctx.body = {code:20000,data:res1,msg:"请求成功！"};
        }
        else
        {
            ctx.body = "没有数据";
        }
    }

    async delUser(ctx) {
        console.log(ctx.request.query);
        let id = ctx.request.query.id;
        // let ids = id.split(',');
        const res1 = await wxUser.destroy({
            where: {
                id: id
            }
        });
        if (res1)
        {
            ctx.body = {code: 20000, data: res1, msg: "删除成功"};
        }
        else
        {

            ctx.body = "没有数据";
        }
    }
    async upLoadImg(ctx) {
        console.log(ctx.req.file,"------");
        ctx.body={
            code:20000,
            data:ctx.req.file,
            msg:"上傳成功"
        }
        // console.log(ctx.request.query);
        // let id = ctx.request.query.id;
        // // let ids = id.split(',');
        // const res1 = await wxUser.destroy({
        //     where: {
        //         id: id
        //     }
        // });
        // if (res1)
        // {
        //     ctx.body = {code: 20000, data: res1, msg: "删除成功！"};
        // }
        // else
        // {
        //     ctx.body = "没有数据";
        // }
    }
    async makeSale(ctx) {
        let reqData = ctx.request.query;
        let id  = reqData.id;
        let _params = {};
        _params.saleId = reqData.saleId;
        _params.visitTime = 0;
        let result = await wxUser.update(_params,{
            where:{
                id:id
            }
        });
        ctx.body = {
            code:20000,
            data:result,
            msg:"请求成功！"
        }
    }


    async getSale(ctx) {
        let reqData = ctx.request.query;
        let saleId  = reqData.saleId;
        let _params = {};
        _params.saleId = reqData.saleId;
        if(!_params.saleId)
        {
            ctx.body = {
                code:0,
                data:[],
                msg:"请求不合法"
            }
            return
        }
        let result = await wxUser.findAll({
            where:{
                saleId:saleId
            }
        });
        _params.visitTime =(result[0].visitTime? parseInt(result[0].visitTime):1) + 1
        console.log(result)
        let result2 = await wxUser.update(_params,{
            where:{
                saleId:saleId
            }
        });
        if(result2)
        {
            ctx.body = {
                code:20000,
                data:result,
                msg:"请求成功！"
            }
        }
        else
        {
            ctx.body = {
                code:0,
                data:result,
                msg:"已过期"
            }
        }

    }
    async saveLog(ctx) {
        let reqData = ctx.request.query;
        let url  = reqData.url;
        let content  = reqData.content;
        let inter_face  = reqData.inter_face;
        let _params = {};
        // _params.saleId = reqData.saleId;
        let result = await errlogDb.create(reqData);
        if(result)
        {
            ctx.body = {
                code:1,
                data:result,
                msg:"请求成功！"
            }
        }
        else
        {
            ctx.body = {
                code:0,
                data:result,
                msg:"failed"
            }
        }

    }


}
function bubbleSort(arr)
{
    var len = arr.length;
    for (var i = 0; i < len; i++)
    {
        for (var j = 0; j < len - 1 - i; j++)
        {
            if (arr[j] > arr[j+1])
            {        //相邻元素两两对比
                var temp = arr[j+1];  //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}
function fibo (n) {
    return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}

module.exports = UserApi;
