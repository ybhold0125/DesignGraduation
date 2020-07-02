from django.urls import path
from . import views

urlpatterns = [
    # CultivationPlan.html 所需要的接口
    path('index', views.index, name='index'),

    # 获取专业url
    path('getProfession', views.get_profession, name='get_profession'),
    # 设置专业url
    path('setPageProfession', views.setPageProfession, name='setPageProfession'),
    # 获取学院及对应专业url
    path('getSchoolProfessions', views.getSchoolProfessions, name='getSchoolProfessions'),

    # 专业计划 增删改查url
    path('getProfessionPlanQuery', views.getProfessionPlanQuery, name='getProfessionPlanQuery'),
    path('saveProfessionCultivationPlan', views.saveProfessionCultivationPlan, name='saveProfessionCultivationPlan'),
    path('updateProfessionCultivationPlan', views.updateProfessionCultivationPlan, name='updateProfessionCultivationPlan'),
    path('deleteProfessionCultivationPlan', views.deleteProfessionCultivationPlan, name='deleteProfessionCultivationPlan'),

    # 毕业学分要求 增删改查url
    path('getGraduationCreditRequiredQuery', views.getGraduationCreditRequiredQuery, name='getGraduationCreditRequiredQuery'),
    path('saveGraduationCreditRequired', views.saveGraduationCreditRequired, name='saveGraduationCreditRequired'),
    path('updateGraduationcreditrequired', views.updateGraduationcreditrequired, name='updateGraduationcreditrequired'),
    path('deleteGraduationcreditrequired', views.deleteGraduationcreditrequired, name='deleteGraduationcreditrequired'),

    # 课程类别分组学分要求 增删改查url
    path('getGroupCourseQuery', views.getGroupCourseQuery, name='getGroupCourseQuery'),
    path('saveGroupcourse', views.saveGroupcourse, name='saveGroupcourse'),
    path('updateGroupcourse', views.updateGroupcourse, name='updateGroupcourse'),
    path('deleteGroupcourse', views.deleteGroupcourse, name='deleteGroupcourse'),

    # 公选课学分要求 增删改查url
    path('getPublicElectiveRequiredQuery', views.getPublicElectiveRequiredQuery, name='getPublicElectiveRequiredQuery'),
    path('savePublicelectiverequired', views.savePublicelectiverequired, name='savePublicelectiverequired'),
    path('updatePublicelectiverequired', views.updatePublicelectiverequired, name='updatePublicelectiverequired'),
    path('deletePublicelectiverequired', views.deletePublicelectiverequired, name='deletePublicelectiverequired'),

    #课程计划 增删改查url
    path('getCourseCultivationPlanQueryView', views.getCourseCultivationPlanQueryView, name='getCourseCultivationPlanQueryView'),
    path('saveCoursecultivationplan', views.saveCoursecultivationplan, name='saveCoursecultivationplan'),
    path('updateCoursecultivationplan', views.updateCoursecultivationplan, name='updateCoursecultivationplan'),
    path('deleteCoursecultivationplan', views.deleteCoursecultivationplan, name='deleteCoursecultivationplan'),

    # 实践计划 增删改查url
    path('getPracticeCultivationPlanQueryView', views.getPracticeCultivationPlanQueryView, name='getPracticeCultivationPlanQueryView'),
    path('savePracticecultivationplan', views.savePracticecultivationplan, name='savePracticecultivationplan'),
    path('updatePracticecultivationplan', views.updatePracticecultivationplan, name='updatePracticecultivationplan'),
    path('deletePracticecultivationplan', views.deletePracticecultivationplan, name='deletePracticecultivationplan'),

    # Lec.html 所需要的接口
    path('lec', views.lec, name='lec'),

    # 课程数据 增删改查url
    path('getCourseQuery', views.getCourseQuery, name='getCourseQuery'),
    path('saveCourse', views.saveCourse, name='saveCourse'),
    path('updateCourse', views.updateCourse, name='updateCourse'),
    path('deleteCourse', views.deleteCourse, name='deleteCourse'),

    # 毕业要求 增删改查url
    path('getGraduationRequirementQuery', views.getGraduationRequirementQuery, name='getGraduationRequirementQuery'),
    path('saveGraduationrequirement', views.saveGraduationrequirement, name='saveGraduationrequirement'),
    path('updateGraduationrequirement', views.updateGraduationrequirement, name='updateGraduationrequirement'),
    path('deleteGraduationrequirement', views.deleteGraduationrequirement, name='deleteGraduationrequirement'),

    # 毕业要求子项指标点 增删改查url
    path('getSubgraduationRequirementQuery', views.getSubgraduationRequirementQuery, name='getSubgraduationRequirementQuery'),
    path('saveSubgraduationrequirement', views.saveSubgraduationrequirement, name='saveSubgraduationrequirement'),
    path('updateSubgraduationrequirement', views.updateSubgraduationrequirement, name='updateSubgraduationrequirement'),
    path('deleteSubgraduationrequirement', views.deleteSubgraduationrequirement, name='deleteSubgraduationrequirement'),

    # 毕业要求指标点与课程关联 增删改查url
    path('viewSubgradCourseRelationQuery', views.viewSubgradCourseRelationQuery, name='viewSubgradCourseRelationQuery'),
    path('saveSubgradCourseRelation', views.saveSubgradCourseRelation, name='saveSubgradCourseRelation'),
    path('updateSubgradCourseRelation', views.updateSubgradCourseRelation, name='updateSubgradCourseRelation'),
    path('deleteSubgradCourseRelation', views.deleteSubgradCourseRelation, name='deleteSubgradCourseRelation'),

    # 标点与课程关联达成度 增删改查url
    path('queryViewRelationAchievedegree', views.queryViewRelationAchievedegree, name='queryViewRelationAchievedegree'),
    path('saveRelationAchievedegree', views.saveRelationAchievedegree, name='saveRelationAchievedegree'),
    path('updateRelationAchievedegree', views.updateRelationAchievedegree, name='updateRelationAchievedegree'),
    path('deleteRelationAchievedegree', views.deleteRelationAchievedegree, name='deleteRelationAchievedegree'),

    path('queryViewAchieveStatistics', views.queryViewAchieveStatistics, name='queryViewAchieveStatistics'),

    path('queryviewGraduationStatistics', views.queryviewGraduationStatistics, name='queryviewGraduationStatistics'),




    # selectCouse
    path('selectCourse', views.selectCourse, name='selectCouse'),
    # selectGroupcourse
    path('selectGroupcourse', views.selectGroupcourse, name='selectGroupcourse'),

    path('selectGraduationrequirement', views.selectGraduationrequirement, name='selectGraduationrequirement'),

    path('selectSubgraduationrequirement', views.selectSubgraduationrequirement, name='selectSubgraduationrequirement'),

    path('selectSubgradCourseRelation', views.selectSubgradCourseRelation, name='selectSubgradCourseRelation'),
]