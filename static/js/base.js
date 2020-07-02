

//表单序列化
(function($){
	$.fn.serializeJson=function(){
		var serializeObj={};
		var array=this.serializeArray();
		var str=this.serialize();
		$(array).each(function(){
			if(serializeObj[this.name]){
				if($.isArray(serializeObj[this.name])){
					serializeObj[this.name].push(this.value);
				}else{
					serializeObj[this.name]=[serializeObj[this.name],this.value];
				}
			}else{
				serializeObj[this.name]=this.value;
			}
		});
		return serializeObj;
	};
})(jQuery);


//打印JS对象
function writeObj(obj){ 
	var description = "aa"; 
	for(var i in obj){ 
		var property=obj[i]; 
		description+=i+" = "+property+"\n"; 
	} 
	console.log(description); 
} 

//设置专业id
function setProfession(id,name)
{

	$.ajax({
		url: 'getProfession',
		type: 'post',
		dataType: 'json',
		data: {'id': id},
	})
	.done(function() {
		console.log("setProfession success");
		//struts的取值只在第一次加载页面的时候生成，之后session中的值改变也不会更新
		$("#professionid").attr('profid', id);
		$("#professionid").html(name);
		
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});	
}
//得到专业id
function getProfessionid () {
	 // body...  

	 var pid=$("#professionid").attr('profid');

	 // $.ajax({
	 // 	url: 'MAJgetProfession',
	 // 	type: 'post',
	 // 	dataType: 'json',
	 // 	async:false,
	 // 	data: {param1: 'value1'},
	 // })
	 // .done(function(result) {
	 // 	console.log("getProfessionidsuccess");
	 // 	result=JSON.parse(result);
	 // 	pid=result.id;
	 // })
	 // .fail(function() {
	 // 	console.log("getProfessionid error");
	 // })
	 // .always(function() {
	 // 	console.log("getProfessionid complete");
	 // });
	 
	 
	 return pid;
	}

//删除请求
function deleteAjax (deleteurl,id,callback) {
	 // body...  
	 $.ajax({
	 	url: deleteurl,
	 	type: 'post',
	 	dataType: 'json',
	 	data: {'id': id},
	 })
	 .done(function(result) {
	 	console.log("Delete success");
	 	if (result['code']=="fail") {
	 		// statement
	 		alert("删除失败!");
	 	}else if(result['code']=="success")
	 	{
	 		alert("删除成功！");
	 		callback();
	 	}
	 })
	 .fail(function() {
	 	console.log("Delete error");
	 	alert("ajax请求删除失败！");
	 })
	 .always(function() {
	 	console.log("Delete complete");
	 });
	 
	}

//ajax修改
function updateAjax (updateurl,pjson,callback) {
	 // body...  
	 $.ajax({
	 	url: updateurl, //
	 	type: 'post',
	 	dataType: 'json',
	 	data: {'jsonstr': pjson},
	 })
	 .done(function(result) {
	 	console.log("Update success");

	 	if (result['code']=="success") {
	 		// statement
	 		alert("修改成功！");
	 		callback();
	 	}else{
	 		alert("修改失败！");
	 	}

	 })
	 .fail(function() {
	 	console.log("Update error");
	 })
	 .always(function() {
	 	console.log("Update complete");
	 });
	}

//ajax增加
function saveAjax (saveurl,pjson,callback) {
	 // body...  

	 $.ajax({
	 	url: saveurl,//'saveProfessionCultivationPlan'
	 	type: 'post',
	 	dataType: 'json',
	 	data: {"jsonstr": pjson},
	 })
	 .done(function(result) {
	 	console.log("Save success");

	 	if (result['code']=="success") {
	 		// statement
	 		alert("增加成功！");
	 		//
			//
			//
			// (getProfessionid());  //刷新专业计划
	 		callback();
	 		//alert("取得的专业id"+getProfessionid()); //没有定义professionid
	 	}else{
	 		alert("增加失败！");
	 	}
	 })
	 .fail(function() {
	 	console.log("Save error");
	 	alert("ajax请求增加失败！");
	 })
	 .always(function() {
	 	console.log("Save complete");
	 });
	}


//得到学院与专业
function getSchoolProfessions () {
	// body...

	$.ajax({
		url: 'getSchoolProfessions',
		type: 'post',
		data: {param1: 'value1'},
		success: function (result) {
			console.log("getSchoolProfessions success");
			if (result == null) {
				alert("获取学院与专业失败");
			} else {
				var jsr = result;
				res = jQuery.parseJSON(result);
				// alert(res['schoollist'][0]['fields'].schoolName);
				// alert(res['professionlist'][0]['fields'].professionName);
				// alert(res['professionlist'].length)


				//console.log(jsr.professionlist.length);
				str = '<li class="bg-li-0"><a >学院与专业</a></li>';
				var j = 0
				for (var i = 0; i < res['schoollist'].length; i++) {

					str += '<li data-toggle="collapse" data-target="#collapse-school' + i + '" class="bg-li-1">';
					str += '<a>' + res['schoollist'][i]['fields'].schoolName + '</a>'
					str += ' <ul id="collapse-school' + i + '" class="nav collapse ">';
					while (j < res['professionlist'].length && res['professionlist'][j]['fields'].school_id == res['schoollist'][i].pk) {
						//console.log("j="+j);
						var hrefarg = 'javascript:reSet(' + res['professionlist'][j].pk + ',"' + res['professionlist'][j]['fields'].professionName + '")';
						str += '<li class="bg-li-2"><a href= ' + hrefarg + '>' + res['professionlist'][j]['fields'].professionName + '</a></li>';
						j++;
					}
					str += '</ul></li>';

				}
				$("#schoolprofessions").children().remove();
				$("#schoolprofessions").html(str);
			}
		},
		error: function () {
			console.log("getSchoolProfessions error");
		}
	})
}
	 // $.ajax({
	 // 	url: 'getSchoolProfessions',
	 // 	type: 'post',
	 // 	dataType: 'json',
	 // 	data: {param1: 'value1'},
	 // })
	 // .done(function(result) {
	 //
	 // 	console.log("getSchoolProfessions success");
	 //
	 // 	if (result==null) {
	 // 		alert("获取学院与专业失败");
	 // 	}else{
	 // 		var jsr= result;
	 // 		//console.log(JSON.stringify(jsr.shoollist));
	 // 		//console.log(JSON.stringify(jsr.professionlist));
	 // 		//var professionlist=jsr.professionlist;
	 //
	 // 		//console.log(jsr.professionlist.length);
	 // 		str='<li class="bg-li-0"><a >学院与专业</a></li>';
	 // 		var j=0
	 // 		for (var i = 0; i < jsr.schoollist.length; i++) {
	 //
	 // 			str+='<li data-toggle="collapse" data-target="#collapse-school'+i+'" class="bg-li-1">';
	 // 			str+='<a>'+ jsr.schoollist[i].schoolname+'</a>'
	 // 			str+=' <ul id="collapse-school'+i+'" class="nav collapse ">';
	 // 			while(j<jsr.professionlist.length&&jsr.professionlist[j].school_id==jsr.schoollist[i].id){
	 // 				//console.log("j="+j);
	 // 				var hrefarg='javascript:reSet('+jsr.professionlist[j].id+',"'+jsr.professionlist[j].professionname+'")';
	 // 				str+='<li class="bg-li-2"><a href= '+hrefarg+'>'+jsr.professionlist[j].professionname+'</a></li>';
	 // 				j++;
	 // 			}
	 // 			str+='</ul></li>';
	 //
	 // 		}
	 // 		$("#schoolprofessions").children().remove();
	 // 		$("#schoolprofessions").html(str);
	 // 	}
	 //
	 // })
	 // .fail(function() {
	 // 	console.log("getSchoolProfessions error");
	 // })
	 // .always(function() {
	 // 	console.log("getSchoolProfessions complete");
	 // });

	// }


//权限控制
function rightControl () {
	 // body...  
	 $.ajax({
	 	url: 'queryRight',
	 	type: 'POST',
	 	dataType: 'json',
	 	data: {param1: 'value1'},
	 })
	 .done(function(result) {
	 	console.log("rightQuery success");
	 	if(result['code']=="success")
	 	{
	 		//有权限，解除禁用
	 		$(".obe-right-control").removeClass('disabled');
	 	}else{
			//无权限，禁用按钮
			$(".obe-right-control").addClass('disabled');	
		}
	})
	 .fail(function() {
	 	console.log("rightQuery error");
	 })
	 .always(function() {
	 	console.log("rightQuery complete");
	 });
	}


//登陆-模态框
function login () {
	 // body... 
	 var str="";
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="form-group col-md-10">'+
	 '<label for="useraccount"> 用户账号： </label> <input type="text"'+
	 ' class="form-control" name="account" id="useraccount" />'+
	 '</div>'+
	 '<div class="form-group col-md-10">'+
	 '<label for="userPassword"> 密码：</label> <input type="password"'+
	 'class="form-control" name="password" id="userPassword"  />'+
	 '</div>'+
	 '</div>'+
	 '</form>';
	 //显示模态框
	 $('#modal-title').html('登陆UJSOBE');
	 $('#modal-body').html(str);
	 $('#modal').modal('toggle'); //打开模态框
	 $('#modal-btn-submit').html('登陆');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	/* Act on the event */

	 	$('#modal').modal('hide'); //隐藏模态框
	 	
	 	var jsr=$("#modal-form").serializeJson();	 	
	 	jsr=JSON.stringify(jsr);
	 	$.ajax({
	 		url: 'login',
	 		type: 'post',
	 		dataType: 'json',
	 		data: {"jsonstr": jsr},
	 	})
	 	.done(function(result) {
	 		var jsr = result['code'];
	 		console.log("login success");
	 		if(jsr=="success")
	 		{
	 			//login success
	 			//刷新权限
	 			rightControl();
	 			alert("登陆成功!");

	 			updatePageUser();


	 		}else{
	 			alert("登陆失败!请重新登陆")
	 		}
			

		})
	 	.fail(function() {
	 		console.log("login error");
	 	})
	 	.always(function() {
	 		console.log("login complete");
	 	});
	 	
	 });
	}

//退出
function logout(){

	$.ajax({
		url: 'logout',
		type: 'post',
		dataType: 'json',
		data: {param1: 'value1'},
	})
	.done(function(result) {
		console.log("logout success");

		if(result['code']="success")
		{
			alert("退出成功!");
			//刷新权限
			rightControl();
			
			updatePageUser();
		}else{
			alert("退出异常!");
		}
	})
	.fail(function() {
		console.log("logout error");
	})
	.always(function() {
		console.log("logout complete");
	});
	
}

//更新页面用户信息
function updatePageUser(){
	$.ajax({
		url: 'updatePageUser',
		type: 'post',
		dataType: 'json',
		data: {param1: 'value1'},
	})
	.done(function(result) {
		console.log("updatePageUser success");
		var jsr=result;

		console.log(jsr);

		$("#user").attr('username',jsr.username);
		$("#user").attr("account",jsr.account);
		$("#user").attr("rolename",jsr.rolename);

	})
	.fail(function() {
		console.log("updatePageUser error");
	})
	.always(function() {
		console.log("updatePageUser complete");
	});
	
}


//用户信息显示
function showUser(){

	var username=$("#user").attr('username');
	var account=$("#user").attr("account");
	var rolename=$("#user").attr('rolename');
	var str="";
	str+='<p>用户名：'+username+'</p>'+
	'<p>登陆账号:'+account+'</p>'+	
	'<p>用户角色:'+rolename+'</p>';
	//显示模态框
	$('#modal-title').html('用户信息显示');
	$('#modal-body').html(str);
	 $('#modal').modal('toggle'); //打开模态框
	 $('#modal-btn-submit').html('用户退出');
	 $('#modal-btn-submit').unbind('click').click(function(){
	 	logout();
	  	$('#modal').modal('hide'); //隐藏模态框
	  });

	}

//用于自动补全的下拉列表数据获取
//课程
function selectCourseData(){
	var defer = $.Deferred();
	$.ajax({
		url: 'selectCourse',
		type: 'post',
		dataType: 'json',
	})
	.done(function(result) {
		console.log("selectCourseData success");
		defer.resolve(result);
	})
	.fail(function() {
		console.log("selectCourseData error");
	})
	.always(function() {
		console.log("selectCourseData complete");
	});
	return defer.promise();
}