from rest_framework import serializers
from .models import Job

class JobListSerializer(serializers.ModelSerializer):

    has_favorited = serializers.BooleanField()    
    
    class Meta:
        model = Job 
        fields = ('id','has_favorited','title', 'company_name', 'employment_type', 'experience_level', 'location','created_at',
        ) 
        
        

class JobDetailSerializer(serializers.ModelSerializer):
    
    has_applied = serializers.BooleanField()

    class Meta:
        model = Job 
        fields = ('id','title', 'company_name', 'employment_type', 'experience_level', 'location','created_at',
       'salary','has_applied', 'deadline', 'description', 'requirements')
        
         
