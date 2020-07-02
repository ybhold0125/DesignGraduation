from django.shortcuts import render_to_response, get_object_or_404, render
from .models import User, Role, RolePermission
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
import json
from django.core import serializers


# 登录逻辑
@csrf_exempt
def login(request):
    if request.method == 'POST':
        result = {}
        r = request.POST.get('jsonstr')
        res = json.loads(r)
        account = res['account']
        password = res['password']
        data = User.objects.filter(account=account, password=password)
        # print(type(data[0].role_id.roleName))
        count = data.count()
        if count == 0:
            result['code'] = 'fail'
        else:
            result['code'] = 'success'
            # temp = Role.objects.get(id = data[0].role_id.)
            request.session.set_expiry(0)
            request.session['username'] = data[0].username
            request.session['account'] = data[0].account
            request.session['rolename'] = data[0].role_id.roleName
    return JsonResponse(result)


# 登出逻辑
@csrf_exempt
def logout(request):
    if request.method == 'POST':
        result = {}
        request.session['username'] = '未登录'
        request.session['account'] = '未登录'
        request.session['rolename'] = '未登录'
        result['code'] = 'success'
    return JsonResponse(result)


# 权限验证
@csrf_exempt
def queryRight(request):
    if request.method == 'POST':
        result = {}
        profid = request.session.get('profid')
        rolename = request.session.get('rolename')
        if rolename == '未登录':
            result['code'] = 'fail'
            return JsonResponse(result)
        role = Role.objects.filter(roleName=rolename)
        if role:
            roleid = role[0].id
            permission = RolePermission.objects.filter(profession_id=profid, role_id=roleid)
            if permission:
                result['code'] = 'success'
            else:
                result['code'] = 'fail'
        else:
            result['code'] = 'fail'
    return JsonResponse(result)


# 更新页面用户信息
@csrf_exempt
def updatePageUser(request):
    if request.method == 'POST':
        result = {}
        result['rolename'] = '未登录'
        result['account']  = '未登录'
        result['username']= '未登录'
        if request.session.get('username'):
            result['username'] = request.session.get('username')
            result['account'] = request.session.get('account')
            result['rolename'] = request.session.get('rolename')
    return JsonResponse(result)