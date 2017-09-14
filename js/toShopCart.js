window.onload = function(){
	//ArtTemplate模板显示商品列表
	var data = {
		arr : []
	}
	ajaxGet("http://127.0.0.1/baicaowei/same.json",function(str){
		var arr = JSON.parse(str);
		data.arr = arr;
		var html = template("shoplist",data);
		$(".list").html(html);
	})
		
	
	//成功加入购物车商品显示
	var res = getCookie("goodslist");
	for( var i in res ){
		ch = `<a href="#" id="img"><img src="img/${res[i].src}" /></a>
			  <p class="name">${res[i].name}</p>				
			  <img src="img/success.jpg" id="pic"/>
			  <span>小计:${res[i].price}</span>
			  <p id="button">
				 <a href="allgoods.html" class="button">返回商品列表</a>
				 <a href="shopCart.html" class="button" id="btn">去购物车结算</a>					
			  </p>`	
	}
	$("#success").html(ch);	
	
	
}

