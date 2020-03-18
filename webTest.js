var webpage = require('webpage');
var page = webpage.create();
// page.open('http://www.baidu.com/', function (status) {
//     var data;
//     if (status === 'fail') {
//         console.log('open page fail!');
//     } else {
//         console.log(page.content);//打印出HTML内容
//     }
//     page.close();//关闭网页
//     phantom.exit();//退出phantomjs命令行
// });



var output = './screen.png';//存储文件路径和名称
page.viewportSize = { width: 1280, height: 800 };//设置长宽
 var cookiesList =[
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
// console.log(a);
var flag;
for(var item of cookiesList)
{
    flag = false
    flag = phantom.addCookie(item);
    console.log(item+flag);
}


if(flag){
    page.open("https://wx.qq.com", function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit();
        } else {
            window.setTimeout(function () {
                page.render(output);
                console.log("success")
                phantom.exit();
            }, 500);
        }
    });
}else{
    console.log('error!!!');
}

