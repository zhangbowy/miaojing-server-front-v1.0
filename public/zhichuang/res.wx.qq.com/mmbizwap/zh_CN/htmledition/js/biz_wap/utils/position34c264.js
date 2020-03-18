define("biz_wap/utils/position.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/utils/biz_wap/utils/position.js*/,[],function(){
"use strict";
function e(t,f){
var s=t.offsetLeft;
if(t.offsetParent&&t.offsetParent.className){
var a=t.offsetParent.className;
-1==a.indexOf(f)&&(s+=e(t.offsetParent,f));
}
return s;
}
function t(e,f){
var s=e.offsetTop;
if(e.offsetParent&&e.offsetParent.className){
var a=e.offsetParent.className;
-1==a.indexOf(f)&&(s+=t(e.offsetParent,f));
}
return s;
}
return{
getX:e,
getY:t
};
});