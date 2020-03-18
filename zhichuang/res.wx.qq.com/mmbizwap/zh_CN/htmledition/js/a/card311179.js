define("a/card.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/a/card.js*/,["biz_common/dom/event.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_common/dom/event.js*/,"biz_common/utils/report.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_common/utils/report.js*/,"a/a_report.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/a/a_report.js*/,"biz_wap/utils/ajax.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_wap/utils/ajax.js*/,"biz_wap/utils/position.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_wap/utils/position.js*/,"biz_wap/jsapi/core.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_wap/jsapi/core.js*/,"biz_wap/jsapi/cardticket.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_wap/jsapi/cardticket.js*/],function(e,t,a,i){
"use strict";
function o(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function s(e){
var t=e.adData,a=e.pos_type||0,i=t.tid,r=t.type,p=t.url,d=t.rl,l={};
e.report_param=e.report_param||"";
var m=e.btn;
if(m){
n.on(m,"click",function(n){
if(!l[i]){
l[i]=!0;
var m,j,u,f,b=!!n&&n.target;
b&&(m=_.getX(b,"js_ad_link")+n.offsetX,j=_.getY(b,"js_ad_link")+n.offsetY,u=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
f=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
c({
type:r,
report_type:2,
click_pos:0,
url:encodeURIComponent(p),
tid:i,
rl:encodeURIComponent(d),
__biz:biz,
pos_type:a,
pt:105,
pos_x:m,
pos_y:j,
ad_w:u||0,
ad_h:f||0
},function(){
l[i]=!1,o(37,e),s.openCardDetail(t.card_id,t.card_ext,e);
});
}
return!1;
});
}
}
var n=e("biz_common/dom/event.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_common/dom/event.js*/),r=e("biz_common/utils/report.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_common/utils/report.js*/),p=e("a/a_report.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/a/a_report.js*/),c=p.AdClickReport,_=(e("biz_wap/utils/ajax.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_wap/utils/ajax.js*/),
e("biz_wap/utils/position.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_wap/utils/position.js*/)),d=(e("biz_wap/jsapi/core.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_wap/jsapi/core.js*/),e("biz_wap/jsapi/cardticket.js"/*tpa=http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/a/biz_wap/jsapi/cardticket.js*/));
return s.openCardDetail=function(e,t,a){
d.openCardDetail({
card_id:e,
card_ext:t,
success:function(){
!!a&&o(38,a);
},
error:function(){
!!a&&o(39,a),i("调起卡券错误");
},
access_denied:function(){
!!a&&o(40,a),i("异常错误[access_denied]");
}
});
},s;
});