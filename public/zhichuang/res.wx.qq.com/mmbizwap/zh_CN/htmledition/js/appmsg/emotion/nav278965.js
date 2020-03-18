define("appmsg/emotion/nav.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/emotion/appmsg/emotion/nav.js*/,["appmsg/emotion/common.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/emotion/appmsg/emotion/common.js*/,"appmsg/emotion/dom.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/emotion/appmsg/emotion/dom.js*/],function(n,o){
"use strict";
var t=n("appmsg/emotion/common.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/emotion/appmsg/emotion/common.js*/),a=n("appmsg/emotion/dom.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/emotion/appmsg/emotion/dom.js*/),m=a.each,o={};
return o.activeNav=function(n){
t.currentPage=n;
var o=t.navs;
m(o,function(t,a){
a===n?o[a].attr("class","emotion_nav current"):o[a].attr("class","emotion_nav");
});
},o;
});