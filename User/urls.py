from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('queryRight', views.queryRight, name='queryRight'),
    path('updatePageUser', views.updatePageUser, name='updatePageUser'),
]