$(function(){
	var arr = getCookie("goodslist");
	var str = "";
	for( var i in arr ){
		str += `<div class="shop-item">
					<p><input type="checkbox" class="ck"/></p>
					<a href="#" id="img"><img src="img/${arr[i].src}" /></a>
					<a href="#" id="name">${arr[i].name}</a>
					<span id="price">${arr[i].price}元</span>
					<p id="sign"><span class="symbol">-</span><span id="count">${arr[i].count}</span><span class="symbol">+</span></p>
					<span id="total">${ arr[i].price * arr[i].count }</span>
					<span data-id=${arr[i].id} style="display:none"></span>
					<a href="#" class="del">删除</a>
				</div>`
	}
	$(".shoplist").html(str);
	
	//删除
	$(".del").click(function(){
		var id = $(this).prev().data("id");
		for( var i in arr ){
			if( arr[i].id == id ){
				if( confirm("确定要删除么") ){
					arr.splice(i,1);
					setCookie( "goodslist",JSON.stringify(arr) );
					$(this).parent().remove();					
				}
			}
		}
	})
	//加减
	$(".symbol").click(function(){
		var sign = $(this).html();
		var id = $(this).parent().next().next().data("id");
		var num = $(this).parent().find("#count").html();
		if( sign == "-" && num == 1 ){
			return;
		}
		for( var i in arr ){
			if( id == arr[i].id ){
				sign == "+" ? arr[i].count++ : arr[i].count--;
				setCookie( "goodslist",JSON.stringify(arr) );
				$(this).parent().find("#count").html(arr[i].count);
				$(this).parent().parent().find("#total").html( (arr[i].price*arr[i].count).toFixed(1) );
			}
		}
	})
		
	//点击复选框 结算
	var num = 0;
	$(".ck").click(function(){
		num++;
		if( num % 2 ){			
			$("#acount").css("background","red");
		}else{
			$("#acount").css("background","#b0b0b0");
		}		
		account();
		$("#acount").click(function(){
			location.href = "login.html";
		})
	})
	
	//全选
	$("#selectAll").click(function(){
		num++;
		if( num % 2 ){			
			$("#acount").css("background","red");
		}else{
			$("#acount").css("background","#b0b0b0");
		}
		$(".ck").prop( "checked" , $(this).prop("checked") );
		account();
		$("#acount").click(function(){
			location.href = "login.html";
		})
	})
})

//结算
function account(){
	var count = 0;
	var money = 0;
	$(".ck:checked").each(function(index){
		count += parseInt( $(this).parent().parent().find("#count").html() );
		money += Number( $(this).parent().parent().find("#total").html() );
	})
	$(".count").html(count);
	$(".money").html(money.toFixed(1));
}









