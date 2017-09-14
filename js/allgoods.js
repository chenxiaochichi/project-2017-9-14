//选项卡	
$("#tab ul li").mouseenter(function(){
	$(this).addClass("active").siblings().removeClass("active");
	$("#tab .main").eq( $(this).index() ).addClass("selected").siblings().removeClass("selected");
})


//分页显示商品信息
var index = 1;
var pageNum = 24;
showData();
function showData(){
	ajaxGet("http://127.0.0.1/baicaowei/allgoods.json",fn);
	function fn(res){
		var arr = JSON.parse(res);
		var str = "";
		for( var i = (index-1)*pageNum ; i < index*pageNum ; i++ ){
			if( i < arr.length ){
				str += `<li>
							<a href="#"><img src="img/${arr[i].src}" /</a>
							<a href="#">${arr[i].name}</a>
							<p>${arr[i].price}<span>已售:7249件</span></p>
							<span data-id=${arr[i].id}  data-src=${arr[i].src}  data-name=${arr[i].name}  data-price=${arr[i].price} style="display:none"></span>
							<button>加入购物车</button>
						</li>`
			}
		}
		$("#shoplist").html(str);
		
		pageTotal = Math.ceil( arr.length/pageNum );
		
		var page = "";
		for( j = 1 ; j <= pageTotal ; j++ ){
			page += `<li>${j}</li>`	
		}
		$("#page").html(page);
		$("#page li").eq(index-1).addClass("light");
		
	}
}

$("#l").click(function(){
	if( index == 1 ){
		index = 1;
	}
	else{
		index--;
	}
	showData();
})
$("#r").click(function(){
	if( index == pageTotal ){
		index = pageTotal;
	}
	else{
		index++;
	}
	showData();
})

$("#page").on("click","li",function(){
	index = parseInt( $(this).html() );
	showData();
})


//添加到购物车
$(".goodslist").on("click","button",function(){
	var arr = [];
	var flag = true;
	var _json = {
		id : $(this).prev().data("id"),
		src : $(this).prev().data("src"),
		name : $(this).prev().data("name"),
		price : $(this).prev().data("price"),
		count : 1	
	}
	//解决再次点击时cookie被覆盖
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

