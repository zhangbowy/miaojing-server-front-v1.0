// var webpage = require('webpage');
// var page = webpage.create();
// page.open('http:   www.baidu.com/', function (status) {
//     var data;
//     if (status === 'fail') {
//         console.log('open page fail!');
//     } else {
//         console.log(page.content);
//         打印出HTML内容
//     }
//     page.close();
//     关闭网页
//     phantom.exit();
//     退出phantomjs命令行
// });


var webpage = require('webpage');


var system = require('system');
var args = system.args;
var page = webpage.create();
//是否登陆var
is_logon = false;
//打开网址
page.open('https://wx.qq.com/', function (status) {
    //加载ok
    if (status != "success") {
        console.log('FAIL to load the address');
        phantom.exit();
    };
    //延时
    window.setTimeout(function () {
        //在本地生成截图
        page.render("logincode.png");
        console.log('生成二维码');
        //校验登录
        // check_login();
        // phantom.exit();
    }, 1000);
});
//校验登录function
check_login()
{
    //省略部分代码
//...
};
//检验页面function
check_url(url)
{
    //var h_url = '   省略部分代码... ?requrl=' + url;
    //省略部分代码
//...
    if (r.length > 0) {
        console.log(r[0].substr(5));
    } else {
        console.log('该网站地址在微信内正常访问');
    };phantom.exit();
}

// )}
// ;
