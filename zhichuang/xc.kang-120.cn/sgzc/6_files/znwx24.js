var znwxarr =['hexi2289','hexi2289'];//随机出现的多个微信号

var znwx = Math.floor((Math.random() * znwxarr.length));
var znstxlwx = znwxarr[znwx];
var znwx_img = "<img src='wxkefu/3644823.jpg'/*tpa=http://xc.kang-120.cn/sgzc/6_files/wxkefu/3644823.jpg*/>";


//底部
/*document.writeln("<div class=\"znendwx\" onclick=\"callznendwx()\"><img src=\"images/znwx01.gif\"/*tpa=http://xc.kang-120.cn/sgzc/6_files/images/znwx01.gif*/  height=\"40\" border=\"0\" align=\"absmiddle\" style=\"margin:0px 10px;width:auto !important; height:40px !important;\">点击添加微信好友：<script>document.write(znstxlwx);</script></div>");*/

/*document.writeln("<div class=\"zntop_tip\"><div class=\"znto_pc\"><img src=\"wxkefu/znwx.png\"/*tpa=http://xc.kang-120.cn/sgzc/6_files/wxkefu/znwx.png*/ align=\"absmiddle\" border=\"0\" style=\"margin:0px 5px 0px 0px;width:auto !important; height:70px !important;\"></div><div style=\"font-size: 15px; line-height: 170%; padding-top: 10px;\"><b>详细了解请加客服微信：</b><br><span style=\"color: rgb(230, 0, 19); font-size: 20px; background-color: rgb(255, 244, 92);font-weight:bold;\"><script>document.write(znstxlwx);</script></span> （←长按可以复制）</div></div>");
*/

document.writeln("<div class='znwxpiaofu'>扫一扫加客服<br>微信号：<script>document.write(znstxlwx);</script><br><script>document.write(znwx_img);</script><br></div>");



document.writeln("<div id=\"flow_znwx\">");//浮窗
document.writeln("      <p id=\"znwx_icon\"></p>");
document.writeln("      <div id=\"znwx_copybg\"></div>");
document.writeln("      <div id=\"znwx_copy\">");
document.writeln("        <em id=\"zncopy_num\">(第一步：长按复制微信号)</em><br>");
document.writeln("      <span><script>document.write(znstxlwx);</script></span><br>");
document.writeln("        <em id=\"zncopy_num\">(第二步：打开微信加好友)</em><br>");
document.writeln("<a href=\"weixin://\"><img src=\"wxkefu/znwx02.gif\"/*tpa=http://xc.kang-120.cn/sgzc/6_files/wxkefu/znwx02.gif*/ width=\"42%\" border=\"0\" style=\"width:42% !important; height:auto !important;\" ></a>");
//document.writeln("        <button onClick=\"window.location='weixin://'\">请打开微信添加朋友</button>");
document.writeln("        <p id=\"close_znwx\"></p>");
document.writeln("      </div>");
document.writeln("</div>");



var znwx_icon = document.getElementById('znwx_icon'),znwx_copy = document.getElementById('znwx_copy'),znwx_copybg = document.getElementById('znwx_copybg'),close_znwx = document.getElementById('close_znwx'),zncopy_num = document.getElementById('zncopy_num'),znwx_num = document.getElementById('znwx_num');
znwx_icon.onclick =function(){this.style.display = 'none';znwx_copy.style.display = 'block';znwx_copybg.style.display = 'block';};		
close_znwx.onclick = function(){znwx_copy.style.display = 'none';znwx_copybg.style.display = 'none';znwx_icon.style.display = 'block';};
function callznendwx(){znwx_icon.style.display = 'none';znwx_copy.style.display = 'block';znwx_copybg.style.display = 'block';}
function getznwebwx(){znwx_copy.style.display = 'block';znwx_copybg.style.display = 'block';}
