var page = require('webpage').create();
var address = 'http://www.baidu.com';//填写需要打印的文件位置
var output = './screen.png';//存储文件路径和名称
page.viewportSize = { width: 1280, height: 800 };//设置长宽
console.log(flag);

if(flag){
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit();
        } else {
            window.setTimeout(function () {
                page.render(output);
                phantom.exit();
            }, 500);
        }
    });
}else{
    console.log('error!!!');
}
