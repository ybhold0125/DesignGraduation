from django.contrib import admin
from .models import (
    School, Profession, ProfessionCultivationPlan, GraduationCreditRequired, GroupCourse,PublicElectiveRequired,
    Course, CourseCultivationPlan, PraticeCultivationPlan, GraduationRequirement, SubGraduationRequirement,
    SubgradCouseRelation, RelationAchieveDegree
    )

from django.utils.text import capfirst


def find_model_index(name):
    count = 0
    for model, model_admin in admin.site._registry.items():
        if capfirst(model._meta.verbose_name_plural) == name:
            return count
        else:
            count += 1
    return count


def index_decorator(func):
    def inner(*args, **kwargs):
        templateresponse = func(*args, **kwargs)
        for app in templateresponse.context_data['app_list']:
            app['models'].sort(key=lambda x: find_model_index(x['name']))
        return templateresponse

    return inner


admin.site.index = index_decorator(admin.site.index)
admin.site.app_index = index_decorator(admin.site.app_index)


@admin.register(School)
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('id', 'schoolName')


@admin.register(Profession)
class ProfessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'school_id', 'professionName')


@admin.register(ProfessionCultivationPlan)
class ProfessionCultivationPlanAdmin(admin.ModelAdmin):
    list_display = ('id', 'profession_id', 'corediscipline', 'tsjy_credit',
                    'tsjy_peroid', 'tsjy_compulsoryratio',
                    'tsjy_electiveratio', 'zyjc_credit', 'zyjc_peroid',
                    'zyjc_compulsoryratio', 'zyjc_electiveratio', 'zyk_credit',
                    'zyk_peroid', 'zyk_compulsoryratio', 'zyk_electiveratio', 'dlsj_credit',
                    'dlsj_peroid', 'dlsj_compulsoryratio', 'dlsj_electiveratio'
                    )


@admin.register(GraduationCreditRequired)
class GraduationCreditRequiredAdmin(admin.ModelAdmin):
    list_display = ('id', 'compulsory', 'limitedElective', 'elective', 'schoolElective')


@admin.register(GroupCourse)
class GroupCourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'profession_id', 'groupcourse_code', 'groupcourse_category', 'credit')


@admin.register(PublicElectiveRequired)
class PublicElectiveRequiredAdmin(admin.ModelAdmin):
    list_display = ('id', 'profession_id', 'economic_management', 'art_appreciation', 'humanities_science',
                    'natural_science', 'comprehensive_education', 'general_platform', 'engineering_technology')


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'courseName', 'totalCredit', 'totalPeriod', 'lecture','experiment', 'onComputer',
                    'extracurricular', 'evaluationMethod', 'courseType'
                    )


@admin.register(CourseCultivationPlan)
class CourseCultivationPlanAdmin(admin.ModelAdmin):
    list_display = ('id', 'profession_id', 'course_id', 'groupcourse_id', 'adviceTerm','weekPeriod')


@admin.register(PraticeCultivationPlan)
class PraticeCultivationPlanAdmin(admin.ModelAdmin):
    list_display = ('id', 'profession_id', 'course_id', 'type', 'pattern','adviceTerm', 'week')


@admin.register(GraduationRequirement)
class GraduationRequirementAdmin(admin.ModelAdmin):
    list_display = ('id', 'profession_id', 'gr_code', 'gr_content')


@admin.register(SubGraduationRequirement)
class SubGraduationRequirementAdmin(admin.ModelAdmin):
    list_display = ('id', 'graduationRequirement_id', 'sgr_code', 'sgr_content', 'sgr_weight')


@admin.register(SubgradCouseRelation)
class SubgradCouseRelationAdmin(admin.ModelAdmin):
    list_display = ('id', 'subGraduationRequirement_id', 'course_id', 'weight')


@admin.register(RelationAchieveDegree)
class RelationAchieveDegreeAdmin(admin.ModelAdmin):
    list_display = ('id', 'relation_id', 'academic_year', 'achieveDegree', 'feedback')


# @admin.register(AchieveStatistics)
# class AchieveStatisticsAdmin(admin.ModelAdmin):
#     list_display = ('id', 'subGraduationRequirement_id', 'statistics')





