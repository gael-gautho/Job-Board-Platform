from rest_framework import serializers
from .models import Job

class JobListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job 
        fields = ('id','title', 'company_name', 'employment_type', 'experience_level', 'location','created_at',
        ) 
