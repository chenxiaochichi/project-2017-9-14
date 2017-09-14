//注册
var flagName = null;
$("#name").blur(function(){
	var reg = /^\w{6,10}$/;
	var str = $(this).val();//jquery中操作表单用val
	if( !reg.test(str) ){
		$("#s1").html("用户名不合法");
		flagName = false;
	}else{
		$("#s1").html("正确");
		flagName = true;
	}
})
var flagPwd = null;
$("#pwd").blur(function(){
	var reg = /^\w{6,}$/;
	var str = $(this).val();
	if( !reg.test(str) ){
		$("#s2").html("密码不合法");
		flagPwd = false;
	}else{
		$("#s2").html("正确");
		flagPwd = true;
	}
})
var flagQpwd = null;
$("#qpwd").blur(function(){
	if( $(this).val() == $("#pwd").val() ){
		$("#s3").html("正确");
		flagQPwd = true;
	}else{
		$("#s3").html("两次密码输入不一致");
		flagQPwd = false;
	}
})

function yzm(){
	for( var i = 0 ; i < 4 ; i++ ){
			var code = Math.floor( Math.random()*(122-48+1) ) + 48;
			if( code >= 58 && code <= 64 || code >= 91 && code <= 96 ){
				i--;
			}else{
				return String.fromCharCode(code);
			}
	}
}
$("#yzm").focus(function(){
	var a = yzm();
	var b = yzm();
	var c = yzm();
	var d = yzm();
	$("#yzm_").val( a+b+c+d );
	$(this).val("");
})
$("#a").click(function(){
	var a = yzm();
	var b = yzm();
	var c = yzm();
	var d = yzm();
	$("#yzm_").val( a+b+c+d );
})

var flagCode = null;
$("#yzm").blur(function(){
	if( $("#yzm").val() == $("#yzm_").val() ){
		flagCode = true;
	}else{
		flagCode = false;
		$("#yzm").val("验证码错误");
	}
})

$("#f1").submit(function(){
	if( flagName && flagPwd && flagCode ){
		setCookie( "uname" , $("#name").val() , 7 );
		setCookie( "upwd" , $("#pwd").val() , 7 );
		alert("注册成功");
		return true;
	}else{
		alert("注册失败");
		return false;
	}
})



//登录
$("#dl").submit(function(){
	var str = document.cookie;
	var arr = str.split(";");
	for( var i = 0 ; i < arr.length ; i++ ){
		var item = arr[i].split("=");
		console.log(item)
		if( item[0] == "uname" ){
			var uname = item[1];
		}
		if( item[0] == " upwd" ){
			var upwd = item[1];
		}	
	}
	if( uname == $("#uname").val() && upwd == $("#upwd").val() ){
		alert("登录成功");
		return true;
	}else if( uname != $("#uname").val() ){
		alert("用户名不存在");
		return false;
	}else if( uname == $("#uname").val() && upwd != $("#upwd").val() ){
		alert("用户名与密码不符");
		return false;
	}
})