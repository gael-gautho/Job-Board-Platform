from rest_framework import serializers
from .models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['is_recruiter'] = user.is_recruiter
        
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email','is_recruiter')



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','name', 'email','get_resume','desired_position','experience','location','get_photo')
