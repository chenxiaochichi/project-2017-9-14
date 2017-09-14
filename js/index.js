//动态加载商品
$(function(){
	$.ajax({
		type:"get",
		url:"http://127.0.0.1/baicaowei/particulars.json",
		success : function(res){
			var str = "";
			for( var i in res ){
				str += `<a href="details.html?pid=${res[i].id}"><img src="img/${res[i].src}" /></a>`
			}
			$("#details").html(str);
		}
	});
})


//轮播图
var timer = setInterval(autoPlay,2500)
var index = 0;
function autoPlay(){
	index++;
	if( index == $("#lunbo ul li").size() ){
		index = 0;
	}
	$("#lunbo ol li").eq(index).addClass("active").siblings().removeClass("active");
	$("#lunbo ul li").eq(index).animate({"left":0},2000,function(){
		$(this).css("z-index",0).siblings().css({"z-index":1,"left":1920});
		flag = true;
	})
}
//点击对应下标切换图
$("#lunbo ol li").mouseover(function(){
	index = $(this).index()-1;
	autoPlay();
})
//定时器的开始和停止以及箭头的显示和隐藏
$("#lunbo").hover(function(){
	clearInterval(timer);
	$("#left").css("z-index",3);
	$("#right").css("z-index",3);
},function(){
	timer = setInterval(autoPlay,2500);	
	$("#left").css("z-index",0);
	$("#right").css("z-index",0);
})

//点击箭头切换图
var flag = true;
$("#lunbo #left").click(function(){
	if(flag){
		index--;
		if( index == -1 ){
			index = 2;
		}
		$("#lunbo ul li").eq(index).animate({"left":0},2000,function(){
			$(this).css("z-index",0).siblings().css({"z-index":1,"left":-1920});
			flag = true;
		})
		flag = false;
	}
})
$("#lunbo #right").click(function(){
	if(flag){
		autoPlay();
		flag = false;	
	}
})



//楼梯
$(".f1").click(function(){
	var h = $(".1f").offset().top;
	document.body.scrollTop = document.documentElement.scrollTop = h;
})
$(".f2").click(function(){
	var h = $(".2f").offset().top;
	document.body.scrollTop = document.documentElement.scrollTop = h;
})
$(".f3").click(function(){
	var h = $(".3f").offset().top;
	document.body.scrollTop = document.documentElement.scrollTop = h;
})
$(".f4").click(function(){
	var h = $(".4f").offset().top;
	document.body.scrollTop = document.documentElement.scrollTop = h;
})
$(".f5").click(function(){
	var h = $(".5f").offset().top;
	document.body.scrollTop = document.documentElement.scrollTop = h;
})
$(".f6").click(function(){
	var h = $(".6f").offset().top;
	document.body.scrollTop = document.documentElement.scrollTop = h;
})


//回顶部
$("#slide #top").click(function(){
	$("body,html").animate({"scrollTop":0},1000);
})


//倒计时
var start = new Date();
var end = new Date( "2017-9-16 14:00:00" );
var t = ( end.getTime() - start.getTime() )/1000;
showTime();
function showTime(){
	var h = parseInt( t/3600 );
	var m = parseInt( (t-h*3600)/60 );
	var s = parseInt( t-h*3600-m*60 );
	$("#time span").html( h+"小时"+m+"分钟"+s+"秒" );
}
var timer_ = setInterval(function(){
	t--;
	if( t < 0 ){
		$("#time p").html( "抢购结束了" );
		clearInterval(timer_);
	}else{
		showTime();
	}
},1000)

