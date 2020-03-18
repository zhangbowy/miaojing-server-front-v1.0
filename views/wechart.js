// const  userDb = require('../sequelize/user');
const  classDb = require('../sequelize/class');
// const jwt = require('jsonwebtoken');
// const phantom = require('phantom');
const superagent = require("superagent");
const http = require("axios");
// const redisClient = require("../controller/redis_client");
const config = require("../configs/config");
const request = require("request")
const fs  = require("fs");
// classDb.sync();
class UserApi {
    constructor()
    {
        this._list = [];
        this._hash = {};
    }
    async getVideo(ctx)
    {
        var count = 0;
        var videoSrcArr = new Array();
        let vid1 = ctx.request.query.vid || 'n3060hju7ak';
        let videoList = await  getVideoes(vid1)
        const PassThrough = require('stream').PassThrough;
        ctx.body = request(videoList[0])
            .on('response', response => {
                Object.keys(response.headers).forEach((key) => {
                    // if ('content-length' === key) return;
                    if ('transfer-encoding' === key) return;
                    ctx.set(key, response.headers[key]);
                });
            })
            .on('error', ctx.onerror)
            .pipe(PassThrough())
    }
    async login(ctx)
    {
        ctx.body = {
            code: 1,
            data: {},
            msg: "登录成功！"
        }
    }
    async getWeb(ctx)
    {
    }


    /**
     * created by zhangbo on 2019/10/17
     *
     * 检测域名是否被微信屏蔽接口
     * @ 流程
     *    1、调用微信接口获取token(存到redis,过期了在调);
     *    2、带着token domain 调用微信生成短链接接口;
     *    3、抓取短链接内容 判断特征 是否被微信屏蔽;
     * @ Tip：如果被微信屏蔽 短链接打开是微信110红色！界面，没有是正常跳转生成的url,以此寻求特征判断;
     *-----------------------------------------------------------------------------------
     * @ Update Log
     *      first created 目前平均访问耗时500ms,待优化  --2019/10/17
     *      生成过的短连接存数据库，二次调用快速响应       --2019/10/19
     * */
    async getStatus(ctx)
    {
        let clientIp = getClientIP(ctx.request);
        console.log(clientIp);
        let domain = ctx.request.query.url;
        if(!domain)
        {
               ctx.body = {
                code:-2,
                errorMsg:"参数不正确！",
                 localIp:clientIp,
                 from:"nodejs-c"
                };

         return
        }
        // console.log(typeof(checkTime2));
        let a = await checkTime2(clientIp);
        console.log(a);
        console.log(2222222222222);
        var isTime = await checkTime(clientIp);
        console.log(isTime,"isTime");
        // if(isTime >= 10)
        //         // {
        //         //     ctx.body = {
        //         //         code:-2,
        //         //         errorMsg:"当天免费查询次数已用完",
        //         //         localIp:clientIp,
        //         //         from:"nodejs-c"
        //         //     };
        //         //
        //         //     return
        //         // }
        //获取token
        let short_url;

        let cook = await classDb.findAll({
            where:{
                domain:domain
            }
        });
        // ctx.body = {
        //     cook:cook
        // }
        // return
        //数据库已有缓存胡域名对应胡短连接
        // console.log(cook[0].short_url);
        if(cook　&& cook.length>0)
        {
            console.log("-----------------")
            short_url =  cook[0].short_url;
        }
        else
        {
            let token = await getToken();
            console.log(token,"-----");
            let _params = {};
            _params.access_tok = token;
            _params.action	= "long2short";
            _params.long_url = domain;
            let getShortUrl = `https://api.weixin.qq.com/cgi-bin/shorturl?access_token=${token}`;

            //获取微信短result
            let shortData = await http.post(getShortUrl,_params);
            //短链接
            short_url = shortData.data.short_url;
            console.log(short_url,"short_url");

            //存
            let domainInfo = {
                short_url:short_url,
                domain:domain
            };
            let saveC =  await  classDb.create(domainInfo);
            console.log(saveC,"SAVE SUCCESS");
        }

        //抓取短链接网页
        let content = await getContent(short_url);

        if(content)
        {
            //说明访问正常
            if(content.req)
            {
                let reg = new RegExp("weixin110");
                // console.log(content.req,"--------")
                let isInfo = reg.test(content.text);
                if(isInfo)
                {
                    let info = {
                        domain:domain,
                        localIp:clientIp
                    };
                    returnData(ctx,0,info,isTime);
                }
                else
                {
                    let info = {
                        domain:domain,
                        localIp:clientIp
                    };
                    returnData(ctx,1,info,isTime);
                }
            }
            //访问异常 找不到ip 说明也没被微信屏蔽 因为要是屏蔽了短链接会跳微信110 具体怎么提示待定
            else
            {
                let info = {
                    domain:domain,
                    localIp:clientIp
                };
                returnData(ctx,2,info,isTime);
            }
        }
    }


}
 async function checkTime2($ip)
{
    await checkTime($ip)
    console.log(1111)
    return 222


    // })
}
function getVideoes (vid) {
    count = 0;
    videoSrcArr = new Array();
    var that = this;
    var platforms = [4100201, 11]
    for (const platform in platforms) {
        var videoUrl = 'https://vv.video.qq.com/getinfo?otype=json&appver=3.2.19.333&platform='+platform+'&defnpayver=1&vid=' + vid;
        var host;
        return new Promise(function (resolve) {
            request(
                videoUrl,
                function (err,res,body) {
                    console.log(res,err)
                    var dataJson = res.body.replace(/QZOutputJson=/, '') + "qwe";
                    var dataJson1 = dataJson.replace(/;qwe/, '');
                    var data = JSON.parse(dataJson1);
                    if (data.msg == 'cannot play outside') {
                        wx.showToast({
                            title: 'cannot play outside',
                            icon: 'none',
                            duration: 2000
                        });
                        return nil;
                    }
                    if (data.msg == 'vid status wrong') {
                        wx.showToast({
                            title: 'vid status wrong',
                            icon: 'none',
                            duration: 2000
                        });
                        return nil;
                    }
                    var fn_pre = data.vl.vi[0].lnk;
                    host = data['vl']['vi'][0]['ul']['ui'][0]['url'];
                    var streams = data['fl']['fi'];
                    var seg_cnt = data['vl']['vi'][0]['cl']['fc'];
                    var filename = data['vl']['vi'][0]['fn'];
                    var fc_cnt  = seg_cnt;
                    var video_type
                    var magic_str
                    if (parseInt(seg_cnt) == 0) {
                        seg_cnt = 1
                    }else {
                        fn_pre, magic_str, video_type = filename.split('.')
                    }

                    var part_urls = new Array()
                    var total_size = 0
                    var part_format_id
                    for (var i = 1; i < (seg_cnt + 1); i++) {
                        if (fc_cnt == 0) {
                            var part_format_ids = data['vl']['vi'][0]['cl']['keyid'].split('.')
                            part_format_id = part_format_ids[part_format_ids.length-1]
                        }else {
                            part_format_id = data['vl']['vi'][0]['cl']['ci'][i - 1]['keyid'].split('.')[1]
                            filename = [fn_pre, magic_str, i.toString(), video_type].join('.')
                        }
                        requestVideoUrls(part_format_id, vid, filename, host, seg_cnt).then(function (response) {
                            resolve(response);
                        });
                    }
                }
            )
        })
    }
    // },
// 解析视频真正的地址
};

function requestVideoUrls(part_format_id, vid, fileName, host,videoCount) {
    var keyApi = "https://vv.video.qq.com/getkey?otype=json&platform=11&format=" + part_format_id + "&vid=" + vid + "&filename=" + fileName + "&appver=3.2.19.333"

    //

    return new Promise(function (resolve) {
        request(
            keyApi,
            function (err, res, body) {
                console.log(err,res)
                var dataJson = res.body.replace(/QZOutputJson=/, '') + "qwe";
                var dataJson1 = dataJson.replace(/;qwe/, '');
                var data = JSON.parse(dataJson1);
                if (data.key != undefined) {
                    var vkey = data['key']
                    var url = host + fileName + '?vkey=' + vkey;
                    var vidoeSrc = String(url)
                    videoSrcArr.push(vidoeSrc);
                }
                count++;
                // 判断视频是否全部获取，获取全部视频再返回
                if (count == videoCount) {
                    resolve(videoSrcArr);
                    console.log(videoSrcArr);
                }

            }
        )
    })
}
function checkTime($clientIp)
{
    return new Promise((resolve,reject) =>
    {
        redisClient.getRedis($clientIp).then(($res)=>
        {
            if(!$res)
            {
                let parmas = {
                    num:1
                };
                redisClient.setRedis($clientIp,parmas).then(($data)=>
                {
                    resolve($data);

                },$err=>
                {
                    reject($err)
                })
            }
            else if ($res.num < 10 && $res.num >= 1)
            {
                let parmas = {
                    num:++$res.num
                };
                redisClient.setRedis($clientIp,parmas).then(($data)=>
                {
                   resolve($data);

                },$err=>
                {
                    reject($err)
                })
            }
            else
            {
            // {  let parmas = {
            //         num:1
            //     }
            //     redisClient.setRedis($clientIp,parmas).then(($data)=>
            //     {
                    resolve($res.num);
            //
            //     },$err=>
            //     {
            //         reject($err)
            //     })
            }
        })
    })
}

function getContent($url)
{
    return new Promise((resolve,reject) =>
    {
        superagent.get($url).end((err, res) =>
        {
            if (err)
            {
                resolve(err);
            }

            resolve(res)
        });
    })
}

function getToken() {
    //1、查redis有没有有的话返回结束
    //2、过期了就重新获取
    return new Promise((resolve,reject)=>
    {
        redisClient.getRedis("token").then(($token)=>
        {
            if(!$token || !$token.create_at || !$token.expires_in || isNaN($token.create_at) || isNaN($token.expires_in) || (new Date().getTime()) > (parseInt($token.create_at) + parseInt($token.expires_in) * 1000))
            {
                setToken().then(($data)=>
                {
                    resolve($data)

                },$err=>
                {
                    reject($err)
                });
            }
            else
            {
                // console.log($token);
                resolve( $token.token);
                // setToken().then(($data)=>{
                //     resolve($data)
                // });
            }
        },$err=>
        {
            console.log($err,1);
            reject($err);
        })
    })

    // var tData = await http.get(getTokenUrl);
}

function setToken()
{
    return new Promise((resolve,reject)=>
    {
        let appId = config.wxInfo.appId;
        let secret = config.wxInfo.secret;
        let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`;
        http.get(url).then(($tokenInfo)=>
        {
            let tokenInfo = $tokenInfo;
            console.log(tokenInfo,"token");
            let now = new Date().getTime();
            let info = {
                token: tokenInfo.data.access_token,
                expires_in: tokenInfo.data.expires_in,
                create_at: now,
            };
            redisClient.setRedis("token",info).then(($token)=>
            {
                if($token)
                {
                   resolve($token.token);
                }
                else
                {
                    reject($token);
                }
            },$err=>
            {
                reject($err)
            })

        });

    } )


}

function returnData(ctx,$code,$data,$checkTime)
{
    let timeStamp = new Date().getTime();
    let statusList = {
        0:{
            code:0,
            msg:"已被屏蔽",
            checkTime:timeStamp
        },
        1:{
            code:1,
            msg:"微信访问正常",
            checkTime:timeStamp
        },
        2:{
            code:2,
            msg:"微信访问正常,但未解析",
            checkTime:timeStamp
        }
    };
    let info = statusList[$code] || {};
    info.from = "nodejs-cj by zhangbo";
    info.times = $checkTime;
    for(let item in $data)
    {
        info[item] = $data[item];
    }
    ctx.body = info;
}

function getClientIP(req)
{
    return req.ip || req.headers["X-Orig-IP"]  // 判断是否有反向代理 IP
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
                var temp = arr[j+1];    //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

module.exports = UserApi;
