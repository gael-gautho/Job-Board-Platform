from django.urls import path

from . import api 

urlpatterns = [
    path('get_joblist/', api.get_joblist, name='joblist'),
    path('get_myjobs/', api.get_myjobs, name='myjobs'),
    path('get_jobdetail/<str:pk>', api.get_jobdetail, name='jobdetail'),
    path('create_job/', api.create_job, name='createjob'),
    path('delete_job/<str:pk>', api.delete_job, name='deletejob'),

]