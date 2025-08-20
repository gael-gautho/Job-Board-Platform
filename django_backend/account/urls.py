from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import api

urlpatterns = [
    
    path('get_profile/<str:pk>/', api.get_profile, name='profile'),
    path('signup/', api.signup, name='signup'),
    path('editprofile/', api.editprofile, name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    ]