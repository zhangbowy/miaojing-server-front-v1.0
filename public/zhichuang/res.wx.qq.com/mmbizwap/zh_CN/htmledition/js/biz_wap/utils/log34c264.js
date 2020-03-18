define("biz_wap/utils/log.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/biz_wap/utils/log.js*/,["biz_wap/utils/mmversion.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/biz_wap/utils/mmversion.js*/,"biz_wap/jsapi/core.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/biz_wap/jsapi/core.js*/],function(i){
"use strict";
var s=i("biz_wap/utils/mmversion.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/biz_wap/utils/mmversion.js*/),e=i("biz_wap/jsapi/core.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/biz_wap/jsapi/core.js*/);
return function(i,n,o){
"string"!=typeof i&&(i=JSON.stringify(i)),n=n||"info",o=o||function(){};
var t;
s.isIOS?t="writeLog":s.isAndroid&&(t="log"),t&&e.invoke(t,{
level:n,
msg:"[WechatFe]"+i
},o);
};
});