
//文档准备完毕
$(document).ready(function() {

	//设置专业id
	setProfession(1,"计算机科学与技术");

	//用户信息
	updatePageUser();
	//加载专业
	getSchoolProfessions ();

	var jsr={profession:{id:1}};
	jsr=JSON.stringify(jsr); 
	//{"profession":{"id":"5"}},稍转换的有点问题，应该是因为调用的是函数？但是fastjson可以正确转换,那么暂时就怎样
	professionplanQuery(jsr);
	graduationcreditrequiredQuery(jsr);
	groupcourseQuery(jsr);
	publicelectiverequiredQuery(jsr);
	jsr={professionId:1};
	jsr=JSON.stringify(jsr);
	//console.log(jsr);
	viewcoursecultivationplanQuery(jsr);
	viewpracticecultivationplanQuery(jsr);


	//add按钮绑定处理函数
	$("#add-btn-professionplan").attr('href', 'javascript:addProfessionCultivationPlan()');
	$("#add-btn-graduationcreditrequired").attr('href', 'javascript:addGraduationcreditrequired()');
	$("#add-btn-groupcourse").attr('href', 'javascript:addGroupcourse()');
	$("#add-btn-publicelectiverequired").attr('href', 'javascript:addPublicelectiverequired()');
	$("#add-btn-coursecultivationplan").attr('href', 'javascript:addCoursecultivationplan()');
	$("#add-btn-practicecultivationplan").attr('href', 'javascript:addPracticecultivationplan()');


	//条件查询按钮绑定处理函数
	$("#btn-query-coursecultivationplan").click(function() {
		/* Act on the event */
		//获取查询条件
		var jsr=$("#query-condition-coursecultivationplan-form").serializeJson();
		jsr.professionId=getProfessionid();
		jsr=JSON.stringify(jsr);
		viewcoursecultivationplanQuery(jsr);
	});
	$("#btn-query-practicecultivationplan").click(function() {
		/* Act on the event */
		var jsr=$("#query-condition-practicecultivationplan-form").serializeJson();
		jsr.professionId=getProfessionid();
		jsr=JSON.stringify(jsr);
		viewpracticecultivationplanQuery(jsr);
	});
	


	//隐藏各面板
	$(function () { $('#collapse-professionplan').collapse('show')});
	$(function () { $('#collapse-coursecultivationplan').collapse('show')});
	$(function () { $('#collapse-practicecultivationplan').collapse('show')});

	$('a[href^=#section-]').click(function() {
		var target = document.getElementById(this.hash.slice(1));
		if (!target) return;
		var targetOffset = $(target).offset().top-50;
		$('html,body').animate({scrollTop: targetOffset}, 400);
		return false;
	});
});

function reSet (id,name) {
	 // body...  
	 //设置专业
	 $.ajax({
	 	url: 'setPageProfession',
	 	type: 'post',
	 	dataType: 'json',
	 	data: {'id': id},
	 })
	 .done(function() {
	 	console.log("setProfession success");
	 	$("#professionid").attr('profid', id);
	 	$("#professionid").html(name);
	 	console.log("profid="+getProfessionid());
	 	var jsr={profession:{id:getProfessionid()}};
	 	jsr=JSON.stringify(jsr); 
	 	professionplanQuery(jsr);
	 	graduationcreditrequiredQuery(jsr);
	 	groupcourseQuery(jsr);
	 	publicelectiverequiredQuery(jsr);
	 	jsr={professionId:getProfessionid()};
	 	jsr=JSON.stringify(jsr);
	 	viewcoursecultivationplanQuery(jsr);
	 	viewpracticecultivationplanQuery(jsr);


	 })
	 .fail(function() {
	 	console.log("error");
	 })
	 .always(function() {
	 	console.log("complete");
	 });	


	}


//模态框-增加
//
function addProfessionCultivationPlan () {
	 // body...  
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">专业ID</span>'+
	 // '<input type="text" class="form-control" id="modal-professionid" value="">'+ //name="profession.id" 不能被识别为成员对象
	 // '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">主干课程</span>'+
	 '<input type="text" class="form-control" name="corediscipline" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row <br>
	 '<div class="row">'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group"><span class="input-group-addon">通识教育</span></div></div>'+
	 '</div>'+   //end row 
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学分</span>'+
	 '<input type="text" class="form-control" name="tsjyCredit" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学时</span>'+
	 '<input type="text" class="form-control" name="tsjyPeriod" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">必修比例</span>'+
	 '<input type="text" class="form-control" name="tsjyCompulsoryratio" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">选修比例</span>'+
	 '<input type="text" class="form-control" name="tsjyElectiveratio" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row <br>
	 '<div class="input-group"><span class="input-group-addon">专业基础</span></div>'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学分</span>'+
	 '<input type="text" class="form-control" name="zyjcCredit" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学时</span>'+
	 '<input type="text" class="form-control" name="zyjcPeriod" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">必修比例</span>'+
	 '<input type="text" class="form-control" name="zyjcCompulsoryratio" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">选修比例</span>'+
	 '<input type="text" class="form-control" name="zyjcElectiveratio" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row <br>
	 '<div class="input-group"><span class="input-group-addon">专业课</span></div>'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学分</span>'+
	 '<input type="text" class="form-control" name="zykCredit" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学时</span>'+
	 '<input type="text" class="form-control" name="zykPeriod" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">必修比例</span>'+
	 '<input type="text" class="form-control" name="zykCompulsoryratio" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">选修比例</span>'+
	 '<input type="text" class="form-control" name="zykElectiveratio" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row <br>
	 '<div class="input-group"><span class="input-group-addon">独立实践</span></div>'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学分</span>'+
	 '<input type="text" class="form-control" name="dlsjCredit" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学时</span>'+
	 '<input type="text" class="form-control" name="dlsjPeriod" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">必修比例</span>'+
	 '<input type="text" class="form-control" name="dlsjCompulsoryratio" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">选修比例</span>'+
	 '<input type="text" class="form-control" name="dlsjElectiveratio" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('增加专业培养计划');
	 $('#modal-body').html(str);
	 $('#modal').modal('toggle'); //打开模态框
	 $('#modal-btn-submit').html('增加');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	/* Act on the event */
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	jsr=JSON.stringify(jsr);	
	 	saveAjax('saveProfessionCultivationPlan',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={profession:{id:getProfessionid()}};
		 	 jsr=JSON.stringify(jsr);
		 	 professionplanQuery(jsr);

		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});

	}
//
function addGraduationcreditrequired () {
	 // body...  
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">必修课</span>'+
	 '<input type="text" class="form-control" name="compulsory" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">限选课</span>'+
	 '<input type="text" class="form-control" name="limitedelective" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">选修课</span>'+
	 '<input type="text" class="form-control" name="elective" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">校选修课</span>'+
	 '<input type="text" class="form-control" name="shcoolelective" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('增加毕业学分要求');
	 $('#modal-body').html(str);
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('增加');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	jsr=JSON.stringify(jsr);	
	 	saveAjax('saveGraduationCreditRequired',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={profession:{id:getProfessionid()}};
		 	 jsr=JSON.stringify(jsr);
		 	 graduationcreditrequiredQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}
//
function addGroupcourse () {
	 // body...  
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">组代码</span>'+
	 '<input type="text" class="form-control" name="groupcourseCode" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">组名称</span>'+
	 '<input type="text" class="form-control" name="groupcourseCategory" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学分</span>'+
	 '<input type="text" class="form-control" name="credit" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('增加课程类别分组学分要求');
	 $('#modal-body').html(str);
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('增加');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	//jsr.id=$(trid).attr('data-groupcourseid');
	 	jsr=JSON.stringify(jsr);	
	 	saveAjax('saveGroupcourse',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={profession:{id:getProfessionid()}};
		 	 jsr=JSON.stringify(jsr);
		 	 groupcourseQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}
//
function addPublicelectiverequired () {
	 // body...  
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">经济管理类</span>'+
	 '<input type="text" class="form-control" name="economicManagement" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">艺术鉴赏类</span>'+
	 '<input type="text" class="form-control" name="artAppreciation" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">人文科学类</span>'+
	 '<input type="text" class="form-control" name="humanitiesScience" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">自然科学类</span>'+
	 '<input type="text" class="form-control" name="naturalScience" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">综合教育类</span>'+
	 '<input type="text" class="form-control" name="comprehensiveeducation" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">通识平台选修</span>'+
	 '<input type="text" class="form-control" name="generalPlatform" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">工程技术类</span>'+
	 '<input type="text" class="form-control" name="engineeringTechnology" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('增加公选课学分要求');
	 $('#modal-body').html(str);
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('增加');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	jsr=JSON.stringify(jsr);	
	 	saveAjax('savePublicelectiverequired',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={profession:{id:getProfessionid()}};
		 	 jsr=JSON.stringify(jsr);
		 	 publicelectiverequiredQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}

//
function addCoursecultivationplan () {
	 // body...  
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程名称</span>'+
	 // '<input type="text" class="form-control" id="modal-courseid" value="">'+
	 '<select  class="selectpicker " data-live-search="true" id="modal-selectpicker1"></select>'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程分组类别</span>'+
	 // '<input type="text" class="form-control" id="modal-groupcourseid" value="">'+
	 '<select  class="selectpicker " data-live-search="true" id="modal-selectpicker2"></select>'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">修读学期</span>'+
	 '<input type="text" class="form-control" name="adviceterm" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">周学时</span>'+
	 '<input type="text" class="form-control" name="weekperiod" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('增加课程计划');
	 $('#modal-body').html(str);

	  //加载下拉列表
	  $.when(selectCourseData(),selectGroupcourseData()).done(function(result1,result2){

	  	if(result1==null||result2==null){
	  		alert("查询课程与课程分组类别错误");
	  	}else{
	  		var option1='';
	  		var opt1=result1['courselist'];
	  		for (var i = 0; i < opt1.length; i++) {
	  			option1+='<option value="'+opt1[i].pk+'">'+opt1[i]['fields'].courseName+'</option>';
	  		}
	  		$("#modal-selectpicker1").html(option1);

	  		var option2='';
	  		var opt2=result2['groupcourselist'];
	  		for (var i = 0; i < opt2.length; i++) {
	  			option2+='<option value="'+opt2[i].pk+'">'+opt2[i]['fields'].groupcourse_category+'</option>';
	  		}
	  		$("#modal-selectpicker2").html(option2);

	 		//重新修改select
	 		$('.selectpicker').selectpicker();
	 	}

	 });
	  
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('增加');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	jsr.course={id:$("#modal-selectpicker1").val()};
	 	jsr.groupcourse={id:$("#modal-selectpicker2").val()};
	 	jsr=JSON.stringify(jsr);	
	 	saveAjax('saveCoursecultivationplan',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={professionId:getProfessionid()};
		 	 jsr=JSON.stringify(jsr);
		 	 viewcoursecultivationplanQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}
//
function addPracticecultivationplan () {
	 // body...  
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程名称</span>'+
	 // '<input type="text" class="form-control" id="modal-courseid" value="">'+
	 '<select  class="selectpicker " data-live-search="true" id="modal-selectpicker"></select>'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">实践类别</span>'+
	 '<input type="text" class="form-control" name="type" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">形式</span>'+
	 '<input type="text" class="form-control" name="pattern" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">周数</span>'+
	 '<input type="text" class="form-control" name="weeks" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学期</span>'+
	 '<input type="text" class="form-control" name="adviceterm" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('增加实践计划');
	 $('#modal-body').html(str);

	 $.when(selectCourseData()).done(function(result){
	 	if(result==null){
	 		alert("查询课程错误");
	 	}else{
	 		var option='';
	 		var opt=result['courselist'];
	 		for (var i = 0; i < opt.length; i++) {
	 			option+='<option value="'+opt[i].pk+'">'+opt[i]['fields'].courseName+'</option>';
	 		}
	 		$("#modal-selectpicker").html(option);
	 		//重新修改select
	 		$('.selectpicker').selectpicker();
	 	}
	 });
	 


	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('增加');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	jsr.course={id:$("#modal-selectpicker").val()};
	 	jsr=JSON.stringify(jsr);	
	 	saveAjax('savePracticecultivationplan',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={professionId:getProfessionid()};
		 	 jsr=JSON.stringify(jsr);
		 	 viewpracticecultivationplanQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}

//模态框-修改

function modifyProfessionCultivationPlan (trid) {
	 // body... 
	 console.log('trid='+trid); 
	 var tds=$(trid).children('td');
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">专业ID</span>'+
	 // '<input type="text" class="form-control" id="modal-professionid" value="'+tds[0].innerHTML+'">'+ //name="profession.id" 不能被识别为成员对象
	 // '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">主干课程</span>'+
	 '<input type="text" class="form-control" name="corediscipline" value="'+tds[0].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row <br>
	 '<div class="row">'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group"><span class="input-group-addon">通识教育</span></div></div>'+
	 '</div>'+   //end row 
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学分</span>'+
	 '<input type="text" class="form-control" name="tsjyCredit" value="'+tds[1].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学时</span>'+
	 '<input type="text" class="form-control" name="tsjyPeriod" value="'+tds[2].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">必修比例</span>'+
	 '<input type="text" class="form-control" name="tsjyCompulsoryratio" value="'+tds[3].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">选修比例</span>'+
	 '<input type="text" class="form-control" name="tsjyElectiveratio" value="'+tds[4].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row <br>
	 '<div class="input-group"><span class="input-group-addon">专业基础</span></div>'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学分</span>'+
	 '<input type="text" class="form-control" name="zyjcCredit" value="'+tds[5].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学时</span>'+
	 '<input type="text" class="form-control" name="zyjcPeriod" value="'+tds[6].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">必修比例</span>'+
	 '<input type="text" class="form-control" name="zyjcCompulsoryratio" value="'+tds[7].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">选修比例</span>'+
	 '<input type="text" class="form-control" name="zyjcElectiveratio" value="'+tds[8].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row <br>
	 '<div class="input-group"><span class="input-group-addon">专业课</span></div>'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学分</span>'+
	 '<input type="text" class="form-control" name="zykCredit" value="'+tds[9].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学时</span>'+
	 '<input type="text" class="form-control" name="zykPeriod" value="'+tds[10].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">必修比例</span>'+
	 '<input type="text" class="form-control" name="zykCompulsoryratio" value="'+tds[11].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">选修比例</span>'+
	 '<input type="text" class="form-control" name="zykElectiveratio" value="'+tds[12].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row <br>
	 '<div class="input-group"><span class="input-group-addon">独立实践</span></div>'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学分</span>'+
	 '<input type="text" class="form-control" name="dlsjCredit" value="'+tds[13].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学时</span>'+
	 '<input type="text" class="form-control" name="dlsjPeriod" value="'+tds[14].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">必修比例</span>'+
	 '<input type="text" class="form-control" name="dlsjCompulsoryratio" value="'+tds[15].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">选修比例</span>'+
	 '<input type="text" class="form-control" name="dlsjElectiveratio" value="'+tds[16].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 
	 //显示模态框
	 $('#modal-title').html('修改专业培养计划');
	 $('#modal-body').html(str);
	 $('#modal').modal('toggle'); //打开模态框
	 //jsr=JSON.stringify(jsr);
	 //提交
	 $('#modal-btn-submit').html('修改');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	/* Act on the event */
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	jsr.id=$(trid).attr('data-professioncultivationplanid');
		//var jsr=JSON.stringify(str);
		//console.log('jsr='+jsr);
		//writeObj(str);	 
		//console.log(jsr);
		jsr=JSON.stringify(jsr);	
		//console.log(jsr);
		updateAjax('updateProfessionCultivationPlan',jsr,function () {
			/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={profession:{id:getProfessionid()}};
		 	 jsr=JSON.stringify(jsr);
		 	 professionplanQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	 
	}

	function modifyGraduationcreditrequired (trid) {
	 // body...  
	 var tds=$(trid).children('td');
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">必修课</span>'+
	 '<input type="text" class="form-control" name="compulsory" value="'+tds[0].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">限选课</span>'+
	 '<input type="text" class="form-control" name="limitedelective" value="'+tds[1].innerHTML+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">选修课</span>'+
	 '<input type="text" class="form-control" name="elective" value="'+tds[2].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">校选修课</span>'+
	 '<input type="text" class="form-control" name="shcoolelective" value="'+tds[3].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('修改毕业学分要求');
	 $('#modal-body').html(str);
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('修改');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	jsr.id=$(trid).attr('data-graduationcreditrequiredid');
	 	jsr=JSON.stringify(jsr);	
	 	updateAjax('updateGraduationcreditrequired',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={profession:{id:getProfessionid()}};
		 	 jsr=JSON.stringify(jsr);
		 	 graduationcreditrequiredQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}
//
function modifyGroupcourse (trid) {
	 // body...  
	 var tds=$(trid).children('td');
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 // '<div class="col-xs-12">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">ID</span>'+
	 // '<input type="text" class="form-control" name="id" value="'+tds[0].innerHTML+'">'+
	 // '</div></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">组代码</span>'+
	 '<input type="text" class="form-control" name="groupcourseCode" value="'+tds[1].innerHTML+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">组名称</span>'+
	 '<input type="text" class="form-control" name="groupcourseCategory" value="'+tds[2].innerHTML+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学分</span>'+
	 '<input type="text" class="form-control" name="credit" value="'+tds[3].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('修改课程类别分组学分要求');
	 $('#modal-body').html(str);
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('修改');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	jsr.id=$(trid).attr('data-groupcourseid');
	 	jsr=JSON.stringify(jsr);	
	 	updateAjax('updateGroupcourse',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={profession:{id:getProfessionid()}};
		 	 jsr=JSON.stringify(jsr);
		 	 groupcourseQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}
//公选课学分要求
function modifyPublicelectiverequired (trid) {
	 // body...  
	 var tds=$(trid).children('td');
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">经济管理类</span>'+
	 '<input type="text" class="form-control" name="economicManagement" value="'+tds[0].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">艺术鉴赏类</span>'+
	 '<input type="text" class="form-control" name="artAppreciation" value="'+tds[1].innerHTML+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">人文科学类</span>'+
	 '<input type="text" class="form-control" name="humanitiesScience" value="'+tds[2].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">自然科学类</span>'+
	 '<input type="text" class="form-control" name="naturalScience" value="'+tds[3].innerHTML+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">综合教育类</span>'+
	 '<input type="text" class="form-control" name="comprehensiveeducation" value="'+tds[4].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">通识平台选修</span>'+
	 '<input type="text" class="form-control" name="generalPlatform" value="'+tds[5].innerHTML+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">工程技术类</span>'+
	 '<input type="text" class="form-control" name="engineeringTechnology" value="'+tds[6].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('修改公选课学分要求');
	 $('#modal-body').html(str);
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('修改');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	jsr.id=$(trid).attr('data-publicelectiverequiredid');
	 	jsr=JSON.stringify(jsr);	
	 	updateAjax('updatePublicelectiverequired',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={profession:{id:getProfessionid()}};
		 	 jsr=JSON.stringify(jsr);
		 	 publicelectiverequiredQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}
//
function modifyCoursecultivationplan (trid) {
	 // body...  
	 var tds=$(trid).children('td');
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程名称</span>'+
	 '<select  class="selectpicker " data-live-search="true" id="modal-selectpicker1"></select>'+
	 // '<input type="text" class="form-control"  value="'+$(trid).attr('data-viewcoursecultivationplancourseid')+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程分组类别</span>'+
	 '<select  class="selectpicker " data-live-search="true" id="modal-selectpicker2"></select>'+
	 // '<input type="text" class="form-control"  value="'+$(trid).attr('data-viewcoursecultivationplangroupcourseid')+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">修读学期</span>'+
	 '<input type="text" class="form-control" name="adviceterm" value="'+tds[11].innerHTML+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">周学时</span>'+
	 '<input type="text" class="form-control" name="weekperiod" value="'+tds[12].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('修改课程计划');
	 $('#modal-body').html(str);

	  //加载下拉列表
	  $.when(selectCourseData(),selectGroupcourseData()).done(function(result1,result2){

	  	if(result1==null||result2==null){
	  		alert("查询课程与课程分组类别错误");
	  	}else{
	  		var option1='';
	  		var opt1=result1['courselist'];
	  		for (var i = 0; i < opt1.length; i++) {
	  			if(opt1[i]['fields'].courseName==tds[1].innerHTML)
	  				option1+='<option value="'+opt1[i].pk+'" selected="true">'+opt1[i]['fields'].courseName+'</option>';
	  			else
	  				option1+='<option value="'+opt1[i].pk+'">'+opt1[i]['fields'].courseName+'</option>';
	  		}
	  		$("#modal-selectpicker1").html(option1);

	  		var option2='';
	  		var opt2 = result2['groupcourselist'];
	  		for (var i = 0; i < opt2.length; i++) {
	  			if(opt2[i]['fields'].groupcourse_category==tds[3].innerHTML)
	  				option2+='<option value="'+opt2[i].pk+'" selected="true">'+opt2[i]['fields'].groupcourse_category+'</option>';
	  			else
	  				option2+='<option value="'+opt2[i].pk+'">'+opt2[i]['fields'].groupcourse_category+'</option>';
	  		}
	  		$("#modal-selectpicker2").html(option2);

	 		//重新修改select
	 		$('.selectpicker').selectpicker();
	 	}

	 });

	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('修改');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	jsr.id=$(trid).attr('data-viewcoursecultivationplanid');
	 	jsr.course={id:$("#modal-selectpicker1").val()};
	 	jsr.groupcourse={id:$("#modal-selectpicker2").val()};
	 	jsr=JSON.stringify(jsr);	
	 	updateAjax('updateCoursecultivationplan',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={professionId:getProfessionid()};
		 	 jsr=JSON.stringify(jsr);
		 	 viewcoursecultivationplanQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}
//
function modifyPracticecultivationplan (trid) {
	 // body...  
	 var tds=$(trid).children('td');
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程名称</span>'+
	 // '<input type="text" class="form-control"  value="'+$(trid).attr('data-viewpracticecultivationplancourseid')+'">'+
	 '<select  class="selectpicker " data-live-search="true" id="modal-selectpicker"></select>'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">实践类别</span>'+
	 '<input type="text" class="form-control" name="type" value="'+tds[5].innerHTML+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">形式</span>'+
	 '<input type="text" class="form-control" name="pattern" value="'+tds[6].innerHTML+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">周数</span>'+
	 '<input type="text" class="form-control" name="weeks" value="'+tds[3].innerHTML+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">学期</span>'+
	 '<input type="text" class="form-control" name="adviceterm" value="'+tds[4].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('修改实践计划');
	 $('#modal-body').html(str);


	 $.when(selectCourseData()).done(function(result){
	 	if(result==null){
	 		alert("查询课程错误");
	 	}else{
	 		var option='';
	 		var opt=result['courselist'];
	 		for (var i = 0; i < opt.length; i++) {
	 			if(opt[i]['fields'].courseName==tds[1].innerHTML)
	 				option+='<option value="'+opt[i].pk+'" selected="true">'+opt[i]['fields'].courseName+'</option>';
	 			else
	 				option+='<option value="'+opt[i].pk+'">'+opt[i]['fields'].courseName+'</option>';
	 		}
	 		$("#modal-selectpicker").html(option);
	 		//重新修改select
	 		$('.selectpicker').selectpicker();
	 	}
	 });


	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('修改');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.profession={id:getProfessionid()};
	 	jsr.id=$(trid).attr('data-viewpracticecultivationplanid');
	 	jsr.course={id:$("#modal-selectpicker").val()};
	 	jsr=JSON.stringify(jsr);	
	 	updateAjax('updatePracticecultivationplan',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={professionId:getProfessionid()};
		 	 jsr=JSON.stringify(jsr);
		 	 viewpracticecultivationplanQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}


//模态框-删除
function deleteProfessionCultivationPlan (id) {
	 // body...  
	 //弹出模态框
	 $('#modal-title').html('删除专业培养计划');
	 $('#modal-body').html('你确定要删除吗？');
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('删除');
	 $('#modal-btn-submit').unbind('click').click(function () {
	 	/* body... */ 
	 	deleteAjax("deleteProfessionCultivationPlan",id,function () {
	 		/* body... */ 
	 	 //回调函数,用于刷新
	 	 var jsr={profession:{id:getProfessionid()}};
	 	 jsr=JSON.stringify(jsr);
	 	 professionplanQuery(jsr);
	 	});
	 	$('#modal').modal('hide'); //隐藏模态框
	 });

	}
//
function deleteGraduationcreditrequired (id) {

	$('#modal-title').html('删除毕业学分要求');
	$('#modal-body').html('你确定要删除吗？');
		$('#modal').modal('show'); //打开模态框
		$('#modal-btn-submit').html('删除');
		$('#modal-btn-submit').unbind('click').click(function () {

	 // body...  
	 deleteAjax("deleteGraduationcreditrequired",id,function () {
	 	/* body... */ 
	 	var jsr={profession:{id:getProfessionid()}};
	 	jsr=JSON.stringify(jsr);
	 	graduationcreditrequiredQuery(jsr);
	 });
	 $('#modal').modal('hide'); //隐藏模态框
	});
	}
//
function deleteGroupcourse (id) {
	$('#modal-title').html('删除课程分组学分要求');
	$('#modal-body').html('你确定要删除吗？');
		$('#modal').modal('show'); //打开模态框
		$('#modal-btn-submit').html('删除');
		$('#modal-btn-submit').unbind('click').click(function () {
	 	// body...  
	 	deleteAjax("deleteGroupcourse",id,function () {
	 		/* body... */ 
	 		var jsr={profession:{id:getProfessionid()}};
	 		jsr=JSON.stringify(jsr);
	 		groupcourseQuery(jsr);
	 	});
	$('#modal').modal('hide'); //隐藏模态框
});
	}
//
function deletePublicelectiverequired (id) {
	$('#modal-title').html('删除公选课学分要求');
	$('#modal-body').html('你确定要删除吗？');
		$('#modal').modal('show'); //打开模态框
		$('#modal-btn-submit').html('删除');
		$('#modal-btn-submit').unbind('click').click(function () {
	 // body...  
	 deleteAjax("deletePublicelectiverequired",id,function () {
	 	/* body... */ 
	 	var jsr={profession:{id:getProfessionid()}};
	 	jsr=JSON.stringify(jsr);
	 	publicelectiverequiredQuery(jsr);
	 });
	 $('#modal').modal('hide'); //隐藏模态框
	});
	}
//模态框-删除课程计划
function deleteCoursecultivationplan (id) {
	$('#modal-title').html('删除课程计划');
	$('#modal-body').html('你确定要删除吗？');
		$('#modal').modal('show'); //打开模态框
		$('#modal-btn-submit').html('删除');
		$('#modal-btn-submit').unbind('click').click(function () {
	 // body...  
	 deleteAjax("deleteCoursecultivationplan",id,function () {
	 	/* body... */ 
	 	var jsr={professionId:getProfessionid()};
	 	jsr=JSON.stringify(jsr);
	 	viewcoursecultivationplanQuery(jsr);
	 });
	 $('#modal').modal('hide'); //隐藏模态框
	});
	}
//
function deletePracticecultivationplan (id) {
	$('#modal-title').html('删除实践计划');
	$('#modal-body').html('你确定要删除吗？');
		$('#modal').modal('show'); //打开模态框
		$('#modal-btn-submit').html('删除');
		$('#modal-btn-submit').unbind('click').click(function () {
	 // body...  
	 deleteAjax("deletePracticecultivationplan",id,function () {
	 	/* body... */ 
	 	var jsr={professionId:getProfessionid()};
	 	jsr=JSON.stringify(jsr);
	 	viewpracticecultivationplanQuery(jsr);
	 });
	 	 $('#modal').modal('hide'); //隐藏模态框
	 	});
	}

//专业培养计划查询请求
function professionplanQuery (pjson) {
	 // body...  

	$.ajax({
		url: 'getProfessionPlanQuery',
		type: 'post',
		data: {param1: pjson},
		success: function (result) {
	console.log("professionplanQuery success");
	 	if(result==null)
	 		alert("专业培养计划查询失败！");
	 	else if(result==""){
	 		//结果为空
	 		$("#tbprofessioncultivationplan").children().remove();
	 	}
	 	else
	 	{

	 		var jsr=JSON.parse(result);
	 		var res = jsr['planlist'];
	 		var str="";
	 		for(var i = 0, length1 = res.length; i < length1; i++)
	 		{
	 			str+="<tr id=\"trprofessioncultivationplan"+i+"\">";
	 			// str+="<td>"+jsr[i].profession.id+"</td>";
	 			str+="<td>"+res[i]['fields'].corediscipline+"</td>";
	 			str+="<td>"+res[i]['fields'].tsjy_credit+"</td>";
	 			str+="<td>"+res[i]['fields'].tsjy_peroid+"</td>";
	 			str+="<td>"+res[i]['fields'].tsjy_compulsoryratio+"</td>";
	 			str+="<td>"+res[i]['fields'].tsjy_electiveratio+"</td>";
	 			str+="<td>"+res[i]['fields'].zyjc_credit+"</td>";
	 			str+="<td>"+res[i]['fields'].zyjc_peroid+"</td>";
	 			str+="<td>"+res[i]['fields'].zyjc_compulsoryratio+"</td>";
	 			str+="<td>"+res[i]['fields'].zyjc_electiveratio+"</td>";
	 			str+="<td>"+res[i]['fields'].zyk_credit+"</td>";
	 			str+="<td>"+res[i]['fields'].zyk_peroid+"</td>";
	 			str+="<td>"+res[i]['fields'].zyk_compulsoryratio+"</td>";
	 			str+="<td>"+res[i]['fields'].zyk_electiveratio+"</td>";
	 			str+="<td>"+res[i]['fields'].dlsj_credit+"</td>";
	 			str+="<td>"+res[i]['fields'].dlsj_peroid+"</td>";
	 			str+="<td>"+res[i]['fields'].dlsj_compulsoryratio+"</td>";
	 			str+="<td>"+res[i]['fields'].dlsj_electiveratio+"</td>";
	 			//添加操作按钮
	 			//修改  id="tdprofessioncultivationplanmodify'+i+'"
	 			str+='<td><a href="#" id="tdprofessioncultivationplanmodify'+i+'"  data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			//删除
	 			str+='<td><a href="#" id="tdprofessioncultivationplandelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			str+="</tr>";

	 		//var trid="#trprofessioncultivationplan"+i;
	 		//$(trid).attr("dataprofessioncultivationplanid", jsr[i].id);
	 		//还没有作为一段html代码前不能使用
	 	}

	 	$("#tbprofessioncultivationplan").children().remove();
	 	$("#tbprofessioncultivationplan").html(str);
			//alert($("#trprofessioncultivationplan0").attr("dataprofessioncultivationplanid"));
	 		//让tr保存记录的id
	 		for(var i = 0, length1 = res.length; i < length1; i++){
	 			var trid="#trprofessioncultivationplan"+i;
	 			$(trid).attr("data-professioncultivationplanid", res[i].pk);
	 			var tdmodify="#tdprofessioncultivationplanmodify"+i;
	 			var tddelete="#tdprofessioncultivationplandelete"+i;
	 			//传递tr的id，在函数里用tr遍历td中的每个值
	 			$(tdmodify).attr('href', 'javascript:modifyProfessionCultivationPlan("'+trid+'")');
	 			$(tddelete).attr('href', 'javascript:deleteProfessionCultivationPlan('+res[i].pk+')');
	 		}

	 	}
	 	//刷新权限
	 	rightControl();

		},
		error: function () {
			console.log("professionplanQuery error");
			//请求失败
			alert("ajax请求查询失败");
		}
	})
}



//毕业学分要求
function graduationcreditrequiredQuery (pjson) {
	 // body...  
	 $.ajax({
	 	url: 'getGraduationCreditRequiredQuery',
	 	type: 'post',
	 	dataType: 'json',
	 	data: {"jsonstr": pjson},
	 })
	 .done(function(result) {
	 	console.log("graduationcreditrequiredQuery success");
	 	if (result==null) {
		// statement
		alert("毕业学分要求查询失败");
	}else if(result==""){
	 		//结果为空
	 		$("#tbgraduationcreditrequired").children().remove();
	 	}else {
	 		var jsr = result['requiredlist'];
	 		// if(jsr.length>0)
	 		// 	jsr=jsr[0];
	 		var str="";
	 		for(var i = 0, length1 = jsr.length; i < length1; i++){

	 			str+="<tr id=\"trgraduationcreditrequired"+i+"\">";
	 			str+="<td>"+jsr[i]['fields'].compulsory+"</td>";
	 			str+="<td>"+jsr[i]['fields'].limitedElective+"</td>";
	 			str+="<td>"+jsr[i]['fields'].elective+"</td>";
	 			str+="<td>"+jsr[i]['fields'].schoolElective+"</td>";
	 			//添加操作按钮
	 			//修改
	 			str+='<td><a href="#" id="tdgraduationcreditrequiredmodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			//删除
	 			str+='<td><a href="#" id="tdgraduationcreditrequireddelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			str+="</tr>";

	 		}
	 		//$("#tbgraduationcreditrequired").attr('data-graduationcreditrequiredid', 'value');
	 		$("#tbgraduationcreditrequired").children().remove();
	 		$("#tbgraduationcreditrequired").html(str);
	 		//让tr保存记录的id
	 		for(var i = 0, length1 = jsr.length; i < length1; i++){
	 			var trid="#trgraduationcreditrequired"+i;
	 			$(trid).attr("data-graduationcreditrequiredid", jsr[i].pk);
	 			var tdmodify="#tdgraduationcreditrequiredmodify"+i;
	 			var tddelete="#tdgraduationcreditrequireddelete"+i;
	 			//传递tr的id，在函数里用tr遍历td中的每个值
	 			$(tdmodify).attr('href', 'javascript:modifyGraduationcreditrequired("'+trid+'")');
	 			$(tddelete).attr('href', 'javascript:deleteGraduationcreditrequired('+jsr[i].pk+')');
	 		}
	 	}
		 //刷新权限
		 rightControl();	 	
		})
	 .fail(function() {
	 	console.log("graduationcreditrequiredQuery error");
	 	alert("ajax请求毕业学分要求失败");
	 })
	 .always(function() {
	 	console.log("graduationcreditrequiredQuery complete");
	 });
	}
//课程类别分组学分要求
function groupcourseQuery (pjson) {
	 // body...  
	 $.ajax({
	 	url: 'getGroupCourseQuery',
	 	type: 'post',
	 	dataType: 'json',
	 	data: {"jsonstr": pjson},
	 })
	 .done(function(result) {
	 	console.log("groupcourseQuery success");
	 	if (result==null) {
		// statement
		alert("课程类别分组学分查询失败");
	}else if(result==""){
	 		//结果为空
	 		$("#tbgroupcourse").children().remove();
	 	}else
	 	{
	 		var jsr = result['groupcourselist'];
	 		var str="";
	 		for(var i = 0, length1 = jsr.length; i < length1; i++){
	 			str+="<tr id=\"trgroupcourse"+i+"\">";
	 			str+="<td>"+(i+1)+"</td>";
	 			str+="<td>"+jsr[i]['fields'].groupcourse_code+"</td>";
	 			str+="<td>"+jsr[i]['fields'].groupcourse_category+"</td>";
	 			str+="<td>"+jsr[i]['fields'].credit+"</td>";
	 			//添加操作按钮
	 			//修改
	 			str+='<td><a href="#" id="tdgroupcoursemodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			//删除
	 			str+='<td><a href="#" id="tdgroupcoursedelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			str+="</tr>";
	 		}
	 		$("#tbgroupcourse").children().remove();
	 		$("#tbgroupcourse").html(str);
	 		for(var i = 0, length1 = jsr.length; i < length1; i++){
	 			var trid="#trgroupcourse"+i;
	 			$(trid).attr("data-groupcourseid", jsr[i].pk);
	 			var tdmodify="#tdgroupcoursemodify"+i;
	 			var tddelete="#tdgroupcoursedelete"+i;
	 			//传递tr的id，在函数里用tr遍历td中的每个值
	 			$(tdmodify).attr('href', 'javascript:modifyGroupcourse("'+trid+'")');
	 			$(tddelete).attr('href', 'javascript:deleteGroupcourse('+jsr[i].pk+')');
	 		}
	 	}
	 	 //刷新权限
	 	 rightControl();
	 	})
	 .fail(function() {
	 	console.log("groupcourseQuery error");
	 	alert("ajax请求课程类别分组学分失败");
	 })
	 .always(function() {
	 	console.log("groupcourseQuery complete");
	 });	 
	}
//公选课学分要求
function publicelectiverequiredQuery (pjson) {
	 // body...  
	 $.ajax({
	 	url: 'getPublicElectiveRequiredQuery',
	 	type: 'post',
	 	dataType: 'json',
	 	data: {"jsonstr": pjson},
	 })
	 .done(function(result) {
	 	console.log("publicelectiverequiredQuery success");
	 	if (result==null) {
	 		// statement
	 		alert("公选课学分要求查询失败");
	 	}else if (result=="") {
	 		// statement
	 		$("#tbpublicelectiverequired").children().remove();	 		
	 	}else{
	 		var jsr = result['requiredlist'];
	 		var str="";
	 		for(var i = 0, length1 = jsr.length; i < length1; i++){
	 			str+="<tr id=\"trpublicelectiverequired"+i+"\">";
	 			str+="<td>"+jsr[i]['fields'].economic_management+"</td>";
	 			str+="<td>"+jsr[i]['fields'].art_appreciation+"</td>";
	 			str+="<td>"+jsr[i]['fields'].humanities_science+"</td>";
	 			str+="<td>"+jsr[i]['fields'].natural_science+"</td>";
	 			str+="<td>"+jsr[i]['fields'].comprehensive_education+"</td>";
	 			str+="<td>"+jsr[i]['fields'].general_platform+"</td>";
	 			str+="<td>"+jsr[i]['fields'].engineering_technology+"</td>";
	 			//添加操作按钮
	 			//修改
	 			str+='<td><a href="#" id="tdpublicelectiverequiredmodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			//删除
	 			str+='<td><a href="#" id="tdpublicelectiverequireddelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			str+="</tr>";
	 		}
	 		$("#tbpublicelectiverequired").children().remove();
	 		$("#tbpublicelectiverequired").html(str);
	 		for(var i = 0, length1 = jsr.length; i < length1; i++){
	 			var trid="#trpublicelectiverequired"+i;
	 			$(trid).attr("data-publicelectiverequiredid", jsr[i].pk);
	 			var tdmodify="#tdpublicelectiverequiredmodify"+i;
	 			var tddelete="#tdpublicelectiverequireddelete"+i;
	 			//传递tr的id，在函数里用tr遍历td中的每个值
	 			$(tdmodify).attr('href', 'javascript:modifyPublicelectiverequired("'+trid+'")');
	 			$(tddelete).attr('href', 'javascript:deletePublicelectiverequired('+jsr[i].pk+')');
	 		}
	 	}
		 //刷新权限
		 rightControl();
		})
	 .fail(function() {
	 	console.log("publicelectiverequiredQuery error");
	 	alert("ajax请求公选课学分要求失败");
	 })
	 .always(function() {
	 	console.log("publicelectiverequiredQuery complete");
	 });
	 
	}
//课程计划视图
function viewcoursecultivationplanQuery (pjson) {
	 // body...  
	 $.ajax({
	 	url: 'getCourseCultivationPlanQueryView',
	 	type: 'post',
	 	dataType: 'json',
	 	data: {"jsonstr": pjson},
	 })
	 .done(function(result) {
	 	console.log("viewcoursecultivationplanQuery success");
	 	if (result==null) {
			// statement
			alert("课程计划查询失败");
		}else if (result=="") {
			// statement
			$("#tbviewcoursecultivationplan").children().remove();	
		}else{

			var jsr=result['planlist'];
			var str="";
			for(var i = 0, length1 = jsr.length; i < length1; i++){
				str+="<tr id=\"trviewcoursecultivationplan"+i+"\">";
				str+="<td>"+(i+1)+"</td>";
				str+="<td>"+jsr[i]['fields']['course'].courseName+"</td>";
				str+="<td>"+jsr[i]['fields']['course'].courseType+"</td>";
				str+="<td>"+jsr[i]['fields']['groupCourse'].groupcourse_category+"</td>";
				str+="<td>"+jsr[i]['fields']['course'].totalCredit+"</td>";
				str+="<td>"+jsr[i]['fields']['course'].totalPeriod+"</td>";
				str+="<td>"+jsr[i]['fields']['course'].lecture+"</td>";
				str+="<td>"+jsr[i]['fields']['course'].experiment+"</td>";
				str+="<td>"+jsr[i]['fields']['course'].onComputer+"</td>";
				str+="<td>"+jsr[i]['fields']['course'].extracurricular+"</td>";
				str+="<td>"+jsr[i]['fields']['course'].evaluationMethod+"</td>";
				str+="<td>"+jsr[i]['fields'].adviceTerm+"</td>";
				str+="<td>"+jsr[i]['fields'].weekPeriod+"</td>";
				//添加操作按钮
	 			//修改
	 			str+='<td><a href="#" id="tdviewcoursecultivationplanmodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			//删除
	 			str+='<td><a href="#" id="tdviewcoursecultivationplandelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			str+="</tr>";
	 		}
	 		$("#tbviewcoursecultivationplan").children().remove();
	 		$("#tbviewcoursecultivationplan").html(str);
	 		for(var i = 0, length1 = jsr.length; i < length1; i++){
	 			var trid="#trviewcoursecultivationplan"+i;
	 			$(trid).attr("data-viewcoursecultivationplanid", jsr[i].pk);//Coursecultivationplan的id
	 			$(trid).attr('data-viewcoursecultivationplancourseid', jsr[i]['fields'].course_id);
	 			$(trid).attr('data-viewcoursecultivationplangroupcourseid', jsr[i]['fields'].groupcourse_id);
	 			var tdmodify="#tdviewcoursecultivationplanmodify"+i;
	 			var tddelete="#tdviewcoursecultivationplandelete"+i;
	 			//传递tr的id，在函数里用tr遍历td中的每个值
	 			$(tdmodify).attr('href', 'javascript:modifyCoursecultivationplan("'+trid+'")');
	 			$(tddelete).attr('href', 'javascript:deleteCoursecultivationplan('+jsr[i].pk+')');
	 		}
	 	}
		 //刷新权限
		 rightControl();
		})
	 .fail(function() {
	 	console.log("viewcoursecultivationplanQuery error");
	 	alert("ajax请求课程计划失败");
	 })
	 .always(function() {
	 	console.log("viewcoursecultivationplanQuery complete");
	 });
	}

//实践计划视图
function viewpracticecultivationplanQuery (pjson) {
	 // body...  
	 $.ajax({
	 	url: 'getPracticeCultivationPlanQueryView',
	 	type: 'post',
	 	dataType: 'json',
	 	data: {"jsonstr": pjson},
	 })
	 .done(function(result) {
	 	console.log("viewpracticecultivationplanQuery success");
	 	if (result==null) {
			// statement
			alert("实践计划查询失败");
		}else if (result=="") {
			// statement
			$("#tbviewpracticecultivationplan").children().remove();	
		}else{
			var jsr=result['planlist'];
			var str="";
			for(var i = 0, length1 = jsr.length; i < length1; i++){
				str+="<tr id=\"trviewpracticecultivationplan"+i+"\">";
				str+="<td>"+(i+1)+"</td>";
				str+="<td>"+jsr[i]['fields']['course'].courseName+"</td>";
				str+="<td>"+jsr[i]['fields']['course'].totalCredit+"</td>";
				str+="<td>"+jsr[i]['fields'].week+"</td>";
				str+="<td>"+jsr[i]['fields'].adviceTerm+"</td>";
				str+="<td>"+jsr[i]['fields'].type+"</td>";
				str+="<td>"+jsr[i]['fields'].pattern+"</td>";
				//添加操作按钮
	 			//修改
	 			str+='<td><a href="#" id="tdviewpracticecultivationplanmodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			//删除
	 			str+='<td><a href="#" id="tdviewpracticecultivationplandelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			str+="</tr>";
	 		}
	 		$("#tbviewpracticecultivationplan").children().remove();
	 		$("#tbviewpracticecultivationplan").html(str);
	 		for(var i = 0, length1 = jsr.length; i < length1; i++){
	 			var trid="#trviewpracticecultivationplan"+i;
	 			$(trid).attr("data-viewpracticecultivationplanid", jsr[i].pk);
	 			$(trid).attr("data-viewpracticecultivationplancourseid", jsr[i]['fields'].course_id);
	 			var tdmodify="#tdviewpracticecultivationplanmodify"+i;
	 			var tddelete="#tdviewpracticecultivationplandelete"+i;
	 			//传递tr的id，在函数里用tr遍历td中的每个值
	 			$(tdmodify).attr('href', 'javascript:modifyPracticecultivationplan("'+trid+'")');
	 			$(tddelete).attr('href', 'javascript:deletePracticecultivationplan('+jsr[i].pk+')');
	 		}
	 	}
		 //刷新权限
		 rightControl();
		})
	 .fail(function() {
	 	console.log("viewpracticecultivationplanQuery error");
	 	alert("ajax请求实践计划失败");
	 })
	 .always(function() {
	 	console.log("viewpracticecultivationplanQuery complete");
	 });
	}



//用于自动补全的下拉列表数据获取
//课程分组类别
function selectGroupcourseData(){
	var defer = $.Deferred();
	$.ajax({
		url: 'selectGroupcourse',
		type: 'post',
		dataType: 'json',
	})
	.done(function(result) {
		console.log("selectGroupcourseData success");
		defer.resolve(result);
	})
	.fail(function() {
		console.log("selectGroupcourseData error");
	})
	.always(function() {
		console.log("selectGroupcourseData complete");
	});
	return defer.promise();
}





