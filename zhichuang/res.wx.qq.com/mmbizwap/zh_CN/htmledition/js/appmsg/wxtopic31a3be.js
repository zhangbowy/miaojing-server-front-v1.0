define("appmsg/wxtopic.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/appmsg/wxtopic.js*/,["biz_wap/utils/ajax.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/biz_wap/utils/ajax.js*/,"biz_wap/jsapi/core.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/biz_wap/jsapi/core.js*/,"biz_common/dom/event.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/biz_common/dom/event.js*/,"appmsg/topic_tpl.html.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/appmsg/topic_tpl.html.js*/],function(t){
"use strict";
function e(t){
t.parentNode.removeChild(t);
}
function i(t,e){
var i=c;
e.img_url||(e.img_url=topic_default_img);
for(var o in e){
var a=new RegExp("{"+o+"}","g");
i=i.replace(a,e[o]);
}
var p=document.createElement("span");
p.className="db topic_area",p.innerHTML=i,t.parentNode.insertBefore(p,t),t.parentNode.removeChild(t),
r.tap(p,function(){
var e=location.protocol+"//mp.weixin.qq.com/mp/topic?action=topic_detail_page&topic_id="+t.getAttribute("data-topic-id")+"&topic_type="+t.getAttribute("data-topic-type")+"&sn="+t.getAttribute("data-topic-sn")+"&scene=101#wechat_redirect";
n.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
t&&-1!==t.err_msg.indexOf(":ok")||(location.href=e);
});
});
}
function o(t){
var o={
topic_id:t.getAttribute("data-topic-id"),
topic_type:t.getAttribute("data-topic-type"),
sn:t.getAttribute("data-topic-sn"),
biz:biz
};
p({
url:"/mp/topic?action=get_topic_info",
type:"post",
data:o,
success:function(o){
if(console.log(o),o=JSON.parse(o),0!=o.base_resp.ret)return void e(t);
var a={
title:o.title,
author:o.author||(o.leading_actor?o.leading_actor.replace(/\$\$/g," / "):"-"),
img_url:o.img_url,
msg_num:o.msg_num
};
i(t,a);
},
error:function(){
e(t);
}
});
}
function a(){
var t=document.getElementsByTagName("wxtopic");
t[0]&&o(t[0]);
}
var p=t("biz_wap/utils/ajax.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/biz_wap/utils/ajax.js*/),n=t("biz_wap/jsapi/core.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/biz_wap/jsapi/core.js*/),r=t("biz_common/dom/event.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/biz_common/dom/event.js*/),c=t("appmsg/topic_tpl.html.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/appmsg/appmsg/topic_tpl.html.js*/);
a();
});