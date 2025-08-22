from django.urls import path

from . import api 

urlpatterns = [
    path('get_joblist/', api.get_joblist, name='joblist'),
    path('get_myjobs/', api.get_myjobs, name='myjobs'),
    path('get_myapplications/', api.get_myapplications, name='myapplications'),
    path('get_jobapplications/<str:pk>/', api.get_jobapplications, name='jobapplications'),
    path('get_myfavorites/', api.get_myfavorites, name='myfavorites'),
    path('search/', api.search, name='search'),
    path('get_jobdetail/<str:pk>', api.get_jobdetail, name='jobdetail'),
    path('create_job/', api.create_job, name='createjob'),
    path('create_application/<str:pk>', api.create_application, name='createapliccation'),
    path('toggle_favorite/<str:pk>', api.toggle_favorite, name='togglefavorite'),
    path('delete_job/<str:pk>', api.delete_job, name='deletejob'),

]