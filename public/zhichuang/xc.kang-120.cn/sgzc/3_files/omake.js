// JavaScript Document


$(document).ready(function(e) {
    $("#touch").click(function(){
		$(".tg").show();
		$(".touch").hide();
	});
});


$(document).ready(function(e) {
    $("#cancel").click(function(){
		$(".tg").hide();
		$(".touch").show();
	});
});


