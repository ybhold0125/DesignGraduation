from django.shortcuts import render_to_response, get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import json
from .models import (
    School, Profession, ProfessionCultivationPlan, GraduationCreditRequired, GroupCourse,PublicElectiveRequired,
    Course, CourseCultivationPlan, PraticeCultivationPlan, GraduationRequirement, SubGraduationRequirement,
    SubgradCouseRelation,RelationAchieveDegree
    )
from django.core import serializers


# CultivationPlan页面渲染
def index(request):
    # if request.method == 'GET':
        # 无操作事重置session
        # request.session['username'] = '未登录'
        # request.session['account'] = '未登录'
        # request.session['rolename'] = '未登录'
    return render_to_response('CultivationPlan.html')


# Lec页面渲染
def lec(request):
    # if request.method == 'GET':
        # 无操作事重置session
        # request.session['username'] = '未登录'
        # request.session['account'] = '未登录'
        # request.session['rolename'] = '未登录'
    return render_to_response('Lec.html')


# 获取专业
@csrf_exempt
def get_profession(request):

    if request.method == 'POST':
        a = request.POST.get('id')
        request.session['profid'] = a
        return JsonResponse({'code':'success'})
    return JsonResponse({'code':'success'})


# 设置专业
@csrf_exempt
def setPageProfession(request):

    if request.method == 'POST':
        a = request.POST.get('id')
        request.session['profid'] = a
        return JsonResponse({'code':'success'})
    return JsonResponse({'code':'success'})

# 获取学院和对应专业信息
@csrf_exempt
def getSchoolProfessions(request):
    if request.method == 'POST':
        school_data = serializers.serialize("json", School.objects.all())
        school_str = json.loads(school_data)
        profession_data = serializers.serialize("json", Profession.objects.all())
        profession_str = json.loads(profession_data)
        response_data = {'schoollist': school_str,'professionlist':profession_str}
    return HttpResponse(json.dumps(response_data))


# 获取专业培养计划数据
@csrf_exempt
def getProfessionPlanQuery(request):
    if request.method == 'POST':
        res = request.POST.get('param1') # {"profession":{"id":1}}
        a = json.loads(res)['profession']['id']
        plan_data = serializers.serialize("json", ProfessionCultivationPlan.objects.filter(profession_id=a))
        plan_str = json.loads(plan_data)
        response_data = {'planlist': plan_str}
        return HttpResponse(json.dumps(response_data))
    return HttpResponse('success')


# 增加专业培养计划 数据
@csrf_exempt
def saveProfessionCultivationPlan(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        # {"corediscipline":"","tsjyCredit":"","tsjyPeriod":"","tsjyCompulsoryratio":"","tsjyElectiveratio":"","zyjcCredit":"",
        # "zyjcPeriod":"","zyjcCompulsoryratio":"","zyjcElectiveratio":"","zykCredit":"","zykPeriod":"","zykCompulsoryratio":"",
        # "zykElectiveratio":"","dlsjCredit":"","dlsjPeriod":"","dlsjCompulsoryratio":"","dlsjElectiveratio":"","profession":{"id":"1"}}
        corediscipline = res_data['corediscipline']
        tsjyCredit = res_data['tsjyCredit']
        tsjyPeriod = res_data['tsjyPeriod']
        tsjyCompulsoryratio = res_data['tsjyCompulsoryratio']
        tsjyElectiveratio = res_data['tsjyElectiveratio']
        zyjcCredit = res_data['zyjcCredit']
        zyjcPeriod = res_data['zyjcPeriod']
        zyjcCompulsoryratio = res_data['zyjcCompulsoryratio']
        zyjcElectiveratio = res_data['zyjcElectiveratio']
        zykCredit = res_data['zykCredit']
        zykPeriod = res_data['zykPeriod']
        zykCompulsoryratio = res_data['zykCompulsoryratio']
        zykElectiveratio = res_data['zykElectiveratio']
        dlsjCredit = res_data['dlsjCredit']
        dlsjPeriod = res_data['dlsjPeriod']
        dlsjCompulsoryratio = res_data['dlsjCompulsoryratio']
        dlsjElectiveratio = res_data['dlsjElectiveratio']
        professionId = res_data['profession']['id']
        profession = Profession.objects.get(id=professionId)
        if dlsjElectiveratio == "":
            result['code'] = 'fail'
        else:
            ProfessionCultivationPlan.objects.create(
                corediscipline=corediscipline,
                tsjy_credit=tsjyCredit,
                tsjy_peroid=tsjyPeriod,
                tsjy_compulsoryratio=tsjyCompulsoryratio,
                tsjy_electiveratio=tsjyElectiveratio,
                zyjc_credit=zyjcCredit,
                zyjc_peroid=zyjcPeriod,
                zyjc_compulsoryratio=zyjcCompulsoryratio,
                zyjc_electiveratio=zyjcElectiveratio,
                zyk_credit=zykCredit,
                zyk_peroid=zykPeriod,
                zyk_compulsoryratio=zykCompulsoryratio,
                zyk_electiveratio=zykElectiveratio,
                dlsj_credit=dlsjCredit,
                dlsj_peroid=dlsjPeriod,
                dlsj_compulsoryratio=dlsjCompulsoryratio,
                dlsj_electiveratio=dlsjElectiveratio,
                profession_id=profession
            )
            result['code'] = 'success'
    return JsonResponse(result)


# 修改专业培养计划 数据
@csrf_exempt
def updateProfessionCultivationPlan(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        # {"corediscipline":"","tsjyCredit":"","tsjyPeriod":"","tsjyCompulsoryratio":"","tsjyElectiveratio":"","zyjcCredit":"",
        # "zyjcPeriod":"","zyjcCompulsoryratio":"","zyjcElectiveratio":"","zykCredit":"","zykPeriod":"","zykCompulsoryratio":"",
        # "zykElectiveratio":"","dlsjCredit":"","dlsjPeriod":"","dlsjCompulsoryratio":"","dlsjElectiveratio":"","profession":{"id":"1"}}
        corediscipline = res_data['corediscipline']
        tsjyCredit = res_data['tsjyCredit']
        tsjyPeriod = res_data['tsjyPeriod']
        tsjyCompulsoryratio = res_data['tsjyCompulsoryratio']
        tsjyElectiveratio = res_data['tsjyElectiveratio']
        zyjcCredit = res_data['zyjcCredit']
        zyjcPeriod = res_data['zyjcPeriod']
        zyjcCompulsoryratio = res_data['zyjcCompulsoryratio']
        zyjcElectiveratio = res_data['zyjcElectiveratio']
        zykCredit = res_data['zykCredit']
        zykPeriod = res_data['zykPeriod']
        zykCompulsoryratio = res_data['zykCompulsoryratio']
        zykElectiveratio = res_data['zykElectiveratio']
        dlsjCredit = res_data['dlsjCredit']
        dlsjPeriod = res_data['dlsjPeriod']
        dlsjCompulsoryratio = res_data['dlsjCompulsoryratio']
        dlsjElectiveratio = res_data['dlsjElectiveratio']
        data_id = res_data['id']
        if dlsjElectiveratio == "":
            result['code'] = 'fail'
        else:
            p = ProfessionCultivationPlan.objects.filter(id=data_id)
            p.update(
                corediscipline=corediscipline,
                tsjy_credit=tsjyCredit,
                tsjy_peroid=tsjyPeriod,
                tsjy_compulsoryratio=tsjyCompulsoryratio,
                tsjy_electiveratio=tsjyElectiveratio,
                zyjc_credit=zyjcCredit,
                zyjc_peroid=zyjcPeriod,
                zyjc_compulsoryratio=zyjcCompulsoryratio,
                zyjc_electiveratio=zyjcElectiveratio,
                zyk_credit=zykCredit,
                zyk_peroid=zykPeriod,
                zyk_compulsoryratio=zykCompulsoryratio,
                zyk_electiveratio=zykElectiveratio,
                dlsj_credit=dlsjCredit,
                dlsj_peroid=dlsjPeriod,
                dlsj_compulsoryratio=dlsjCompulsoryratio,
                dlsj_electiveratio=dlsjElectiveratio,
            )
        result['code'] = 'success'
    return JsonResponse(result)


# 删除专业计划 数据
@csrf_exempt
def deleteProfessionCultivationPlan(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('id')
        p = ProfessionCultivationPlan.objects.filter(id=int(res))
        p.delete()
        result['code'] = 'success'
    return JsonResponse(result)


# 获取毕业学分要求 数据
@csrf_exempt
def getGraduationCreditRequiredQuery(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr') # {"profession":{"id":1}}
        a = json.loads(res)['profession']['id']
        required_data = serializers.serialize("json", GraduationCreditRequired.objects.filter(profession_id=a))
        required_str = json.loads(required_data)
        response_data = {'requiredlist': required_str}
        return HttpResponse(json.dumps(response_data))
    return HttpResponse('success')


# 增加毕业学分要求 数据
@csrf_exempt
def saveGraduationCreditRequired(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        # {"compulsory":"","limitedelective":"","elective":"","shcoolelective":"","profession":{"id":"1"}}
        res_data = json.loads(res)
        compulsory = res_data['compulsory']
        limitedelective = res_data['limitedelective']
        elective = res_data['elective']
        shcoolelective = res_data['shcoolelective']
        professionId = res_data['profession']['id']
        profession = Profession.objects.get(id=professionId)
        if shcoolelective == "":
            result['code'] = 'fail'
        else:
            GraduationCreditRequired.objects.create(
                compulsory=compulsory,
                limitedElective=limitedelective,
                elective=elective,
                schoolElective=shcoolelective,
                profession_id=profession
            )
            result['code'] = 'success'
    return JsonResponse(result)


# 更新毕业学分要求 数据
@csrf_exempt
def updateGraduationcreditrequired(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        compulsory = res_data['compulsory']
        limitedelective = res_data['limitedelective']
        elective = res_data['elective']
        shcoolelective = res_data['shcoolelective']
        data_id = res_data['id']
        if shcoolelective == "":
            result['code'] = 'fail'
        else:
            p = GraduationCreditRequired.objects.filter(id=data_id)
            p.update(
                compulsory=compulsory,
                limitedElective=limitedelective,
                elective=elective,
                schoolElective=shcoolelective,
            )
        result['code'] = 'success'
    return JsonResponse(result)


# 删除毕业学分 要求
@csrf_exempt
def deleteGraduationcreditrequired(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('id')
        p = GraduationCreditRequired.objects.filter(id=int(res))
        p.delete()
        result['code'] = 'success'
    return JsonResponse(result)


# 获取课程类别分组学分要求 数据
@csrf_exempt
def getGroupCourseQuery(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')# {"profession":{"id":1}}
        a = json.loads(res)['profession']['id']
        groupCourse_data = serializers.serialize("json", GroupCourse.objects.filter(profession_id=a))
        groupCourse_str = json.loads(groupCourse_data)
        response_data = {'groupcourselist': groupCourse_str}
        return HttpResponse(json.dumps(response_data))
    return HttpResponse('success')


# 增加课程类别分组学分要求 数据
@csrf_exempt
def saveGroupcourse(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        #{"groupcourseCode": "", "groupcourseCategory": "", "credit": "", "profession": {"id": "1"}}
        res_data = json.loads(res)
        groupcourseCode = res_data['groupcourseCode']
        groupcourseCategory = res_data['groupcourseCategory']
        credit = res_data['credit']
        professionId = res_data['profession']['id']
        profession = Profession.objects.get(id=professionId)
        if groupcourseCategory == "":
            result['code'] = 'fail'
        else:
            GroupCourse.objects.create(
                groupcourse_code=groupcourseCode,
                groupcourse_category=groupcourseCategory,
                credit=credit,
                profession_id=profession
            )
            result['code'] = 'success'
    return JsonResponse(result)


# 修改课程类别分组学分要求 数据
@csrf_exempt
def updateGroupcourse(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        groupcourseCode = res_data['groupcourseCode']
        groupcourseCategory = res_data['groupcourseCategory']
        credit = res_data['credit']
        data_id = res_data['id']
        if groupcourseCategory == "":
            result['code'] = 'fail'
        else:
            p = GroupCourse.objects.filter(id=data_id)
            p.update(
                groupcourse_code=groupcourseCode,
                groupcourse_category=groupcourseCategory,
                credit=credit,
            )
        result['code'] = 'success'
    return JsonResponse(result)


# 删除课程类别分组学分要求 数据
@csrf_exempt
def deleteGroupcourse(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('id')
        p = GroupCourse.objects.filter(id=int(res))
        p.delete()
        result['code'] = 'success'
    return JsonResponse(result)


# 获取公选课学分要求 数据
@csrf_exempt
def getPublicElectiveRequiredQuery(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')# {"profession":{"id":1}}
        a = json.loads(res)['profession']['id']
        required_data = serializers.serialize("json", PublicElectiveRequired.objects.filter(profession_id=a))
        required_str = json.loads(required_data)
        response_data = {'requiredlist': required_str}
        return HttpResponse(json.dumps(response_data))
    return HttpResponse('success')


# 增加公选课学分要求 数据
@csrf_exempt
def savePublicelectiverequired(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        # {"economicManagement": "", "artAppreciation": "", "humanitiesScience": "", "naturalScience": "",
        # "comprehensiveeducation": "", "generalPlatform": "", "engineeringTechnology": "", "profession": {"id": "1"}}
        res_data = json.loads(res)
        economicManagement = res_data['economicManagement']
        artAppreciation = res_data['artAppreciation']
        humanitiesScience = res_data['humanitiesScience']
        naturalScience = res_data['naturalScience']
        comprehensiveeducation = res_data['comprehensiveeducation']
        generalPlatform = res_data['generalPlatform']
        engineeringTechnology = res_data['engineeringTechnology']
        professionId = res_data['profession']['id']
        profession = Profession.objects.get(id=professionId)
        if engineeringTechnology == "":
            result['code'] = 'fail'
        else:
            PublicElectiveRequired.objects.create(
                economic_management=economicManagement,
                art_appreciation=artAppreciation,
                humanities_science=humanitiesScience,
                natural_science=naturalScience,
                comprehensive_education=comprehensiveeducation,
                general_platform=generalPlatform,
                engineering_technology=engineeringTechnology,
                profession_id=profession
            )
            result['code'] = 'success'
    return JsonResponse(result)


# 更新公选课学分要求 数据
@csrf_exempt
def updatePublicelectiverequired(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        economicManagement = res_data['economicManagement']
        artAppreciation = res_data['artAppreciation']
        humanitiesScience = res_data['humanitiesScience']
        naturalScience = res_data['naturalScience']
        comprehensiveeducation = res_data['comprehensiveeducation']
        generalPlatform = res_data['generalPlatform']
        engineeringTechnology = res_data['engineeringTechnology']
        data_id = res_data['id']
        if engineeringTechnology == "":
            result['code'] = 'fail'
        else:
            p = PublicElectiveRequired.objects.filter(id=data_id)
            p.update(
                economic_management=economicManagement,
                art_appreciation=artAppreciation,
                humanities_science=humanitiesScience,
                natural_science=naturalScience,
                comprehensive_education=comprehensiveeducation,
                general_platform=generalPlatform,
                engineering_technology=engineeringTechnology,
            )
        result['code'] = 'success'
    return JsonResponse(result)


# 删除公选课学分要求 数据
@csrf_exempt
def deletePublicelectiverequired(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('id')
        p = PublicElectiveRequired.objects.filter(id=int(res))
        p.delete()
        result['code'] = 'success'
    return JsonResponse(result)


# 获取课程计划 数据
@csrf_exempt
def getCourseCultivationPlanQueryView(request):

    if request.method == 'POST':
        res = request.POST.get('jsonstr')# {"professionId":1}
        count = len(json.loads(res))
        if count == 1:
            # plan_str[1]['fields']['course'] = {'1':'1'}
            # print(plan_str[1]['fields']['course'])
            # print(plan_str)
            res_id = json.loads(res)['professionId']
            plan_data = CourseCultivationPlan.objects.filter(profession_id=res_id)
            a = serializers.serialize("json", CourseCultivationPlan.objects.filter(profession_id=res_id))
            plan_str = json.loads(a)
            i = 0
            for plan in plan_data:
                course_data = serializers.serialize("json", Course.objects.filter(id=plan.course_id.id))
                course_str = json.loads(course_data)
                plan_str[i]['fields']['course'] = course_str[0]['fields']
                groupCourse_data = serializers.serialize("json", GroupCourse.objects.filter(id=plan.groupcourse_id.id))
                groupCourse_str = json.loads(groupCourse_data)
                plan_str[i]['fields']['groupCourse'] = groupCourse_str[0]['fields']
                i = i + 1

            # print(plan_str)
            response_data = {'planlist': plan_str}
            return HttpResponse(json.dumps(response_data))
        # 条件查询
        if count == 5:
            res_dic = json.loads(res)
            # {'coursename': '', 'groupcourseCategory': '', 'coursetype': '', 'adviceterm': '', 'professionId': '1'}
            temp = ''
            for key, value in res_dic.items():
                if value != '' and key != 'professionId':
                    temp = key
            if temp == '':
                pass
            else:
                res_id = json.loads(res)['professionId']
                data = ''
                # 只实现了 课程名称查询
                if temp == 'coursename':
                    data = json.loads(res)[temp]
                    course = Course.objects.get(courseName=data)
                    if course:
                        plan_data = CourseCultivationPlan.objects.filter(profession_id=res_id, course_id=course)
                        a = serializers.serialize("json", CourseCultivationPlan.objects.filter(profession_id=res_id, course_id=course))
                        plan_str = json.loads(a)
                        i = 0
                        for plan in plan_data:
                            course_data = serializers.serialize("json", Course.objects.filter(id=plan.course_id.id))
                            course_str = json.loads(course_data)
                            plan_str[i]['fields']['course'] = course_str[0]['fields']
                            groupCourse_data = serializers.serialize("json",GroupCourse.objects.filter(id=plan.groupcourse_id.id))
                            groupCourse_str = json.loads(groupCourse_data)
                            plan_str[i]['fields']['groupCourse'] = groupCourse_str[0]['fields']
                            i = i + 1
                        response_data = {'planlist': plan_str}
                        return HttpResponse(json.dumps(response_data))
    return HttpResponse('success')


# 增加课程计划 数据
@csrf_exempt
def saveCoursecultivationplan(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        # {"adviceterm":"","weekperiod":"","profession":{"id":"1"},"course":{"id":"1"},"groupcourse":{"id":"1"}}
        res_data = json.loads(res)
        adviceterm = res_data['adviceterm']
        weekperiod = res_data['weekperiod']
        courseId = res_data['course']['id']
        groupcourseId = res_data['groupcourse']['id']
        professionId = res_data['profession']['id']
        profession = Profession.objects.get(id=professionId)
        course = Course.objects.get(id=courseId)
        groupcourse = GroupCourse.objects.get(id=groupcourseId)
        if weekperiod == "":
            result['code'] = 'fail'
        else:
            CourseCultivationPlan.objects.create(
                adviceTerm=adviceterm,
                weekPeriod=weekperiod,
                course_id=course,
                groupcourse_id=groupcourse,
                profession_id=profession
            )
            result['code'] = 'success'
    return JsonResponse(result)

# 修改课程计划 数据
@csrf_exempt
def updateCoursecultivationplan(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        adviceterm = res_data['adviceterm']
        weekperiod = res_data['weekperiod']
        courseId = res_data['course']['id']
        groupcourseId = res_data['groupcourse']['id']
        professionId = res_data['profession']['id']
        course = Course.objects.get(id=courseId)
        groupcourse = GroupCourse.objects.get(id=groupcourseId)
        data_id = res_data['id']
        if weekperiod == "":
            result['code'] = 'fail'
        else:
            p = CourseCultivationPlan.objects.filter(id=data_id)
            p.update(
                adviceTerm=adviceterm,
                weekPeriod=weekperiod,
                course_id=course,
                groupcourse_id=groupcourse,
            )
        result['code'] = 'success'
    return JsonResponse(result)


# 删除课程计划 数据
@csrf_exempt
def deleteCoursecultivationplan(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('id')
        p = CourseCultivationPlan.objects.filter(id=int(res))
        p.delete()
        result['code'] = 'success'
    return JsonResponse(result)


# 获取实践计划 数据
@csrf_exempt
def getPracticeCultivationPlanQueryView(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')# {"professionId":1}
        count = len(json.loads(res))
        if count == 1:
            res_id = json.loads(res)['professionId']
            plan_data = PraticeCultivationPlan.objects.filter(profession_id=res_id)
            a = serializers.serialize("json", PraticeCultivationPlan.objects.filter(profession_id=res_id))
            plan_str = json.loads(a)
            i = 0
            for plan in plan_data:
                course_data = serializers.serialize("json", Course.objects.filter(id=plan.course_id.id))
                course_str = json.loads(course_data)
                plan_str[i]['fields']['course'] = course_str[0]['fields']
                i = i + 1

            # print(plan_str)
            response_data = {'planlist': plan_str}
            return HttpResponse(json.dumps(response_data))
        if count == 3:
            res_dic = json.loads(res)
            # {"coursename":"高等数学","adviceterm":"","professionId":"1"}
            temp = ''
            for key, value in res_dic.items():
                if value != '' and key != 'professionId':
                    temp = key
            if temp == '':
                pass
            else:
                res_id = json.loads(res)['professionId']
                data = ''
                # 只实现了 课程名称查询
                if temp == 'coursename':
                    data = json.loads(res)[temp]
                    course = Course.objects.get(courseName=data)
                    if course:
                        res_id = json.loads(res)['professionId']
                        plan_data = PraticeCultivationPlan.objects.filter(profession_id=res_id, course_id=course)
                        a = serializers.serialize("json", PraticeCultivationPlan.objects.filter(profession_id=res_id, course_id=course))
                        plan_str = json.loads(a)
                        i = 0
                        for plan in plan_data:
                            course_data = serializers.serialize("json", Course.objects.filter(id=plan.course_id.id))
                            course_str = json.loads(course_data)
                            plan_str[i]['fields']['course'] = course_str[0]['fields']
                            i = i + 1
                        response_data = {'planlist': plan_str}
                        return HttpResponse(json.dumps(response_data))
    return HttpResponse('success')


# 增加实践计划数据
@csrf_exempt
def savePracticecultivationplan(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        # {"type":"","pattern":"","weeks":"","adviceterm":"","profession":{"id":"1"},"course":{"id":"1"}}
        res_data = json.loads(res)
        type = res_data['type']
        pattern = res_data['pattern']
        weeks = res_data['weeks']
        adviceterm = res_data['adviceterm']
        courseId = res_data['course']['id']
        professionId = res_data['profession']['id']
        profession = Profession.objects.get(id=professionId)
        course = Course.objects.get(id=courseId)
        if adviceterm == "":
            result['code'] = 'fail'
        else:
            PraticeCultivationPlan.objects.create(
                type=type,
                pattern=pattern,
                week=weeks,
                adviceTerm=adviceterm,
                course_id=course,
                profession_id=profession
            )
            result['code'] = 'success'
    return JsonResponse(result)


# 修改实践计划 数据
@csrf_exempt
def updatePracticecultivationplan(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        type = res_data['type']
        pattern = res_data['pattern']
        weeks = res_data['weeks']
        adviceterm = res_data['adviceterm']
        courseId = res_data['course']['id']
        professionId = res_data['profession']['id']
        profession = Profession.objects.get(id=professionId)
        course = Course.objects.get(id=courseId)
        data_id = res_data['id']
        if adviceterm == "":
            result['code'] = 'fail'
        else:
            p = PraticeCultivationPlan.objects.filter(id=data_id)
            p.update(
                type=type,
                pattern=pattern,
                week=weeks,
                adviceTerm=adviceterm,
                course_id=course,
            )
        result['code'] = 'success'
    return JsonResponse(result)


# 删除实践计划 数据
@csrf_exempt
def deletePracticecultivationplan(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('id')
        p = PraticeCultivationPlan.objects.filter(id=int(res))
        p.delete()
        result['code'] = 'success'
    return JsonResponse(result)

# 获取课程数据
@csrf_exempt
def getCourseQuery(request):
    if request.method == 'POST':
        res = request.POST.get('jsonstr')
        count0 = len(json.loads(res))
        # 访问页面时 获取数据
        if count0 == 0:
            course_data = serializers.serialize("json", Course.objects.all())
            course_str = json.loads(course_data)
            count = len(course_str)
            response_data = {'courselist': course_str,'total': count }
            return HttpResponse(json.dumps(response_data))
        if count0 == 2:
            res_dic = json.loads(res)
            temp = ''
            for key, value in res_dic.items():
                if value != '':
                    temp = key
            if temp == '':
                pass
            elif temp =='coursename':
                coursename = json.loads(res)[temp]
                courese = Course.objects.filter(courseName=coursename)
                if courese:
                    course_data = serializers.serialize("json", Course.objects.filter(courseName=coursename))
                    course_str = json.loads(course_data)
                    count = len(course_str)
                    response_data = {'courselist': course_str, 'total': count}
                    return HttpResponse(json.dumps(response_data))
            elif temp =='coursetype':
                coursetype = json.loads(res)[temp]
                courese = Course.objects.filter(courseType=coursetype)
                if courese:
                    course_data = serializers.serialize("json", Course.objects.filter(courseType=coursetype))
                    course_str = json.loads(course_data)
                    count = len(course_str)
                    response_data = {'courselist': course_str, 'total': count}
                    return HttpResponse(json.dumps(response_data))
            else:
                pass
    return HttpResponse('success')

# 增加课程数据
@csrf_exempt
def saveCourse(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        # {"coursename":"","totalcredit":"","totalperiod":"","lecture":"","experiment":"","oncomputer":"",
        # "extracurricular":"","evaluationmethod":"","coursetype":""}
        res_data = json.loads(res)
        coursename = res_data['coursename']
        totalcredit = res_data['totalcredit']
        totalperiod = res_data['totalperiod']
        lecture = res_data['lecture']
        experiment = res_data['experiment']
        oncomputer = res_data['oncomputer']
        extracurricular = res_data['extracurricular']
        evaluationmethod = res_data['evaluationmethod']
        coursetype = res_data['coursetype']
        if coursetype == "":
            result['code'] = 'fail'
        else:
            Course.objects.create(
                courseName=coursename,
                totalCredit=totalcredit,
                totalPeriod=totalperiod,
                lecture=lecture,
                experiment=experiment,
                onComputer=oncomputer,
                extracurricular=extracurricular,
                evaluationMethod=evaluationmethod,
                courseType=coursetype
            )
            result['code'] = 'success'
    return JsonResponse(result)


# 修改课程数据
@csrf_exempt
def updateCourse(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        coursename = res_data['coursename']
        totalcredit = res_data['totalcredit']
        totalperiod = res_data['totalperiod']
        lecture = res_data['lecture']
        experiment = res_data['experiment']
        oncomputer = res_data['oncomputer']
        extracurricular = res_data['extracurricular']
        evaluationmethod = res_data['evaluationmethod']
        coursetype = res_data['coursetype']
        data_id = res_data['id']
        if coursetype == "":
            result['code'] = 'fail'
        else:
            p = Course.objects.filter(id=data_id)
            p.update(
                courseName=coursename,
                totalCredit=totalcredit,
                totalPeriod=totalperiod,
                lecture=lecture,
                experiment=experiment,
                onComputer=oncomputer,
                extracurricular=extracurricular,
                evaluationMethod=evaluationmethod,
                courseType=coursetype
            )
        result['code'] = 'success'
    return JsonResponse(result)


# 删除课程数据
@csrf_exempt
def deleteCourse(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('id')
        p = Course.objects.filter(id=int(res))
        p.delete()
        result['code'] = 'success'
    return JsonResponse(result)


# 获取毕业要求数据
@csrf_exempt
def getGraduationRequirementQuery(request):
    if request.method == 'POST':
        res =request.POST.get('jsonstr') # {"profession":{"id":1}}
        res_id = json.loads(res)['professionId']
        required_data = serializers.serialize("json", GraduationRequirement.objects.filter(profession_id=res_id))
        required_str = json.loads(required_data)
        response_data = {'requiredlist': required_str}
        return HttpResponse(json.dumps(response_data))
    return HttpResponse('success')


# 增加毕业要求数据
@csrf_exempt
def saveGraduationrequirement(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        grCode = res_data['grCode']
        grContent = res_data['grContent']
        professionId = res_data['professionId']
        profession = Profession.objects.get(id=professionId)
        if grContent == "":
            result['code'] = 'fail'
        else:
            GraduationRequirement.objects.create(
                gr_code=grCode,
                gr_content=grContent,
                profession_id=profession
            )
            result['code'] = 'success'
    return JsonResponse(result)

# 修改毕业要求数据
@csrf_exempt
def updateGraduationrequirement(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        grCode = res_data['grCode']
        grContent = res_data['grContent']
        data_id = res_data['id']
        if grContent == "":
            result['code'] = 'fail'
        else:
            p = GraduationRequirement.objects.filter(id=data_id)
            p.update(
                gr_code=grCode,
                gr_content=grContent,
            )
        result['code'] = 'success'
    return JsonResponse(result)


# 删除毕业要求数据
@csrf_exempt
def deleteGraduationrequirement(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('id')
        p = GraduationRequirement.objects.filter(id=int(res))
        p.delete()
        result['code'] = 'success'
    return JsonResponse(result)


# 获取毕业要求子项指标点 数据
@csrf_exempt
def getSubgraduationRequirementQuery(request):
    if request.method == 'POST':
        a = serializers.serialize("json", SubGraduationRequirement.objects.all())
        require_str = json.loads(a)
        response_data = {'requirelist': require_str}
        return HttpResponse(json.dumps(response_data))
    return HttpResponse('success')

# 增加毕业要求子项指标点 数据
@csrf_exempt
def saveSubgraduationrequirement(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        #{"sgrCode":"","sgrContent":"","sgrWeight":"","graduationrequirement":{"id":"1"}}
        res_data = json.loads(res)
        sgrCode = res_data['sgrCode']
        sgrContent = res_data['sgrContent']
        sgrWeight = res_data['sgrWeight']
        graduationrequirementId = res_data['graduationrequirement']['id']
        graduationRequirement = GraduationRequirement.objects.get(id=graduationrequirementId)
        if graduationRequirement:
            if sgrWeight == "":
                result['code'] = 'fail'
            else:
                SubGraduationRequirement.objects.create(
                    sgr_code=sgrCode,
                    sgr_content=sgrContent,
                    sgr_weight=sgrWeight,
                    graduationRequirement_id=graduationRequirement
                )
                result['code'] = 'success'
    return JsonResponse(result)

# 修改毕业要求子项指标点 数据
@csrf_exempt
def updateSubgraduationrequirement(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        sgrCode = res_data['sgrCode']
        sgrContent = res_data['sgrContent']
        sgrWeight = res_data['sgrWeight']
        graduationrequirementId = res_data['graduationrequirement']['id']
        graduationRequirement = GraduationRequirement.objects.get(id=graduationrequirementId)
        data_id = res_data['id']
        if sgrContent == "":
            result['code'] = 'fail'
        else:
            p = SubGraduationRequirement.objects.filter(id=data_id)
            p.update(
                sgr_code=sgrCode,
                sgr_content=sgrContent,
                sgr_weight=sgrWeight,
                graduationRequirement_id=graduationRequirement
            )
        result['code'] = 'success'
    return JsonResponse(result)


# 删除毕业要求子项指标点 数据
@csrf_exempt
def deleteSubgraduationrequirement(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('id')
        p = SubGraduationRequirement.objects.filter(id=int(res))
        p.delete()
        result['code'] = 'success'
    return JsonResponse(result)


# 获取毕业要求指标点与课程关联 数据
@csrf_exempt
def viewSubgradCourseRelationQuery(request):
    if request.method == 'POST':
        res =request.POST.get('jsonstr') # {"professionId":1}
        count = len(json.loads(res))
        if count == 1:
            query_data = SubgradCouseRelation.objects.all()
            a = serializers.serialize("json", SubgradCouseRelation.objects.all())
            query_str = json.loads(a)
            i = 0
            for query in query_data:
                sgr_obj = SubGraduationRequirement.objects.get(id=query.subGraduationRequirement_id.id)
                sgr_data = serializers.serialize("json", SubGraduationRequirement.objects.filter(id=query.subGraduationRequirement_id.id))
                sgr_str = json.loads(sgr_data)
                gr_data = serializers.serialize("json", GraduationRequirement.objects.filter(id=sgr_obj.graduationRequirement_id.id))
                gr_str = json.loads(gr_data)
                course_data = serializers.serialize("json", Course.objects.filter(id=query.course_id.id))
                course_str = json.loads(course_data)
                query_str[i]['fields']['gr'] = gr_str[0]['fields']
                query_str[i]['fields']['sgr'] = sgr_str[0]['fields']
                query_str[i]['fields']['course'] = course_str[0]['fields']
                i = i + 1
            response_data = {'querylist': query_str}
            return HttpResponse(json.dumps(response_data))
        if count == 4:
            res_dic = json.loads(res)
            temp = ''
            for key, value in res_dic.items():
                if value != '' and key != 'professionId':
                    temp = key
            if temp == '':
                pass
            elif temp =='sgrCode':
                sgrCode = res_dic[temp]
                sgr = SubGraduationRequirement.objects.get(sgr_code=sgrCode)
                if sgr:
                    query_data = SubgradCouseRelation.objects.filter(subGraduationRequirement_id=sgr)
                    a = serializers.serialize("json", SubgradCouseRelation.objects.filter(subGraduationRequirement_id=sgr))
                    query_str = json.loads(a)
                    i = 0
                    for query in query_data:
                        sgr_obj = SubGraduationRequirement.objects.get(id=query.subGraduationRequirement_id.id)
                        sgr_data = serializers.serialize("json", SubGraduationRequirement.objects.filter(
                            id=query.subGraduationRequirement_id.id))
                        sgr_str = json.loads(sgr_data)
                        gr_data = serializers.serialize("json",
                                                        GraduationRequirement.objects.filter(id=sgr_obj.graduationRequirement_id.id))
                        gr_str = json.loads(gr_data)
                        course_data = serializers.serialize("json", Course.objects.filter(id=query.course_id.id))
                        course_str = json.loads(course_data)
                        query_str[i]['fields']['gr'] = gr_str[0]['fields']
                        query_str[i]['fields']['sgr'] = sgr_str[0]['fields']
                        query_str[i]['fields']['course'] = course_str[0]['fields']
                        i = i + 1
                    response_data = {'querylist': query_str}
                    return HttpResponse(json.dumps(response_data))
    return HttpResponse('success')

# 增加毕业要求指标点与课程关联 数据
@csrf_exempt
def saveSubgradCourseRelation(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        #{"weight":"","subgraduationrequirement":{"id":"1"},"course":{"id":"1"}}
        res_data = json.loads(res)
        weight = res_data['weight']
        sgrId = res_data['subgraduationrequirement']['id']
        couseId = res_data['course']['id']
        sgr = SubGraduationRequirement.objects.get(id=sgrId)
        course = Course.objects.get(id=couseId)
        if sgr and course:
            if weight == "":
                result['code'] = 'fail'
            else:
                SubgradCouseRelation.objects.create(
                    weight=weight,
                    course_id=course,
                    subGraduationRequirement_id=sgr
                )
                result['code'] = 'success'
    return JsonResponse(result)


# 修改毕业要求指标点与课程关联 数据
@csrf_exempt
def updateSubgradCourseRelation(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        weight = res_data['weight']
        sgrId = res_data['subgraduationrequirement']['id']
        couseId = res_data['course']['id']
        sgr = SubGraduationRequirement.objects.get(id=sgrId)
        course = Course.objects.get(id=couseId)
        data_id = res_data['id']
        if weight == "":
            result['code'] = 'fail'
        else:
            p = SubgradCouseRelation.objects.filter(id=data_id)
            p.update(
                weight=weight,
                course_id=course,
                subGraduationRequirement_id=sgr
            )
        result['code'] = 'success'
    return JsonResponse(result)


# 删除毕业要求指标点与课程关联 数据
@csrf_exempt
def deleteSubgradCourseRelation(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('id')
        p = SubgradCouseRelation.objects.filter(id=int(res))
        p.delete()
        result['code'] = 'success'
    return JsonResponse(result)


# 获取指标点与课程关联达成度 数据
@csrf_exempt
def queryViewRelationAchievedegree(request):
    if request.method == 'POST':
        res =request.POST.get('jsonstr') # {"professionId":1}
        count = len(json.loads(res))
        if count == 1:
            res_id = json.loads(res)['professionId']
            query_data = RelationAchieveDegree.objects.all()
            a = serializers.serialize("json", RelationAchieveDegree.objects.all())
            query_str = json.loads(a)
            i = 0
            for query in query_data:
                sfcr_obj = SubgradCouseRelation.objects.get(id=query.relation_id.id)
                # sfcr_data = serializers.serialize("json", SubgradCouseRelation.objects.filter(id=query.relation_id.id))
                # sfcr_str = json.loads(sfcr_data)
                sgr_data = serializers.serialize("json", SubGraduationRequirement.objects.filter(id=sfcr_obj.subGraduationRequirement_id.id))
                sgr_str = json.loads(sgr_data)
                sgr_obj = SubGraduationRequirement.objects.get(id=sfcr_obj.subGraduationRequirement_id.id)
                gr_data = serializers.serialize("json", GraduationRequirement.objects.filter(id=sgr_obj.graduationRequirement_id.id))
                gr_str = json.loads(gr_data)
                course_data = serializers.serialize("json", Course.objects.filter(id=sfcr_obj.course_id.id))
                course_str = json.loads(course_data)
                query_str[i]['fields']['gr'] = gr_str[0]['fields']
                query_str[i]['fields']['sgr'] = sgr_str[0]['fields']
                query_str[i]['fields']['course'] = course_str[0]['fields']
                i = i + 1
            response_data = {'querylist': query_str}
            return HttpResponse(json.dumps(response_data))
        if count == 4:
            pass
    return HttpResponse('success')

# 增加指标点与课程关联达成度 数据
@csrf_exempt
def saveRelationAchievedegree(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        #{"academicYear":"","achievedegree":"","feedback":"","subgradCourseRelation":{"id":"1"}}
        res_data = json.loads(res)
        academicYear = res_data['academicYear']
        achievedegree = res_data['achievedegree']
        feedback = res_data['feedback']
        sgcrId = res_data['subgradCourseRelation']['id']
        sgcr = SubgradCouseRelation.objects.get(id=sgcrId)
        if sgcr:
            if feedback == "":
                result['code'] = 'fail'
            else:
                RelationAchieveDegree.objects.create(
                   academic_year=academicYear,
                    achieveDegree=achievedegree,
                    feedback=feedback,
                    relation_id=sgcr
                )
                result['code'] = 'success'
    return JsonResponse(result)


# 修改指标点与课程关联达成度 数据
@csrf_exempt
def updateRelationAchievedegree(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_data = json.loads(res)
        academicYear = res_data['academicYear']
        achievedegree = res_data['achievedegree']
        feedback = res_data['feedback']
        sgcrId = res_data['subgradCourseRelation']['id']
        sgcr = SubgradCouseRelation.objects.get(id=sgcrId)
        data_id = res_data['id']
        if feedback == "":
            result['code'] = 'fail'
        else:
            p = RelationAchieveDegree.objects.filter(id=data_id)
            p.update(
                academic_year=academicYear,
                achieveDegree=achievedegree,
                feedback=feedback,
                relation_id=sgcr
            )
        result['code'] = 'success'
    return JsonResponse(result)


# 删除指标点与课程关联达成度 数据
@csrf_exempt
def deleteRelationAchievedegree(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('id')
        p = RelationAchieveDegree.objects.filter(id=int(res))
        p.delete()
        result['code'] = 'success'
    return JsonResponse(result)

# 获取指标点达成度统计
@csrf_exempt
def queryViewAchieveStatistics(request):
    if request.method == 'POST':
        result = {}
        sgr_data = SubGraduationRequirement.objects.all()
        sgr_da = serializers.serialize("json", SubGraduationRequirement.objects.all())
        sgr_str = json.loads(sgr_da)
        i = 0
        for d in sgr_data:
            gr = GraduationRequirement.objects.filter(id = d.graduationRequirement_id.id)
            gr_data = serializers.serialize("json", GraduationRequirement.objects.filter(id = d.graduationRequirement_id.id))
            gr_str = json.loads(gr_data)
            sgr_str[i]['fields']['gr'] = gr_str[0]['fields']
            sgcr_data = SubgradCouseRelation.objects.filter(subGraduationRequirement_id=d)
            count = len(sgcr_data)
            w = []
            a = []
            sta = 0.0
            if count == 0:
                sgr_str[i]['fields']['statistics'] = 0
                sgr_str[i]['fields']['academicYear'] = '-'
            else:
                j = 0
                for s in sgcr_data:
                    w.append(s.weight)
                    rad_data = RelationAchieveDegree.objects.filter(relation_id=s)
                    year = rad_data[0].academic_year
                    for r in rad_data:
                        a.append(r.achieveDegree)
                    sta = sta + float(w[j]) * float(a[j])
                    j = j + 1
                sgr_str[i]['fields']['statistics'] = sta/100
                sgr_str[i]['fields']['academicYear'] = year

            i = i + 1
        response_data = {'sgrlist': sgr_str}
        return HttpResponse(json.dumps(response_data))
    return HttpResponse('success')


# 毕业要求达成度统计
@csrf_exempt
def queryviewGraduationStatistics(request):
    if request.method == 'POST':
        result = {}
        res = request.POST.get('jsonstr')
        res_id = json.loads(res)['professionId']
        gr = GraduationRequirement.objects.filter(profession_id=res_id)
        gr_data = serializers.serialize("json", GraduationRequirement.objects.filter(profession_id=res_id))
        gr_str = json.loads(gr_data)
        i = 0
        for g in gr:
            sgr = SubGraduationRequirement.objects.filter(graduationRequirement_id=g)
            count0 = len(sgr)
            s = []
            st = []
            j = 0
            g_sta = 0.0
            if count0 == 0:
                gr_str[i]['fields']['statistics'] = 0
                gr_str[i]['fields']['academicYear'] = '-'
            else:
                for d in sgr:
                    sgcr_data = SubgradCouseRelation.objects.filter(subGraduationRequirement_id=d)
                    count = len(sgcr_data)
                    s.append(d.sgr_weight)
                    w = []
                    a = []
                    sta = 0.0
                    if count == 0:
                        st.append(0.0)
                    else:
                        z = 0
                        for sgcr in sgcr_data:
                            w.append(sgcr.weight)
                            rad_data = RelationAchieveDegree.objects.filter(relation_id=sgcr)
                            year = rad_data[0].academic_year
                            for r in rad_data:
                                a.append(r.achieveDegree)
                            sta = sta + float(w[z]) * float(a[z])
                            z = z + 1
                        st.append(sta)
                        g_sta = g_sta + float(s[j]) * float(st[j])
                        j = j + 1
                gr_str[i]['fields']['statistics'] = g_sta/10000
                gr_str[i]['fields']['academicYear'] = year
            i = i + 1
        # print(gr_str)
        response_data = {'grlist': gr_str}
        return HttpResponse(json.dumps(response_data))
    return HttpResponse('success')



# 选择课程
@csrf_exempt
def selectCourse(request):
    if request.method == 'POST':
        course_data = serializers.serialize("json", Course.objects.all())
        course_str = json.loads(course_data)
        response_data = {'courselist': course_str}
    return HttpResponse(json.dumps(response_data))


# 选择课程分组
@csrf_exempt
def selectGroupcourse(request):
    if request.method == 'POST':
        groupcourse_data = serializers.serialize("json", GroupCourse.objects.all())
        groupcourse_str = json.loads(groupcourse_data)
        response_data = {'groupcourselist': groupcourse_str}
    return HttpResponse(json.dumps(response_data))


# 选择 毕业要求
@csrf_exempt
def selectGraduationrequirement(request):
    if request.method == 'POST':
        gr_data = serializers.serialize("json", GraduationRequirement.objects.all())
        gr_str = json.loads(gr_data)
        response_data = {'grlist': gr_str}
    return HttpResponse(json.dumps(response_data))


# 选择 指标点
@csrf_exempt
def selectSubgraduationrequirement(request):
    if request.method == 'POST':
        sgr = SubGraduationRequirement.objects.all()
        sgr_data = serializers.serialize("json", SubGraduationRequirement.objects.all())
        sgr_str = json.loads(sgr_data)
        i = 0
        for s in sgr:
            gr = s.graduationRequirement_id.gr_code
            sgr_str[i]['fields']['selectsgr'] = gr + '~' + s.sgr_code
            i = i + 1
        response_data = {'sgrlist': sgr_str}
    return HttpResponse(json.dumps(response_data))


# 选择指标点与课程关联
@csrf_exempt
def selectSubgradCourseRelation(request):
    if request.method == 'POST':
        sgcr = SubgradCouseRelation.objects.all()
        sgcr_data = serializers.serialize("json", SubgradCouseRelation.objects.all())
        sgcr_str = json.loads(sgcr_data)
        i = 0
        for s in sgcr:
            coursename = s.course_id.courseName
            sgcr_str[i]['coursename'] = s.subGraduationRequirement_id.graduationRequirement_id.gr_code + '~' + s.subGraduationRequirement_id.sgr_code + '~' + coursename
            i = i + 1
        response_data = {'sgcrlist': sgcr_str}
    return HttpResponse(json.dumps(response_data))