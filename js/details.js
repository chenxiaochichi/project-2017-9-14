window.onload = function(){
	var href = location.href;
	//http://127.0.0.1/baicaowei/details.html?pid=shop01
	var brr = href.split("?")[1];
	var pid = brr.split("=")[1];
	ajaxGet("http://127.0.0.1/baicaowei/particulars.json",function(res){
		var arr = JSON.parse(res);	
		var str = "";
		var ch = "";
		for( var i in arr ){
			if( pid == arr[i].id ){
				str += `<div id="small" class="small">
							<img src="img/${arr[i].middle1}"  />
							<img src="img/${arr[i].middle2}"  />
							<img src="img/${arr[i].middle3}"  />
							<img src="img/${arr[i].middle4}"  />
							<img src="img/${arr[i].middle5}"  />
							<div id="mask"></div>
						</div>
						<div id="big">
							<img src="img/${arr[i].big1}" class="bigImg" />
							<img src="img/${arr[i].big2}" class="bigImg" />
							<img src="img/${arr[i].big3}" class="bigImg" />
							<img src="img/${arr[i].big4}" class="bigImg" />
							<img src="img/${arr[i].big5}" class="bigImg" />
						</div>
						<ul id="bottom">
							<li><img src="img/${arr[i].small1}" /</li>
							<li><img src="img/${arr[i].small2}" /</li>
							<li><img src="img/${arr[i].small3}" /</li>
							<li><img src="img/${arr[i].small4}" /</li>
							<li><img src="img/${arr[i].small5}" /</li>
						</ul>`
				ch += ` <h3>${arr[i].name}</h3>
						<p id="h">${arr[i].name_}</p>
						<img src="img/price.jpg"  />
						<a href="login.html">立即购买</a>
						<span data-id=${arr[i].id}  data-src=${arr[i].src}  data-name=${arr[i].name}  data-price=${arr[i].price} style="display:none"></span>
						<a href="#" class="car"><i class="iconfont" >&#xe73d;</i> 加入购物车</a>`							
			}
		}
		$("#box").html(str);
		$("#content").html(ch);
		
		
		$(".car").click(function(){
			var arr = [];
			var flag = true;
			var _json = {
				id : $(this).prev().data("id"),
				src : $(this).prev().data("src"),
				name : $(this).prev().data("name"),
				price : $(this).prev().data("price"),
				count : 1
			}
			var cookieInfo = getCookie("goodslist");
			if( cookieInfo.length != 0 ){
				arr = cookieInfo;
				for( var i in arr ){
					if( _json.id == arr[i].id ){
						arr[i].count++;
						flag = false;
						break;
					}
				}
			}
			if(flag){
				arr.push(_json);				
			}
			setCookie( "goodslist",JSON.stringify(arr) );
			location.href = "toShopCart.html";			
		})
		
		
		//放大镜(代码写在ajax里面)
		$("#goods li").on("mouseenter",function(){
			var index = $(this).index();
			$("#small img").eq(index).show().siblings("img").hide();
			$("#big img").eq(index).show().siblings().hide();
		})
		$("#goods #small").on({
			mouseenter : function(){
				$("#goods #big").show();
				$("#goods #mask").show();
			},
			mouseleave : function(){
				$("#goods #big").hide();
				$("#goods #mask").hide();
			},
			mousemove : function(e){
				var e = e || event;
				var x = e.pageX - $("#small").offset().left - $("#mask").width()/2;
				var y = e.pageY - $("#small").offset().top - $("#mask").height()/2;
				var maxLeft = $("#small").width() - $("#mask").width();
				var maxTop = $("#small").height() - $("#mask").height();
				x = x < 0 ? 0 : ( x > maxLeft ? maxLeft : x );
				y = y < 0 ? 0 : ( y > maxTop ? maxTop : y );
				$("#mask").css({
					left : x,
					top : y
				})
				
				var bigImgLeft = x * $(".bigImg").width() / $("#small").width();
				var bigImgTop = y * $(".bigImg").height() / $("#small").height();
				$(".bigImg").css({
					left : -bigImgLeft,
					top : -bigImgTop
				})
			}
		})
		
	})
}


//吸顶
$(window).scroll(function(){
	var sTop = $(document).scrollTop();
	if( sTop > 813 ){
		$("#nav2").css({
			"position" : "fixed",
			"top" : 0,
			"left" : 140
		})
	}else{
		$("#nav2").css({
			"position" : "",
		})
	}
})


//ajax动态加载商品
$(function(){
	$.ajax({
		type:"get",
		url:"http://127.0.0.1/baicaowei/data.json",
		success : function(arr){
			var str = "";
			for( var i in arr ){
				str += `<li>
							<a href="#">
								<img src="img/${arr[i].src}"  />
								<p>${arr[i].name}</p>
								<p>${arr[i].price}</p>
							</a>
							<button>立即抢购</button>
						</li>`	
			}
			$(".shoplist").html(str);	
		}
	});
})


//选项卡
$("#nav2 #tab_ ul li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
})

$("#det .left #tab ul li").mouseenter(function(){
	$(this).addClass("active").siblings().removeClass("active");
	$(".products div").eq( $(this).index() ).addClass("selected").siblings().removeClass("selected");
})





