from django.urls import path

from . import api 

urlpatterns = [
    path('get_joblist/', api.get_joblist, name='joblist'),

]