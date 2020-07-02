from django.db import models


# 学院类
class School(models.Model):
    schoolName = models.CharField(
        max_length=20,
        verbose_name='学院名'
    )

    def __str__(self):
        return self.schoolName

    class Meta:
        db_table = 'school'
        verbose_name_plural = verbose_name = '学院'


# 专业类
class Profession(models.Model):
    professionName = models.CharField(
        max_length=10,
        verbose_name='专业名'
    )

    school_id = models.ForeignKey(
        School,
        on_delete=models.DO_NOTHING
    )

    grade = models.CharField(
        max_length=10,
        verbose_name='年级'
    )

    def __str__(self):
        return self.professionName

    class Meta:
        db_table = 'profession'
        verbose_name = '专业'
        verbose_name_plural = verbose_name


# 专业计划类
class ProfessionCultivationPlan(models.Model):
    profession_id = models.ForeignKey(
        Profession,
        on_delete=models.DO_NOTHING,
    )

    corediscipline = models.CharField(
        max_length=10,
        verbose_name='主干课程'
    )

    tsjy_credit = models.FloatField(
        verbose_name='通识教育_学分'
    )

    tsjy_peroid = models.IntegerField(
        verbose_name='通识教育_学时'
    )

    tsjy_compulsoryratio = models.FloatField(
        verbose_name='通识教育_必修比例'
    )

    tsjy_electiveratio = models.FloatField(
        verbose_name='通识教育_选修比例'
    )

    zyjc_credit = models.FloatField(
        verbose_name='专业基础_学分'
    )

    zyjc_peroid = models.IntegerField(
        verbose_name='专业基础_学时'
    )

    zyjc_compulsoryratio = models.FloatField(
        verbose_name='专业基础_必修比例'
    )

    zyjc_electiveratio = models.FloatField(
        verbose_name='专业基础_选修比例'
    )

    zyk_credit = models.FloatField(
        verbose_name='专业课_学分'
    )

    zyk_peroid = models.IntegerField(
        verbose_name='专业课_学时'
    )

    zyk_compulsoryratio = models.FloatField(
        verbose_name='专业课_必修比例'
    )

    zyk_electiveratio = models.FloatField(
        verbose_name='专业课_选修比例'
    )

    dlsj_credit = models.FloatField(
        verbose_name='独立实践_学分'
    )

    dlsj_peroid = models.IntegerField(
        verbose_name='独立实践_学时'
    )

    dlsj_compulsoryratio = models.FloatField(
        verbose_name='独立实践_必修比例'
    )

    dlsj_electiveratio = models.FloatField(
        verbose_name='独立实践_选修比例'
    )

    def __str__(self):
        return self.corediscipline

    class Meta:
        db_table = 'professioncultivationplan'
        verbose_name = '专业计划'
        verbose_name_plural = verbose_name


# 毕业学分要求
class GraduationCreditRequired(models.Model):
    profession_id = models.ForeignKey(
        Profession,
        on_delete=models.DO_NOTHING,
    )

    compulsory = models.FloatField(
        verbose_name='必修课'
    )

    limitedElective = models.FloatField(
        verbose_name='限选课'
    )

    elective = models.FloatField(
        verbose_name='选修课'
    )

    schoolElective = models.FloatField(
        verbose_name='校选修课'
    )

    def __str__(self):
        return '%d' % self.id


    class Meta:
        db_table = 'graduationcreditrequired'
        verbose_name = '毕业学分要求'
        verbose_name_plural = verbose_name


# 课程类别分组学分要求类
class GroupCourse(models.Model):
    profession_id = models.ForeignKey(
        Profession,
        on_delete=models.DO_NOTHING,
    )

    groupcourse_code = models.CharField(
        max_length=15,
        verbose_name='组代码'
    )

    groupcourse_category = models.CharField(
        max_length=10,
        verbose_name='组名称'
    )

    credit = models.FloatField(
        verbose_name='学分'
    )

    def __str__(self):
        return self.groupcourse_category

    class Meta:
        db_table = 'groupcourse'
        verbose_name = '课程类别分组学分要求'
        verbose_name_plural = verbose_name


# 公选课学分要求类
class PublicElectiveRequired(models.Model):
    profession_id = models.ForeignKey(
        Profession,
        on_delete=models.DO_NOTHING,
    )

    economic_management = models.FloatField(
        verbose_name='经济管理类'
    )

    art_appreciation = models.FloatField(
        verbose_name='艺术鉴赏类'
    )

    humanities_science = models.FloatField(
        verbose_name='人文科学类'
    )

    natural_science = models.FloatField(
        verbose_name='自然科学类'
    )

    comprehensive_education = models.FloatField(
        verbose_name='综合教育类'
    )

    general_platform = models.FloatField(
        verbose_name='通识平台选修'
    )

    engineering_technology = models.FloatField(
        verbose_name='工程技术类'
    )

    def __str__(self):
        return '%d' % self.id

    class Meta:
        db_table = 'publicelectiverequired'
        verbose_name = '公选课学分要求'
        verbose_name_plural = verbose_name


# 毕业要求类
class GraduationRequirement(models.Model):
    profession_id = models.ForeignKey(
        Profession,
        on_delete=models.DO_NOTHING,
    )

    gr_code = models.CharField(
        max_length=10,
        verbose_name='毕业要求_代码'
    )

    gr_content = models.TextField(
        verbose_name='毕业要求_内容'
    )

    def __str__(self):
        return self.gr_code

    class Meta:
        db_table = 'graduationrequirement'
        verbose_name = '毕业要求'
        verbose_name_plural = verbose_name


# 毕业要求子项指标点类
class SubGraduationRequirement(models.Model):
    graduationRequirement_id = models.ForeignKey(
        GraduationRequirement,
        on_delete=models.DO_NOTHING,
    )

    sgr_code = models.CharField(
        max_length=10,
        verbose_name='学科毕业要求_代码'
    )

    sgr_content = models.TextField(
        verbose_name='学科毕业要求_内容'
    )

    sgr_weight = models.FloatField(
        verbose_name='权重'
    )

    def __str__(self):
        return self.sgr_code

    class Meta:
        db_table = 'subgraduationrequirement'
        verbose_name = '毕业要求子项指标点'
        verbose_name_plural = verbose_name


# 课程类
class Course(models.Model):
    courseName = models.CharField(
        max_length=20,
        verbose_name='课程名'
    )

    totalCredit = models.FloatField(
        verbose_name='总学分'
    )

    totalPeriod = models.IntegerField(
        verbose_name='总学时'
    )

    lecture = models.IntegerField(
        verbose_name='授课'
    )

    experiment = models.IntegerField(
        verbose_name='实验'
    )

    onComputer = models.IntegerField(
        verbose_name='上机'
    )

    extracurricular = models.IntegerField(
        verbose_name='课外'
    )

    evaluationMethod = models.CharField(
        max_length=10,
        verbose_name='考核类型'
    )

    courseType = models.CharField(
        max_length=10,
        verbose_name='课程性质'
    )

    def __str__(self):
        return self.courseName

    class Meta:
        db_table = 'course'
        verbose_name = '课程'
        verbose_name_plural = verbose_name


# 毕业要求指标点与课程关联类
class SubgradCouseRelation(models.Model):
    subGraduationRequirement_id = models.ForeignKey(
        SubGraduationRequirement,
        on_delete=models.DO_NOTHING,
        verbose_name='指标点'
    )

    course_id = models.ForeignKey(
        Course,
        on_delete=models.DO_NOTHING,
        verbose_name='课程'
    )

    weight = models.FloatField(
        verbose_name='达成度占比'
    )

    def __str__(self):
        return '%s~%s' % (self.subGraduationRequirement_id.sgr_code,self.course_id.courseName)

    class Meta:
        db_table = 'subgrad_course_relation'
        verbose_name = '毕业要求指标点与课程关联'
        verbose_name_plural = verbose_name

# 指标点与课程关联的达成度类
class RelationAchieveDegree(models.Model):
    relation_id = models.ForeignKey(
        SubgradCouseRelation,
        on_delete=models.DO_NOTHING,
        verbose_name='关联'
    )

    academic_year = models.CharField(
        max_length=10,
        verbose_name='学年'
    )

    achieveDegree = models.IntegerField(
        verbose_name='达成度'
    )

    feedback = models.IntegerField(
        verbose_name='课程反馈'
    )

    def __str__(self):
        return 'id %d' % self.id

    class Meta:
        db_table = 'relation_achievedegree'
        verbose_name = '指标点与课程关联的达成度'
        verbose_name_plural = verbose_name


# 指标点达成度统计类
# class AchieveStatistics(models.Model):
#     subGraduationRequirement_id = models.ForeignKey(
#         SubGraduationRequirement,
#         on_delete=models.DO_NOTHING,
#         verbose_name='关联达成度'
#     )
#
#     statistics = models.FloatField(
#         verbose_name='达成统计'
#     )
#
#     def __str__(self):
#         return '%d' % self.id
#
#     class Meta:
#         db_table = 'achieve_statistics'
#         verbose_name_plural = verbose_name = '指标点达成度统计'


# 课程培养计划类
class CourseCultivationPlan(models.Model):
    profession_id = models.ForeignKey(
        Profession,
        on_delete=models.DO_NOTHING,
        verbose_name='所属专业'
    )

    course_id = models.ForeignKey(
        Course,
        on_delete=models.DO_NOTHING,
        verbose_name='所属课程'
    )

    groupcourse_id = models.ForeignKey(
        GroupCourse,
        on_delete=models.DO_NOTHING,
        verbose_name='所属课程分组'
    )

    adviceTerm = models.CharField(
        max_length=6,
        verbose_name='修读学期'
    )

    weekPeriod = models.FloatField(
        max_length=6,
        verbose_name='周学时'
    )

    def __str__(self):
        return '%d' % self.id

    class Meta:
        db_table = 'coursecultivationplan'
        verbose_name = '课程计划'
        verbose_name_plural = verbose_name


# 实践培养计划类
class PraticeCultivationPlan(models.Model):
    profession_id = models.ForeignKey(
        Profession,
        on_delete=models.DO_NOTHING,
        verbose_name='所属专业'
    )

    course_id = models.ForeignKey(
        Course,
        on_delete=models.DO_NOTHING,
        verbose_name='所属课程'
    )

    type = models.CharField(
        max_length=6,
        verbose_name='实践类别'
    )

    pattern = models.CharField(
        max_length=6,
        verbose_name='形式'
    )

    adviceTerm = models.CharField(
        max_length=6,
        verbose_name='学期'
    )

    week = models.IntegerField(
        verbose_name='周数'
    )

    def __str__(self):
        return '%d' % self.id

    class Meta:
        db_table = 'praticecultivationplan'
        verbose_name = '实践计划'
        verbose_name_plural = verbose_name