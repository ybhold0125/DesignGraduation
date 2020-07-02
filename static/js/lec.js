

//文档准备完毕
$(document).ready(function() {
	
	//设置专业id
	setProfession(1,"计算机科学与技术");
	//加载专业
	getSchoolProfessions();

	//用户信息
	updatePageUser();

	//加载课程
	var course={};
	course=JSON.stringify(course);
	courseQuery(course);

	//毕业指标点与课程关联
	//var subgradCourseRelation={subgraduationrequirement:{id:1}};
	//subgradCourseRelation=JSON.stringify(subgradCourseRelation);
	//subgradCourseRelationQuery(subgradCourseRelation);


	//毕业要求指标点课程关联视图
	var jsr={professionId:1};
	jsr=JSON.stringify(jsr);
	viewSubgradCourseRelationQuery(jsr);
	////关联指标点达成度视图
	viewRelationAchievedegreeQuery(jsr);
	//达成统计
	viewAchieveStatisticsQuery(jsr);
	//毕业要求达成统计
	viewGraduationStatisticsQuery(jsr);
	//毕业要求
	jsr={professionId:1};
	jsr=JSON.stringify(jsr);
	graduationrequirementQuery(jsr);
	//毕业要求指标点
	subgraduationrequirementQuery(jsr);
	

	//add按钮绑定处理函数
	$("#add-btn-course").attr('href', 'javascript:addCourse()');
	$("#add-btn-graduationrequirement").attr('href', 'javascript:addGraduationrequirement()');
	$("#add-btn-subgraduationrequirement").attr('href', 'javascript:addSubgraduationrequirement()');
	$("#add-btn-subgradcourserelation").attr('href', 'javascript:addSubgradcourserelation()');
	$("#add-btn-relationachievedegree").attr('href', 'javascript:addRelationachievedegree()');

	//条件查询按钮绑定处理函数
	$("#btn-query-course").click(function() {
		/* Act on the event */
		var jsr=$("#query-condition-course-form").serializeJson();
		jsr=JSON.stringify(jsr);
		courseQuery(jsr);
	});
	$("#btn-query-relation-sgrc").click(function() {
		/* Act on the event */
		
		var jsr=$("#query-condition-relation-sgrc-form").serializeJson();
		jsr.professionId=getProfessionid();
		jsr=JSON.stringify(jsr);
		//console.log(jsr);
		viewSubgradCourseRelationQuery(jsr);
	});
	$("#btn-query-relationachievedegree").click(function() {
		/* Act on the event */
		
		var jsr=$("#query-condition-relationachievedegree-form").serializeJson();
		jsr.professionId=getProfessionid();
		jsr=JSON.stringify(jsr);
		//console.log(jsr);
		viewRelationAchievedegreeQuery(jsr);
	});

 	//隐藏各面板
 	$(function () { $('#collapse-course').collapse('show')});
 	$(function () { $('#collapse-graduationrequirement').collapse('show')});
 	$(function () { $('#collapse-subgraduationrequirement').collapse('show')});
 	$(function () { $('#collapse-subgradcourserelation').collapse('show')});
 	$(function () { $('#collapse-relationachievedegree').collapse('show')});
 	$(function () { $('#collapse-viewachievestatistics').collapse('show')});
 	$(function () { $('#collapse-viewgraduationstatistics').collapse('show')});

 	$('a[href^=#section-]').click(function() {
 		var target = document.getElementById(this.hash.slice(1));
 		if (!target) return;
 		var targetOffset = $(target).offset().top-50;
 		$('html,body').animate({scrollTop: targetOffset}, 400);
 		return false;
 	});


 });


//毕业要求指标点与课程关联视图
function viewSubgradCourseRelationQuery (pjson) {
	 // body...  
	 $.ajax({
	 	url: 'viewSubgradCourseRelationQuery',
	 	type: 'post',
	 	dataType: 'json',
	 	data: {"jsonstr": pjson},
	 })
	 .done(function(result) {
	 	console.log("viewSubgradCourseRelationQuery success");
	 	if (result==null) {
	 		// statement
	 		alert("毕业要求指标点与课程关联视图查询失败");
	 	}else if (result=="") {
	 		$("#tbviewsubgradcourserelation").children().remove();
	 	}else {
	 		var jsr=result['querylist'];//视图
	 		//console.log("查询到的记录条数："+jsr.length);
	 		var str="";
	 		var ele={count:0,sgrcode:{}};
	 		var grcode=new Array();//毕业要求

	 		if(jsr.length>=1){
	 			//grcode[0].count=0;  //每条毕业要求应该占多少row
	 			grcode[0]=ele;
	 		}
	 		var sgrcode=new Array();//指标点
	 		if(jsr.length>=1)
	 			sgrcode[0]=0;//每条毕业要求下的每个指标点应该占多少row
	 		for (var i = 0,j=0,k=0,m=0,n=0; i < jsr.length; i++) {

	 			if(jsr[i]['fields']['gr'].gr_code==jsr[j]['fields']['gr'].gr_code){
	 				grcode[k].count++;
	 				if(jsr[i]['fields']['sgr'].sgr_code==jsr[m]['fields']['sgr'].sgr_code)
	 				{
	 					sgrcode[n]++;
	 				}else{
	 					n++;
	 					m=i;sgrcode[n]=1;
	 				}
	 			}else
	 			{
	 				k++;
	 				j=i;
	 				grcode[k]={count:1,sgrcode:{}};;
	 				//grcode[k].count=1;
	 				sgrcode=new Array();
	 				m=i;n=0;
	 				sgrcode[n]=1;
	 			}
	 			//将sgrcode赋值给grcode;
	 			grcode[k].sgrcode=sgrcode;
	 		}
	 		//console.log(JSON.stringify(grcode));
	 		//index是毕业要求，index2是指标点，index3是每一条记录；
	 		var index=0,index2=0,index3=0;
	 		for (var i = 0; i < grcode.length; i++) {
	 			
	 			index+=grcode[i].count;
	 			var trid="#trviewsubgradcourserelation"+index3;
	 			str+='<tr id= "'+trid+'">';
	 			str+='<td rowspan="'+grcode[i].count+'">'+jsr[index-1]['fields']['gr'].gr_code+'</td>';
	 			str+='<td rowspan="'+grcode[i].count+'">'+jsr[index-1]['fields']['gr'].gr_content+'</td>';

	 			index2+=grcode[i].sgrcode[0];
	 			str+='<td rowspan="'+grcode[i].sgrcode[0]+'">'+jsr[index2-1]['fields']['sgr'].sgr_code+'</td>';
	 			str+='<td rowspan="'+grcode[i].sgrcode[0]+'">'+jsr[index2-1]['fields']['sgr'].sgr_content+'</td>';

	 			str+='<td>'+jsr[index3]['fields']['course'].courseName+'</td>';
	 			str+='<td>'+jsr[index3]['fields'].weight+'</td>';
	 			// str+='<td>'+jsr[index3].id.arrivedFirst+'</td>';
	 			// str+='<td>'+jsr[index3].id.arrivedSecond+'</td>';
	 			// str+='<td>'+jsr[index3].id.arrivedThrid+'</td>';
	 			// str+='<td>'+jsr[index3].id.coursefeedback+'</td>';
	 			// str+='<td>'+jsr[index3].id.coursetype+'</td>';

	 			//错误:字符串过长，无法将其整个解析
	 			var argjsr={id:jsr[index3].pk,subGraduationRequirementId:jsr[index3]['fields'].subGraduationRequirement_id,
	 				courseId:jsr[index3]['fields'].course_id,weight:jsr[index3]['fields'].weight
	 			};
	 			argjsr=JSON.stringify(argjsr);
	 			argjsr=argjsr.replace(/"/g, '\\"');//替换所有"为\"
	 			argjsr="javascript:modifySubgradcourserelation(\""+argjsr+"\")";
	 			str+='<td><a href='+argjsr+' data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			str+='<td><a href="javascript:deleteSubgradcourserelation('+jsr[index3].pk+')"  data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			str+='</tr>';
	 			index3++;
	 			//1.1的剩余课程
	 			for(var k=1;k<grcode[i].sgrcode[0];k++)
	 			{
	 				trid="#trviewsubgradcourserelation"+index3;
	 				str+='<tr id= "'+trid+'">';
	 				str+='<td>'+jsr[index3]['fields']['course'].courseName+'</td>';
	 				str+='<td>'+jsr[index3]['fields'].weight+'</td>';
	 				// str+='<td>'+jsr[index3].id.arrivedFirst+'</td>';
	 				// str+='<td>'+jsr[index3].id.arrivedSecond+'</td>';
	 				// str+='<td>'+jsr[index3].id.arrivedThrid+'</td>';
	 				// str+='<td>'+jsr[index3].id.coursefeedback+'</td>';
	 				// str+='<td>'+jsr[index3].id.coursetype+'</td>';
	 				//错误:字符串过长，无法将其整个解析
					var argjsr={id:jsr[index3].pk,subGraduationRequirementId:jsr[index3]['fields'].subGraduationRequirement_id,
						courseId:jsr[index3]['fields'].course_id,weight:jsr[index3]['fields'].weight
	 				};
	 				argjsr=JSON.stringify(argjsr);
	 				argjsr=argjsr.replace(/"/g, '\\"');//替换所有"为\"
	 				argjsr="javascript:modifySubgradcourserelation(\""+argjsr+"\")";
	 				str+='<td><a href='+argjsr+' data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 				str+='<td><a href="javascript:deleteSubgradcourserelation('+jsr[index3].pk+')"  data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 				str+='</tr>';
	 				index3++;
	 			}
	 			//毕业要求1的剩余指标点
	 			for(var j=1;j<grcode[i].sgrcode.length;j++){
	 				index2+=grcode[i].sgrcode[j];
	 				trid="#trviewsubgradcourserelation"+index3;
	 				str+='<tr id= "'+trid+'">';
	 				str+='<td rowspan="'+grcode[i].sgrcode[j]+'">'+jsr[index2-1]['fields']['sgr'].sgr_code+'</td>';
	 				str+='<td rowspan="'+grcode[i].sgrcode[j]+'">'+jsr[index2-1]['fields']['sgr'].sgr_content+'</td>';

	 				str+='<td>'+jsr[index3]['fields']['course'].courseName+'</td>';
	 				str+='<td>'+jsr[index3]['fields'].weight+'</td>';

	 				//错误:字符串过长，无法将其整个解析
					var argjsr={id:jsr[index3].pk,subGraduationRequirementId:jsr[index3]['fields'].subGraduationRequirement_id,
						courseId:jsr[index3]['fields'].course_id,weight:jsr[index3]['fields'].weight
	 				};
	 				argjsr=JSON.stringify(argjsr);
	 				argjsr=argjsr.replace(/"/g, '\\"');//替换所有"为\"
	 				argjsr="javascript:modifySubgradcourserelation(\""+argjsr+"\")";
	 				str+='<td><a href='+argjsr+' data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 				str+='<td><a href="javascript:deleteSubgradcourserelation('+jsr[index3].pk+')"  data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';

	 				str+='</tr>';
	 				index3++;

	 				//1.x的剩余课程
	 				for(var k=1;k<grcode[i].sgrcode[j];k++)
	 				{
	 					trid="#trviewsubgradcourserelation"+index3;
	 					str+='<tr id= "'+trid+'">';
	 					str+='<td>'+jsr[index3]['fields']['course'].courseName+'</td>';
	 					str+='<td>'+jsr[index3]['fields'].weight+'</td>';


	 					//错误:字符串过长，无法将其整个解析
						var argjsr={id:jsr[index3].pk,subGraduationRequirementId:jsr[index3]['fields'].subGraduationRequirement_id,
							courseId:jsr[index3]['fields'].course_id,weight:jsr[index3]['fields'].weight
	 					};
	 					argjsr=JSON.stringify(argjsr);
	 					argjsr=argjsr.replace(/"/g, '\\"');//替换所有"为\"
	 					argjsr="javascript:modifySubgradcourserelation(\""+argjsr+"\")";
	 					str+='<td><a href='+argjsr+' data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 					str+='<td><a href="javascript:deleteSubgradcourserelation('+jsr[index3].pk+')"  data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';

	 					str+='</tr>';
	 					index3++;
	 				}
	 			}

	 		}
	 		$("#tbviewsubgradcourserelation").children().remove();
	 		$("#tbviewsubgradcourserelation").html(str);

	 	}
		 //刷新权限
		 rightControl();
		})
.fail(function() {
	console.log("viewSubgradCourseRelationQuery error");
	alert("ajax请求毕业要求指标点与课程关联视图查询失败");
})
.always(function() {
	console.log("viewSubgradCourseRelationQuery complete");
});

}

//课程对应的毕业要求指标点视图--没时间写了，废弃
function viewCourseSubgradRelationQuery (pjson){
	$.ajax({
		url: 'LAJqueryViewCourseSubgradRelation',
		type: 'post',
		dataType: 'json',
		data: {"jsonstr": pjson},
	})
	.done(function(result) {
		console.log("viewCourseSubgradRelationQuery success");
		if (result==null) {
	 		// statement
	 		alert("课程对应毕业要求指标点视图查询失败");
	 	}else if (result=="") {
	 		$("#tbviewcoursesubgradrelation").children().remove();
	 	}else{
	 		var jsr=JSON.parse(result);//视图
	 		var str="";
	 		var courses=new Array();//课程
	 		var grcode=new Array();//毕业要求
	 		

	 		var cele={count:0,grcode:{}}; //应该占有几行,有多少毕业要求，及毕业要求下的指标点

	 		if(jsr.length>0){
	 			courses[0]=cele;
	 			grcode[0]=0;
	 			courses[0].grcode=grcode;
	 		}

	 		for (var i = 0,j=0,k=0,m=0,n=0; i < jsr.length; i++) {
	 			
	 			if(jsr[i].id.courseId==jsr[j].id.courseId)  
	 			{
	 				courses[k].count++;
	 				if(jsr[i].id.grCode==jsr[m].id.grCode)
	 				{
	 					grcode[n]++;
	 				}else{
	 					n++;
	 					m=i;grcode[n]=1;
	 				}
	 			}else{
	 				k++;
	 				j=i;
	 				courses[k]={count:1,grcode:{}};
	 				grcode=new Array();//毕业要求
	 				m=i;n=0;
	 				grcode[n]=1;
	 				courses[k].grcode=grcode;
	 			}
	 		}
	 		//加载需要显示的内容
	 		var index=0,index2=0,index3=0;
	 		for (var i = 0; i < courses.length; i++) {
	 			index+=courses[i];
	 			var trid="#trviewcoursesubgradrelation"+index3;
	 			str+='<tr id= "'+trid+'">'+
	 			'<td rowspan="'+courses[i].count+'">'+(index3+1)+'</td>'

	 			
	 			;

	 		}


	 		$("#tbviewcoursesubgradrelation").children().remove();
	 		$("#tbviewcoursesubgradrelation").html(str);

	 	}
	 	//刷新权限
	 	rightControl();
	 })
	.fail(function() {
		console.log("viewCourseSubgradRelationQuery error");
		alert("ajax请求课程对应毕业要求指标点视图查询失败");
	})
	.always(function() {
		console.log("viewCourseSubgradRelationQuery complete");
	});
	
}

//reset

function reSet (id,name) {

	$.ajax({
		url: 'MAJsetPageProfession',
		type: 'post',
		dataType: 'json',
		data: {'id': id},
	})
	.done(function() {
		console.log("setProfession success");
		$("#professionid").attr('profid', id);
		$("#professionid").html(name);

		//更新

		//毕业要求指标点课程关联视图
		var jsr={professionId:getProfessionid()};
		jsr=JSON.stringify(jsr);
		viewSubgradCourseRelationQuery(jsr);
		////关联指标点达成度视图
		viewRelationAchievedegreeQuery(jsr);
		//达成统计
		viewAchieveStatisticsQuery(jsr);
		//毕业要求达成统计
		viewGraduationStatisticsQuery(jsr);
		//毕业要求
		jsr={professionId:getProfessionid()};
		jsr=JSON.stringify(jsr);
		graduationrequirementQuery(jsr);
		//毕业要求指标点
		subgraduationrequirementQuery(jsr);

	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});	
	
}


//课程
function courseQuery (pjson) {
	 // body...  
	 $.ajax({
	 	url: 'getCourseQuery',
	 	type: 'post',
	 	dataType: 'json',
	 	data: {"jsonstr": pjson,"maxResults":20,"page":1},
	 })
	 .done(function(result) {
	 	console.log("courseQuery success");
	 	if (result==null) {
	 		alert("课程查询失败");
	 	}else if (result=="") {
	 		$("#tbcourse").children().remove();
	 	}else{
	 		var ret=result;
	 		var jsr=ret.courselist;
	 		var total=ret.total;
	 		if(total%20==0)  //每页大小最大20
	 			total/=20;
	 		else total=total/20+1;

	 		// var str="";
	 		// for (var i = 0; i < jsr.length; i++) {
	 		// 	str+='<tr id= "trcourse'+i+'">';
	 		// 	str+="<td>"+(i+1)+"</td>";
	 		// 	str+="<td>"+jsr[i].id+"</td>";
	 		// 	str+="<td>"+jsr[i].coursename+"</td>";
	 		// 	str+="<td>"+jsr[i].totalcredit+"</td>";
	 		// 	str+="<td>"+jsr[i].totalperiod+"</td>";
	 		// 	str+="<td>"+jsr[i].lecture+"</td>";
	 		// 	str+="<td>"+jsr[i].experiment+"</td>";
	 		// 	str+="<td>"+jsr[i].oncomputer+"</td>";
	 		// 	str+="<td>"+jsr[i].extracurricular+"</td>";
	 		// 	str+="<td>"+jsr[i].evaluationmethod+"</td>";
	 		// 	str+="<td>"+jsr[i].coursetype+"</td>";
	 		// 	str+='<td><a href="#" id="tdcoursemodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 		// 	str+='<td><a href="#" id="tdcoursedelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 		// 	str+="</tr>";
	 		// }
	 		// $("#tbcourse").children().remove();
	 		// $("#tbcourse").html(str);
	 		// for (var i = 0; i < jsr.length; i++) {
	 		// 	var trid="#trcourse"+i;
	 		// 	$(trid).attr("data-courseid", jsr[i].id);
	 		// 	var tdmodify="#tdcoursemodify"+i;
	 		// 	var tddelete="#tdcoursedelete"+i;
	 		// 	//传递tr的id，在函数里用tr遍历td中的每个值
	 		// 	$(tdmodify).attr('href', 'javascript:modifyCourse("'+trid+'")');
	 		// 	$(tddelete).attr('href', 'javascript:deleteCourse('+jsr[i].id+')');
	 		// }

	 		//设置分页控件
	 		//重建
	 		if($("#pagination-course").data("twbs-pagination")){
	 			$("#pagination-course").twbsPagination('destroy');
	 		}
	 		$("#pagination-course").twbsPagination({
	 			totalPages: total,
	 			visiblePages: 7,
	 			first: '首页',
	 			prev: '上一页',
	 			next: '下一页',
	 			last: '尾页',
	 			onPageClick: function (event, page) {

	 				$.ajax({
	 					url: 'getCourseQuery',
	 					type: 'post',
	 					dataType: 'json',
	 					data: {"jsonstr": pjson,"maxResults":20,"page":page},
	 				})
	 				.done(function(result) {
	 					console.log("success");

	 					var ret=result
	 					var jsr=ret.courselist;

	 					var str="";
	 					var codestart=(page-1)*20;
	 					for (var i = 0; i < jsr.length; i++) {
	 						str+='<tr id= "trcourse'+i+'">';
	 						str+="<td>"+(codestart+i+1)+"</td>";
	 						// str+="<td>"+jsr[i].id+"</td>";
	 						str+="<td>"+jsr[i]['fields'].courseName+"</td>";
	 						str+="<td>"+jsr[i]['fields'].totalCredit+"</td>";
	 						str+="<td>"+jsr[i]['fields'].totalPeriod+"</td>";
	 						str+="<td>"+jsr[i]['fields'].lecture+"</td>";
	 						str+="<td>"+jsr[i]['fields'].experiment+"</td>";
	 						str+="<td>"+jsr[i]['fields'].onComputer+"</td>";
	 						str+="<td>"+jsr[i]['fields'].extracurricular+"</td>";
	 						str+="<td>"+jsr[i]['fields'].evaluationMethod+"</td>";
	 						str+="<td>"+jsr[i]['fields'].courseType+"</td>";
	 						str+='<td><a href="#" id="tdcoursemodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 						str+='<td><a href="#" id="tdcoursedelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 						str+="</tr>";
	 					}
	 					$("#tbcourse").children().remove();
	 					$("#tbcourse").html(str);
	 					for (var i = 0; i < jsr.length; i++) {
	 						var trid="#trcourse"+i;
	 						$(trid).attr("data-courseid", jsr[i].pk);
	 						var tdmodify="#tdcoursemodify"+i;
	 						var tddelete="#tdcoursedelete"+i;
	 						//传递tr的id，在函数里用tr遍历td中的每个值
	 						$(tdmodify).attr('href', 'javascript:modifyCourse("'+trid+'")');
	 						$(tddelete).attr('href', 'javascript:deleteCourse('+jsr[i].pk+')');
	 					}
	 					//权限控制
	 					rightControl();
	 				})
	 				.fail(function() {
	 					console.log("error");
	 				})
	 				.always(function() {
	 					console.log("complete");
	 				});
	 			}
	 		});


	 	}
		 //刷新权限
		 rightControl();
		})
.fail(function() {
	console.log("courseQuery error");
	alert("ajax请求课程失败");
})
.always(function() {
	console.log("courseQuery complete");
});

}

//毕业要求
function graduationrequirementQuery (pjson) {
	 // body...  
	 $.ajax({
	 	url: 'getGraduationRequirementQuery',
	 	type: 'post',
	 	dataType: 'json',
	 	data: {"jsonstr": pjson},
	 })
	 .done(function(result) {
	 	console.log("graduationrequirementQuery success");
	 	if (result==null) {
	 		alert("毕业要求查询失败");
	 	}else if (result=="") {
	 		$("#tbgraduationrequirement").children().remove();
	 	}else{
	 		var jsr=result.requiredlist;
	 		var str="";
	 		for (var i = 0; i < jsr.length; i++) {
	 			str+='<tr id= "trgraduationrequirement'+i+'">';
	 			str+="<td>"+jsr[i]['fields'].gr_code+"</td>";
	 			// str+="<td>"+jsr[i].id+"</td>";
	 			str+="<td>"+jsr[i]['fields'].gr_content+"</td>";
	 			str+='<td><a href="#" id="tdgraduationrequirementmodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			str+='<td><a href="#" id="tdgraduationrequirementdelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 			str+="</tr>";
	 		}
	 		$("#tbgraduationrequirement").children().remove();
	 		$("#tbgraduationrequirement").html(str);
	 		for (var i = 0; i < jsr.length; i++) {
	 			var trid="#trgraduationrequirement"+i;
	 			$(trid).attr("data-graduationrequirementid", jsr[i].pk);
	 			var tdmodify="#tdgraduationrequirementmodify"+i;
	 			var tddelete="#tdgraduationrequirementdelete"+i;
	 			//传递tr的id，在函数里用tr遍历td中的每个值
	 			$(tdmodify).attr('href', 'javascript:modifyGraduationrequirement("'+trid+'")');
	 			$(tddelete).attr('href', 'javascript:deleteGraduationrequirement('+jsr[i].pk+')');
	 		}

	 	}
		 //刷新权限
		 rightControl();
		})
	 .fail(function() {
	 	console.log("graduationrequirementQuery error");
	 	alert("ajax请求毕业要求失败!");
	 })
	 .always(function() {
	 	console.log("graduationrequirementQuery complete");
	 });
	 
	}

//毕业要求指标点
function subgraduationrequirementQuery (pjson) {
	 // body...  
	 $.ajax({
	 	url: 'getSubgraduationRequirementQuery',
	 	type: 'post',
	 	dataType: 'json',
	 	data: {"jsonstr": pjson},
	 })
	 .done(function(result) {
	 	console.log("subgraduationrequirementQuery success");

	 	if (result==null) {
	 		alert("毕业要求指标点查询失败 ");
	 	}else if (result=="") {
	 		$("#tbsubgraduationrequirement").children().remove();
	 	}else{
	 		var jsr=result.requirelist;
	 		
	 		$.ajax({
	 			url: 'getGraduationRequirementQuery',
	 			type: 'post',
	 			dataType: 'json',
	 			//async: false, //同步
	 			data: {"jsonstr": pjson},
	 		})
	 		.done(function(result2) {
	 			console.log("success");
	 			var jsr2=result2.requiredlist;
	 			var str="";
	 			for (var i = 0; i < jsr2.length; i++) {

	 				var rowspan=0,k=0;
	 				var sgr=new Array();
	 				for (var j = 0; j < jsr.length; j++) {
	 					if(jsr[j]['fields'].graduationRequirement_id==jsr2[i].pk)
	 					{
	 						rowspan++;
	 						sgr[k++]=j;
	 					}
	 				}

	 				
	 				if(sgr.length>=1)
	 				{
	 					var trid="#trsubgraduationrequirement"+sgr[0];
	 					str+='<tr id= "'+trid+'">';
	 					str+='<td rowspan="'+rowspan+'">'+jsr2[i]['fields'].gr_code+"</td>";
	 					str+='<td rowspan="'+rowspan+'">'+jsr2[i]['fields'].gr_content+"</td>";
	 					// str+='<td>'+jsr[sgr[0]].id+'</td>';
	 					str+='<td>'+jsr[sgr[0]]['fields'].sgr_code+'</td>';
	 					str+='<td>'+jsr[sgr[0]]['fields'].sgr_content+'</td>';
	 					str+='<td>'+jsr[sgr[0]]['fields'].sgr_weight+'</td>';

	 					var argjsr=JSON.stringify(jsr[sgr[0]]);
	 					argjsr=argjsr.replace(/"/g, '\\"');//替换所有"为\"
	 					argjsr="javascript:modifySubgraduationrequirement(\""+argjsr+"\")";
	 					str+='<td><a href='+argjsr+'  data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 					str+='<td><a href="javascript:deleteSubgraduationrequirement('+jsr[sgr[0]].pk+')"  data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 					str+="</tr>";
	 				}
	 				for (var j = 1; j < sgr.length; j++) {
	 					var trid="#trsubgraduationrequirement"+sgr[j];
	 					str+='<tr id= "'+trid+'">';
	 					// str+='<td>'+jsr[sgr[j]].id+'</td>';
	 					str+='<td>'+jsr[sgr[j]]['fields'].sgr_code+'</td>';
	 					str+='<td>'+jsr[sgr[j]]['fields'].sgr_content+'</td>';
	 					str+='<td>'+jsr[sgr[j]]['fields'].sgr_weight+'</td>';
	 					var argjsr=JSON.stringify(jsr[sgr[j]]);
	 					argjsr=argjsr.replace(/"/g, '\\"');//替换所有"为\"
	 					argjsr="javascript:modifySubgraduationrequirement(\""+argjsr+"\")";
	 					str+='<td><a href='+argjsr+' data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
	 					str+='<td><a href="javascript:deleteSubgraduationrequirement('+jsr[sgr[j]].pk+')" id="tdsubgraduationrequirementdelete'+sgr[j]+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
	 					str+="</tr>";
	 				}			
	 			}
	 			$("#tbsubgraduationrequirement").children().remove();
	 			$("#tbsubgraduationrequirement").html(str);
	 			

	 		})
	 		.fail(function() {
	 			console.log("error");
	 			$("#tbsubgraduationrequirement").children().remove();
	 		})
	 		.always(function() {
	 			console.log("complete");
	 		});
	 		
	 	}
		 //刷新权限
		 rightControl();
		})
	 .fail(function() {
	 	console.log("subgraduationrequirementQuery error");
	 	alert('ajax请求毕业要求指标点失败！');
	 })
	 .always(function() {
	 	console.log("subgraduationrequirementQuery complete");
	 });
	 
	}


//指标点与课程关联达成度
function viewRelationAchievedegreeQuery(pjson) {
	// body...

	$.ajax({
		url: 'queryViewRelationAchievedegree',
		type: 'post',
		dataType: 'json',
		data: {"jsonstr": pjson},
	})
	.done(function(result) {
		console.log("viewRelationAchievedegreeQuery success");

		if(result==null){
			alert("达成度查询失败");
		}else{
			var jsr=result['querylist'];
			var str='';
			for (var i = 0; i < jsr.length; i++) {
				var trid='trviewrelationachievedegree'+i;
				str+='<tr id="'+trid+'">';
				str+='<td>'+(i+1)+'</td>';
				str+='<td>'+jsr[i]['fields']['gr'].gr_code+'</td>';
				str+='<td>'+jsr[i]['fields']['sgr'].sgr_code+'</td>';
				str+='<td>'+jsr[i]['fields']['course'].courseName+'</td>';
				str+='<td>'+jsr[i]['fields'].academic_year+'</td>';
				str+='<td>'+jsr[i]['fields'].achieveDegree+'</td>';
				str+='<td>'+jsr[i]['fields'].feedback+'</td>';

				str+='<td><a href="#" id="tdviewrelationachievedegreemodify'+i+'" data-toggle="tooltip" data-placement="bottom" title="修改" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-pencil" style="color: rgb(48, 90, 207);"></span></a></td>';
				str+='<td><a href="#" id="tdviewrelationachievedegreedelete'+i+'" data-toggle="tooltip" data-placement="bottom" title="删除" class="btn obe-right-control" role="button"><span class="glyphicon glyphicon-trash" style="color: rgb(48, 90, 207);"></span></a></td>';
				str+='</tr>';
			}
			$("#tbviewrelationachievedegree").children().remove();
			$("#tbviewrelationachievedegree").html(str);
			for (var i = 0; i < jsr.length; i++) {
				var trid='#trviewrelationachievedegree'+i;
				$(trid).attr("data-relationachievedegreeid", jsr[i].pk);
				$(trid).attr('data-relationid', jsr[i]['fields'].relation_id);
				var tdmodify="#tdviewrelationachievedegreemodify"+i;
				var tddelete="#tdviewrelationachievedegreedelete"+i;
				$(tdmodify).attr('href', 'javascript:modifyRelationachievedegree("'+trid+'")');
				$(tddelete).attr('href', 'javascript:deleteRelationachievedegree('+jsr[i].pk+')');

			}
		}
 			//刷新权限
 			rightControl();
 		})
	.fail(function() {
		console.log("viewRelationAchievedegreeQuery error");
	})
	.always(function() {
		console.log("viewRelationAchievedegreeQuery complete");
	});
	

}

//指标点对应的达成度
function viewAchieveStatisticsQuery(pjson) {
	// body...
	$.ajax({
		url: 'queryViewAchieveStatistics',
		type: 'post',
		dataType: 'json',
		data: {"jsonstr": pjson},
	})
	.done(function(result) {
		console.log("viewAchieveStatisticsQuery success");

		if(result==null){
			alert("指标点对应的达成度统计查询失败");
		}else{
			var jsr=result['sgrlist'];
			var str='';
			for (var i = 0; i < jsr.length; i++) {
				str+='<tr>';
				str+='<td>'+(i+1)+'</td>';
				str+='<td>'+jsr[i]['fields']['gr'].gr_code+'</td>';
				str+='<td>'+jsr[i]['fields'].sgr_code+'</td>';
				str+='<td>'+jsr[i]['fields'].statistics+'</td>';
				str+='<td>'+jsr[i]['fields'].academicYear+'</td>';
				str+='</tr>';
			}
			$("#tbviewachievestatistics").children().remove();
			$("#tbviewachievestatistics").html(str);
		}

		//刷新权限
		rightControl();
	})
	.fail(function() {
		console.log("viewAchieveStatisticsQuery error");
	})
	.always(function() {
		console.log("viewAchieveStatisticsQuery complete");
	});

}


//毕业要求达成度
function viewGraduationStatisticsQuery(pjson) {
	// body...
	$.ajax({
		url: 'queryviewGraduationStatistics',
		type: 'post',
		dataType: 'json',
		data: {"jsonstr": pjson},
	})
	.done(function(result) {
		console.log("viewGraduationStatisticsQuery success");

		if(result==null){
			alert("毕业达成度统计查询失败");
		}else{
			var jsr=result['grlist'];
			var str='';
			for (var i = 0; i < jsr.length; i++) {
				str+='<tr>';
				str+='<td>'+(i+1)+'</td>';
				str+='<td>'+jsr[i]['fields'].gr_code+'</td>';
				str+='<td>'+jsr[i]['fields'].statistics+'</td>';
				str+='<td>'+jsr[i]['fields'].academicYear+'</td>';
				str+='</tr>';
			}
			$("#tbviewgraduationstatistics").children().remove();
			$("#tbviewgraduationstatistics").html(str);
		}

		//刷新权限
		rightControl();
	})
	.fail(function() {
		console.log("viewGraduationStatisticsQuery error");
	})
	.always(function() {
		console.log("viewGraduationStatisticsQuery complete");
	});

}





//毕业要求指标点与课程关联---废弃、无用
function subgradCourseRelationQuery (pjson) {
	 // body...  
	 $.ajax({
	 	url: 'LAJquerySubgradCourseRelation',
	 	type: 'post',
	 	dataType: 'json',
	 	data: {"jsonstr": pjson},
	 })
	 .done(function(result) {
	 	console.log("subgradCourseRelationQuery success");
	 	//console.log(result);
	 	if(result==null)
	 	{
	 		alert("毕业要求指标点与课程关联查询失败 ");
	 	}else if(result==""){
	 		$("#tbviewsubgradcourserelation").children().remove();
	 	}else{
			var jsr=JSON.parse(result);//

		}

	})
	 .fail(function() {
	 	console.log("subgradCourseRelationQuery error");
	 })
	 .always(function() {
	 	console.log("subgradCourseRelationQuery complete");
	 });
	 
	}

//模态框-增加课程
function addCourse () {
	 // body...  
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">课程ID</span>'+
	 // '<input type="text" class="form-control" name="id" value="">'+
	 // '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程名</span>'+
	 '<input type="text" class="form-control" name="coursename" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">总学分</span>'+
	 '<input type="text" class="form-control" name="totalcredit" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">总学时</span>'+
	 '<input type="text" class="form-control" name="totalperiod" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '<div class="input-group"><span class="input-group-addon">学时分配</span></div>'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">授课</span>'+
	 '<input type="text" class="form-control" name="lecture" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">实验</span>'+
	 '<input type="text" class="form-control" name="experiment" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">上机</span>'+
	 '<input type="text" class="form-control" name="oncomputer" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课外</span>'+
	 '<input type="text" class="form-control" name="extracurricular" value="">'+
	 '</div></div>'+
	 '</div><br>'+   //end row
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">考核类型</span>'+
	 '<input type="text" class="form-control" name="evaluationmethod" value="">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程性质</span>'+
	 '<input type="text" class="form-control" name="coursetype" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('增加课程');
	 $('#modal-body').html(str);
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('增加');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	//jsr.profession={id:getProfessionid()};
	 	// jsr.id=$(trid).attr('data-graduationcreditrequiredid');
	 	jsr=JSON.stringify(jsr);	
	 	saveAjax('saveCourse',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={};
		 	 jsr=JSON.stringify(jsr);
		 	 courseQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}
//增加毕业要求
function addGraduationrequirement () {
	 // body...  
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">毕业要求ID</span>'+
	 // '<input type="text" class="form-control" name="id" value="">'+
	 // '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">毕业要求编号</span>'+
	 '<input type="text" class="form-control" name="grCode" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">毕业要求内容</span>'+
	 '<textarea class="form-control" name="grContent" rows="3"></textarea>'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('增加毕业要求');
	 $('#modal-body').html(str);
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('增加');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.professionId=getProfessionid();
	 	// jsr.id=$(trid).attr('data-graduationcreditrequiredid');
	 	jsr=JSON.stringify(jsr);	
	 	saveAjax('saveGraduationrequirement',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={professionId:getProfessionid()};
		 	 jsr=JSON.stringify(jsr);
		 	 graduationrequirementQuery(jsr);
		 	 viewGraduationStatisticsQuery(jsr);

		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}
//增加要求指标点
function addSubgraduationrequirement () {
	 // body...  

	 var str='';
	 str+='<div class="container-fluid">'+
	 '<form id="modal-form" role="form">'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">毕业要求编号</span>'+
	 '<select  class="selectpicker " data-live-search="true" id="modal-selectpicker"></select>'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">指标点编号</span>'+
	 '<input type="text" class="form-control" name="sgrCode" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">指标点内容</span>'+
	 '<textarea class="form-control" name="sgrContent" rows="3"></textarea>'+
	 '</div></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">权重</span>'+
	 '<input type="text" class="form-control" name="sgrWeight" value="">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</from></div>';

	 //js生成DOM方式
	 //var  form=document.createElement("form");
	 //form.setAttribute("id", "modal-form");

	 //显示模态框
	 $('#modal-title').html('增加毕业要求指标点');
	  // $('#modal-body').
	 // $('#modal-body').html(str);
	 var modalbody=document.getElementById("modal-body");
	 modalbody.innerHTML=str;
	 // console.log(str);

	  //加载下拉列表
	  $.when(selectGraduationrequirementData()).done(function (result) {
	  	/* body... */ 
	  	if(result==null){
	  		alert("查询毕业要求编号出错")
	  	}else{
	  		var option= '';
	  		var jsr=result['grlist'];
	  		for (var i = 0; i < jsr.length; i++) {
	  			option+='<option value="'+jsr[i].pk+'">'+jsr[i]['fields'].gr_code+'</option>';
	  		}

	  		$("#modal-selectpicker").html(option);
	  		//重新修改select
	  		$('.selectpicker').selectpicker();	 		
	  	}
	  });


	  $('#modal-btn-submit').html('增加');
	  $('#modal').modal('show'); //打开模态框
	  
	  $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	  	var jsr=$("#modal-form").serializeJson();
	 	//jsr.profession={id:getProfessionid()};
	 	jsr.graduationrequirement={id:$("#modal-selectpicker").val()};
	 	jsr=JSON.stringify(jsr);	
	 	saveAjax('saveSubgraduationrequirement',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={professionId:getProfessionid()};
		 	 jsr=JSON.stringify(jsr);
		 	 subgraduationrequirementQuery(jsr);
		 	 viewAchieveStatisticsQuery(jsr);
		 	 viewGraduationStatisticsQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});


	}
//增加毕业要求指标点与课程关联
function addSubgradcourserelation () {
	 // body...  
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">ID</span>'+
	 // '<input type="text" class="form-control" name="id" value="'+jsr.id.id+'">'+
	 // '</div></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">指标点</span>'+
	 '<select  class="selectpicker" data-live-search="true" id="modal-selectpicker1"></select>'+
	 // '<input type="text" class="form-control" id="modal-subGraduationRequirementId" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程名称</span>'+
	 '<select  class="selectpicker" data-live-search="true" id="modal-selectpicker2"></select>'+
	 // '<input type="text" class="form-control" id="modal-courseId" value="">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">达成度占比(百分制)</span>'+
	 '<input type="text" class="form-control" name="weight" value="">'+
	 '</div></div>'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">课程2015-2016达成度</span>'+
	 // '<input type="text" class="form-control" name="arrivedFirst" value="">'+
	 // '</div></div>'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">课程2016-2017达成度</span>'+
	 // '<input type="text" class="form-control" name="arrivedSecond" value="">'+
	 // '</div></div>'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">课程2017-2018达成度</span>'+
	 // '<input type="text" class="form-control" name="arrivedThrid" value="">'+
	 // '</div></div>'+
	 // '<div class="col-xs-12">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">课程反馈2015-2016(10分制)</span>'+
	 // '<input type="text" class="form-control" name="coursefeedback" value="">'+
	 // '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('增加毕业要求指标点与课程关联');
	 $('#modal-body').html(str);

	 //加载下拉列表
	 $.when(selectSubgraduationrequirementData(),selectCourseData()).done(function (result1,result2) {
	 	/* body... */ 
	 	if(result1==null||result2==null){
	 		alert("查询课程与指标点出错");
	 	}else{
	 		var option1= '';
	 		var opt1=result1['sgrlist'];
	 		for (var i = 0; i < opt1.length; i++) {
	 			option1+='<option value="'+opt1[i].pk+'">'+opt1[i]['fields'].selectsgr+'</option>';
	 		}
	 		$("#modal-selectpicker1").html(option1);

	 		var option2= '';
	 		var opt2=result2['courselist'];
	 		for (var i = 0; i < opt2.length; i++) {
	 			option2+='<option value="'+opt2[i].pk+'">'+opt2[i]['fields'].courseName+'</option>';
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
	 	//jsr.profession={id:getProfessionid()};
	 	jsr.subgraduationrequirement={id:$("#modal-selectpicker1").val()};
	 	jsr.course={id:$("#modal-selectpicker2").val()};
	 	jsr=JSON.stringify(jsr);	
	 	saveAjax('saveSubgradCourseRelation',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={professionId:getProfessionid()};
		 	 jsr=JSON.stringify(jsr);
		 	 viewSubgradCourseRelationQuery(jsr);
		 	 viewAchieveStatisticsQuery(jsr);
		 	 viewGraduationStatisticsQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}

//增加关联达成度
function addRelationachievedegree() {
	// body...
	var str='';
	str+='<form id="modal-form" role="form">'+
	'<div class="container-fluid">'+
	'<div class="row">'+
	'<div class="col-xs-12">'+
	'<div class="input-group">'+
	'<span class="input-group-addon">指标点与课程关联</span>'+
	'<select  class="selectpicker" data-live-search="true" id="modal-selectpicker1"></select>'+
	'</div></div>'+'<div class="col-xs-12 space" ></div>'+
	'<div class="col-xs-12">'+
	'<div class="input-group">'+
	'<span class="input-group-addon">学年</span>'+
	'<input type="text" class="form-control" name="academicYear" value="">'+
	'</div></div>'+'<div class="col-xs-12 space" ></div>'+
	'<div class="col-xs-12">'+
	'<div class="input-group">'+
	'<span class="input-group-addon">达成度(百分制)</span>'+
	'<input type="text" class="form-control" name="achievedegree" value="">'+
	'</div></div>'+'<div class="col-xs-12 space" ></div>'+
	'<div class="col-xs-12">'+
	'<div class="input-group">'+
	'<span class="input-group-addon">课程反馈(十分制)</span>'+
	'<input type="text" class="form-control" name="feedback" value="">'+
	'</div></div>'+'<div class="col-xs-12 space" ></div>'+
	'</div>'+   //end row
	'</div></from>';
	 //显示模态框
	 $('#modal-title').html('增加关联达成度');
	 $('#modal-body').html(str);

	  //加载下拉列表
	  $.when(selectSubgradCourseRelationData()).done(function (result1) {
	  	/* body... */ 
	  	if(result1==null){
	  		alert("指标点与课程关联查询出错");
	  	}else{
	  		var option1= '';
	  		var opt1=result1['sgcrlist'];
	  		for (var i = 0; i < opt1.length; i++) {
	  			option1+='<option value="'+opt1[i].pk+'">'+opt1[i].coursename+'</option>';
	  		}
	  		$("#modal-selectpicker1").html(option1);

	  		//重新修改select
	  		$('.selectpicker').selectpicker();	 		
	  	}
	  });
	  
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('增加');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	
	 	jsr.subgradCourseRelation={id:$("#modal-selectpicker1").val()};
	 	
	 	jsr=JSON.stringify(jsr);	
	 	saveAjax('saveRelationAchievedegree',jsr,function () {
	 		/* body... */ 	 	 
	 	 //回调函数,用于刷新
	 	 var jsr={professionId:getProfessionid()};
	 	 jsr=JSON.stringify(jsr);
	 	 viewRelationAchievedegreeQuery(jsr);
	 	 viewAchieveStatisticsQuery(jsr);
	 	 viewGraduationStatisticsQuery(jsr);
	 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}


//模态框-修改课程
function modifyCourse (trid) {
	 // body...  
	 var tds=$(trid).children('td');
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">课程ID</span>'+
	 // '<input type="text" class="form-control" name="id" value="'+tds[1].innerHTML+'">'+
	 // '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程名</span>'+
	 '<input type="text" class="form-control" name="coursename" value="'+tds[1].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">总学分</span>'+
	 '<input type="text" class="form-control" name="totalcredit" value="'+tds[2].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">总学时</span>'+
	 '<input type="text" class="form-control" name="totalperiod" value="'+tds[3].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '<div class="input-group"><span class="input-group-addon">学时分配</span></div>'+
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">授课</span>'+
	 '<input type="text" class="form-control" name="lecture" value="'+tds[4].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">实验</span>'+
	 '<input type="text" class="form-control" name="experiment" value="'+tds[5].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">上机</span>'+
	 '<input type="text" class="form-control" name="oncomputer" value="'+tds[6].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课外</span>'+
	 '<input type="text" class="form-control" name="extracurricular" value="'+tds[7].innerHTML+'">'+
	 '</div></div>'+
	 '</div><br>'+   //end row
	 '<div class="row">'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">考核类型</span>'+
	 '<input type="text" class="form-control" name="evaluationmethod" value="'+tds[8].innerHTML+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程性质</span>'+
	 '<input type="text" class="form-control" name="coursetype" value="'+tds[9].innerHTML+'">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('修改课程');
	 $('#modal-body').html(str);
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('修改');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	//jsr.profession={id:getProfessionid()};
	 	jsr.id=$(trid).attr('data-courseid');
	 	jsr=JSON.stringify(jsr);	
	 	updateAjax('updateCourse',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={};
		 	 jsr=JSON.stringify(jsr);
		 	 courseQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});

	}
//修改毕业要求
function modifyGraduationrequirement (trid) {
	 // body...  
	 var tds=$(trid).children('td');
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">毕业要求ID</span>'+
	 // '<input type="text" class="form-control" name="id" value="'+tds[1].innerHTML+'">'+
	 // '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">毕业要求编号</span>'+
	 '<input type="text" class="form-control" name="grCode" value="'+tds[0].innerHTML+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">毕业要求内容</span>'+
	 // '<input type="text" class="form-control" name="grContent" value="'+tds[2].innerHTML+'">'+
	 '<textarea class="form-control" name="grContent" rows="3">'+tds[1].innerHTML+'</textarea>'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('修改毕业要求');
	 $('#modal-body').html(str);
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('修改');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	jsr.professionId=getProfessionid();
	 	jsr.id=$(trid).attr('data-graduationrequirementid');
	 	jsr=JSON.stringify(jsr);	
	 	updateAjax('updateGraduationrequirement',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={professionId:getProfessionid()};
		 	 jsr=JSON.stringify(jsr);
		 	 graduationrequirementQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});

	}
//修改要求指标点
function modifySubgraduationrequirement (argjsr) {
	 // body...  
	 var jsr=JSON.parse(argjsr);
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">ID</span>'+
	 // '<input type="text" class="form-control" name="id" value="'+jsr.id+'">'+
	 // '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">毕业要求编号</span>'+
	 '<select  class="selectpicker" data-live-search="true" id="modal-selectpicker"></select>'+
	 // '<input type="text" class="form-control" id="modal-grid" value="'+jsr.graduationrequirement.id+'">'+
	 '</div></div>'+
	 '<div class="col-xs-6">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">指标点编号</span>'+
	 '<input type="text" class="form-control" name="sgrCode" value="'+jsr['fields'].sgr_code+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">指标点内容</span>'+
	 // '<input type="text" class="form-control" name="sgrContent" value="'+jsr.sgrContent+'">'+
	 '<textarea class="form-control" name="sgrContent" rows="3">'+jsr['fields'].sgr_content+'</textarea>'+
	 '</div></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">权重</span>'+
	 '<input type="text" class="form-control" name="sgrWeight" value="'+jsr['fields'].sgr_weight+'">'+
	 '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('修改毕业要求指标点');
	 $('#modal-body').html(str);

	 //加载下拉列表
	 $.when(selectGraduationrequirementData()).done(function (result) {
	 	/* body... */ 
	 	if(result==null){
	 		alert("查询毕业要求编号出错")
	 	}else{
	 		var option= '';
	 		var opt = result['grlist'];
	 		for (var i = 0; i < opt.length; i++) {
	 			if(opt[i].pk==jsr['fields'].graduationRequirement_id)
	 			{
	 				option+='<option value="'+opt[i].pk+'" selected="true">'+opt[i]['fields'].gr_code+'</option>';
	 			}else{
	 				option+='<option value="'+opt[i].pk+'">'+opt[i]['fields'].gr_code+'</option>';
	 			}

	 		}

	 		$("#modal-selectpicker").html(option);
	  		//重新修改select
	  		$('.selectpicker').selectpicker();	 		
	  	}
	  });

	 var tid=jsr.pk;
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('修改');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	//jsr.profession={id:getProfessionid()};
		jsr.id=tid;
	 	jsr.graduationrequirement={id:$("#modal-selectpicker").val()};
	 	jsr=JSON.stringify(jsr);
	 	updateAjax('updateSubgraduationrequirement',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新
		 	 var jsr={professionId:getProfessionid()};
		 	 jsr=JSON.stringify(jsr);
		 	 subgraduationrequirementQuery(jsr);
		 	 viewAchieveStatisticsQuery(jsr);
		 	 viewGraduationStatisticsQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});

	}
//修改毕业要求指标点与课程关联
function modifySubgradcourserelation (argjsr) {
	 // body...  
	 var jsr=JSON.parse(argjsr);
	 var str='';
	 str+='<form id="modal-form" role="form">'+
	 '<div class="container-fluid">'+
	 '<div class="row">'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">指标点</span>'+
	 '<select  class="selectpicker" data-live-search="true" id="modal-selectpicker1"></select>'+
	 // '<input type="text" class="form-control" id="modal-subGraduationRequirementId" value="'+jsr.subGraduationRequirementId+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">课程</span>'+
	 '<select  class="selectpicker" data-live-search="true" id="modal-selectpicker2"></select>'+
	 // '<input type="text" class="form-control" id="modal-courseId" value="'+jsr.courseId+'">'+
	 '</div></div>'+'<div class="col-xs-12 space" ></div>'+
	 '<div class="col-xs-12">'+
	 '<div class="input-group">'+
	 '<span class="input-group-addon">达成度占比(百分制)</span>'+
	 '<input type="text" class="form-control" name="weight" value="'+jsr.weight+'">'+
	 '</div></div>'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">课程2015-2016达成度</span>'+
	 // '<input type="text" class="form-control" name="arrivedFirst" value="'+jsr.arrivedFirst+'">'+
	 // '</div></div>'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">课程2016-2017达成度</span>'+
	 // '<input type="text" class="form-control" name="arrivedSecond" value="'+jsr.arrivedSecond+'">'+
	 // '</div></div>'+
	 // '<div class="col-xs-6">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">课程2017-2018达成度</span>'+
	 // '<input type="text" class="form-control" name="arrivedThrid" value="'+jsr.arrivedThrid+'">'+
	 // '</div></div>'+
	 // '<div class="col-xs-12">'+
	 // '<div class="input-group">'+
	 // '<span class="input-group-addon">课程反馈2015-2016(10分制)</span>'+
	 // '<input type="text" class="form-control" name="coursefeedback" value="'+jsr.coursefeedback+'">'+
	 // '</div></div>'+
	 '</div>'+   //end row
	 '</div></from>';
	 //显示模态框
	 $('#modal-title').html('修改毕业要求指标点与课程关联');
	 $('#modal-body').html(str);

	 //有两个问题，1.指标点的编号应该加上毕业要求的编号，2.连个下拉列表只会生效一个

	 //加载下拉列表
	 $.when(selectSubgraduationrequirementData(),selectCourseData()).done(function (result1,result2) {
	 	/* body... */ 
	 	if(result1==null||result2==null){
	 		alert("查询课程与指标点出错");
	 	}else{
	 		var option1= '';
	 		var opt1=result1['sgrlist'];
	 		for (var i = 0; i < opt1.length; i++) {
	 			if(opt1[i].pk==jsr.subGraduationRequirementId)
	 				option1+='<option value="'+opt1[i].pk+'" selected="true">'+opt1[i]['fields'].sgr_code+'</option>';
	 			else
	 				option1+='<option value="'+opt1[i].pk+'">'+opt1[i]['fields'].sgr_code+'</option>';
	 		}
	 		$("#modal-selectpicker1").html(option1);

	 		var option2= '';
	 		var opt2=result2['courselist'];
	 		for (var i = 0; i < opt2.length; i++) {
	 			if(opt2[i].pk==jsr.courseId)
	 			{
	 				option2+='<option value="'+opt2[i].pk+'" selected="true">'+opt2[i]['fields'].courseName+'</option>';
	 			}else{
	 				option2+='<option value="'+opt2[i].pk+'">'+opt2[i]['fields'].courseName+'</option>';
	 			}
	 		}

	 		$("#modal-selectpicker2").html(option2);

	  		//重新修改select
	  		$('.selectpicker').selectpicker();	 		
	  	}
	  });
	 

	 var tid=jsr.id;

	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('修改');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	
	 	jsr.id=tid;
	 	jsr.subgraduationrequirement={id:$("#modal-selectpicker1").val()};
	 	jsr.course={id:$("#modal-selectpicker2").val()};
	 	jsr=JSON.stringify(jsr);	
	 	updateAjax('updateSubgradCourseRelation',jsr,function () {
	 		/* body... */ 
		 	 //回调函数,用于刷新		 	 
		 	 var jsr={professionId:getProfessionid()};
		 	 jsr=JSON.stringify(jsr);
		 	 viewSubgradCourseRelationQuery(jsr);
		 	 viewAchieveStatisticsQuery(jsr);
		 	 viewGraduationStatisticsQuery(jsr);
		 	});
		$('#modal').modal('hide'); //隐藏模态框
	});
	}

//修改关联达成度
function modifyRelationachievedegree(trid) {
	// body...
	var tds=$(trid).children('td');
	var str='';
	str+='<form id="modal-form" role="form">'+
	'<div class="container-fluid">'+
	'<div class="row">'+
	'<div class="col-xs-12">'+
	'<div class="input-group">'+
	'<span class="input-group-addon">指标点与课程关联</span>'+
	'<select  class="selectpicker" data-live-search="true" id="modal-selectpicker1"></select>'+
	'</div></div>'+'<div class="col-xs-12 space" ></div>'+
	'<div class="col-xs-12">'+
	'<div class="input-group">'+
	'<span class="input-group-addon">学年</span>'+
	'<input type="text" class="form-control" name="academicYear" value="'+tds[4].innerHTML+'">'+
	'</div></div>'+'<div class="col-xs-12 space" ></div>'+
	'<div class="col-xs-12">'+
	'<div class="input-group">'+
	'<span class="input-group-addon">达成度(百分制)</span>'+
	'<input type="text" class="form-control" name="achievedegree" value="'+tds[5].innerHTML+'">'+
	'</div></div>'+'<div class="col-xs-12 space" ></div>'+
	'<div class="col-xs-12">'+
	'<div class="input-group">'+
	'<span class="input-group-addon">课程反馈(十分制)</span>'+
	'<input type="text" class="form-control" name="feedback" value="'+tds[6].innerHTML+'">'+
	'</div></div>'+'<div class="col-xs-12 space" ></div>'+
	'</div>'+   //end row
	'</div></from>';
	 //显示模态框
	 $('#modal-title').html('修改关联达成度');
	 $('#modal-body').html(str);

	  //加载下拉列表
	  $.when(selectSubgradCourseRelationData()).done(function (result1) {
	  	/* body... */ 
	  	if(result1==null){
	  		alert("指标点与课程关联查询出错");
	  	}else{
	  		var option1= '';
	  		var opt1=result1['sgcrlist'];
	  		for (var i = 0; i < opt1.length; i++) {
	  			if(opt1[i].pk==$(trid).attr('data-relationid'))
	  				option1+='<option value="'+opt1[i].pk+'" selected="true">'+opt1[i].pk+'</option>';
	  			else
	  				option1+='<option value="'+opt1[i].pk+'">'+opt1[i].pk+'</option>';
	  		}
	  		$("#modal-selectpicker1").html(option1);

	  		//重新修改select
	  		$('.selectpicker').selectpicker();	 		
	  	}
	  });

	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('修改');
	 $('#modal-btn-submit').unbind('click').click(function() {  //解除绑定，重新设置click处理函数
	 	var jsr=$("#modal-form").serializeJson();
	 	
	 	jsr.id=$(trid).attr('data-relationachievedegreeid');;
	 	jsr.subgradCourseRelation={id:$("#modal-selectpicker1").val()};	 	
	 	jsr=JSON.stringify(jsr);	
	 	updateAjax('updateRelationAchievedegree',jsr,function () {
	 		/* body... */ 	 	 
	 	 //回调函数,用于刷新
	 	 var jsr={professionId:getProfessionid()};
	 	 jsr=JSON.stringify(jsr);
	 	 viewRelationAchievedegreeQuery(jsr);
	 	 viewAchieveStatisticsQuery(jsr);
	 	 viewGraduationStatisticsQuery(jsr);
	 	});
		$('#modal').modal('hide'); //隐藏模态框
	});


	}


//模态框-删除课程
function deleteCourse (id) {
	 // body...  
	  //弹出模态框
	  $('#modal-title').html('删除课程');
	  $('#modal-body').html('你确定要删除吗？');
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('删除');
	 $('#modal-btn-submit').unbind('click').click(function () {
	 	/* body... */ 
	 	deleteAjax("deleteCourse",id,function () {
	 		/* body... */ 
	 	 //回调函数,用于刷新
	 	 var jsr={};
	 	 jsr=JSON.stringify(jsr);
	 	 courseQuery(jsr);
	 	});
	 	$('#modal').modal('hide'); //隐藏模态框
	 });
	}
//删除毕业要求
function deleteGraduationrequirement (id) {
	 // body...  
	 	  //弹出模态框
	 	  $('#modal-title').html('删除毕业要求');
	 	  $('#modal-body').html('你确定要删除吗？');
		 $('#modal').modal('show'); //打开模态框
		 $('#modal-btn-submit').html('删除');
		 $('#modal-btn-submit').unbind('click').click(function () {
		 	/* body... */ 
		 	deleteAjax("deleteGraduationrequirement",id,function () {
		 		/* body... */ 
	 	 //回调函数,用于刷新
	 	 var jsr={professionId:getProfessionid()};
	 	 jsr=JSON.stringify(jsr);
	 	 graduationrequirementQuery(jsr);
	 	 viewGraduationStatisticsQuery(jsr);
	 	});
	 	$('#modal').modal('hide'); //隐藏模态框
	 });
		}
//删除要求指标点
function deleteSubgraduationrequirement (id) {
	 // body...  
	 //弹出模态框
	 $('#modal-title').html('删除毕业要求指标点');
	 $('#modal-body').html('你确定要删除吗？');
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('删除');
	 $('#modal-btn-submit').unbind('click').click(function () {
	 	/* body... */ 
	 	deleteAjax("deleteSubgraduationrequirement",id,function () {
	 		/* body... */ 
	 	 //回调函数,用于刷新
	 	 var jsr={professionId:getProfessionid()};
	 	 jsr=JSON.stringify(jsr);
	 	 subgraduationrequirementQuery(jsr);
	 	 viewAchieveStatisticsQuery(jsr);
	 	 viewGraduationStatisticsQuery(jsr);
	 	});
	 	$('#modal').modal('hide'); //隐藏模态框
	 });
	}
//删除毕业要求指标点与课程关联
function deleteSubgradcourserelation (id) {
	 // body...  
	 //弹出模态框
	 $('#modal-title').html('删除毕业要求指标点与课程关联');
	 $('#modal-body').html('你确定要删除吗？');
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('删除');
	 $('#modal-btn-submit').unbind('click').click(function () {
	 	/* body... */ 
	 	deleteAjax("deleteSubgradCourseRelation",id,function () {
	 		/* body... */ 
	 	 //回调函数,用于刷新
	 	 var jsr={professionId:getProfessionid()};
	 	 jsr=JSON.stringify(jsr);
	 	 viewSubgradCourseRelationQuery(jsr);
	 	 viewAchieveStatisticsQuery(jsr);
	 	 viewGraduationStatisticsQuery(jsr);
	 	});
	 	$('#modal').modal('hide'); //隐藏模态框
	 });
	}
//删除关联达成度
function deleteRelationachievedegree(id) {
	// body...
	 //弹出模态框
	 $('#modal-title').html('删除指标点与课程关联的达成度');
	 $('#modal-body').html('你确定要删除吗？');
	 $('#modal').modal('show'); //打开模态框
	 $('#modal-btn-submit').html('删除');
	 $('#modal-btn-submit').unbind('click').click(function () {
	 	/* body... */ 
	 	deleteAjax("deleteRelationAchievedegree",id,function () {
	 		/* body... */ 
	 	 //回调函数,用于刷新
	 	 var jsr={professionId:getProfessionid()};
	 	 jsr=JSON.stringify(jsr);
	 	 viewRelationAchievedegreeQuery(jsr);
	 	 viewAchieveStatisticsQuery(jsr);
	 	 viewGraduationStatisticsQuery(jsr);
	 	});
	 	$('#modal').modal('hide'); //隐藏模态框
	 });
	}

//用于自动补全的下拉列表数据获取
//毕业要求
function selectGraduationrequirementData () {
	 // body...  
	 var defer=$.Deferred();
	 $.ajax({
	 	url: 'selectGraduationrequirement',
	 	type: 'post',
	 	dataType: 'json',
	 })
	 .done(function(result) {
	 	console.log("selectGraduationrequirementData success");
	 	defer.resolve(result);
	 })
	 .fail(function() {
	 	console.log("error");
	 })
	 .always(function() {
	 	console.log("complete");
	 });
	 return defer.promise();
	 
	}
//毕业要求指标点
function selectSubgraduationrequirementData(){

	var defer = $.Deferred();
	$.ajax({
		url: 'selectSubgraduationrequirement',
		type: 'post',
		dataType: 'json',
	})
	.done(function(result) {
		console.log("selectSubgraduationrequirementData success");
		defer.resolve(result);
	})
	.fail(function() {
		console.log("selectSubgraduationrequirementData error");
	})
	.always(function() {
		console.log("selectSubgraduationrequirementData complete");
	});
	return defer.promise();
}

//指标点与课程关联
function selectSubgradCourseRelationData() {
	// body...
	var defer = $.Deferred();
	$.ajax({
		url: 'selectSubgradCourseRelation',
		type: 'post',
		dataType: 'json',
	})
	.done(function(result) {
		console.log("selectSubgradCourseRelationData success");
		defer.resolve(result);
	})
	.fail(function() {
		console.log("selectSubgradCourseRelationData error");
	})
	.always(function() {
		console.log("selectSubgradCourseRelationData complete");
	});
	return defer.promise();
}



