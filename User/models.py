from django.db import models
from Specialty.models import Profession


# 身份类
class Role(models.Model):
    roleName = models.CharField(
        max_length=10,
        verbose_name='身份名'
    )

    def __str__(self):
        return self.roleName

    class Meta:
        db_table = 'role'
        verbose_name_plural = verbose_name = '身份'


# 用户类
class User(models.Model):
    username = models.CharField(
        max_length=12,
        verbose_name='用户名'
    )

    password = models.CharField(
        max_length=14,
        verbose_name='密码'
    )

    account = models.CharField(
        max_length=14,
        verbose_name='登录账号'
    )

    role_id = models.ForeignKey(
        Role,
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'user'
        verbose_name_plural = verbose_name = '用户'


# 用户权限类
class RolePermission(models.Model):
    role_id = models.ForeignKey(
        Role,
        on_delete=models.DO_NOTHING,
    )

    profession_id = models.ForeignKey(
        Profession,
        on_delete=models.DO_NOTHING,
    )

    def __str__(self):
        return '%d' % self.id

    class Meta:
        db_table = 'rolepermission'
        verbose_name_plural = verbose_name = '用户权限'
