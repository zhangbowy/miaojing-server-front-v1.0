define("biz_common/utils/http.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/utils/biz_common/utils/http.js*/,[],function(){
"use strict";
function t(){
var t=document.getElementsByTagName("html");
if(t&&1==!!t.length){
t=t[0].innerHTML;
var e=t.replace(/[\x00-\xff]/g,""),n=t.replace(/[^\x00-\xff]/g,"");
return 1*n.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
return 0;
}
return{
htmlSize:t()
};
});