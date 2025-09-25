from rest_framework import serializers
from .models import Application, Job


class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job 
        fields = ('id','title', 'company_name', 'employment_type', 'experience_level', 'location','created_at',
        ) 


class JobListSerializer(serializers.ModelSerializer):
    has_favorited = serializers.BooleanField()    
    class Meta:
        model = Job 
        fields = ('id','has_favorited','title', 'company_name', 'employment_type', 'experience_level', 'location','created_at',
        'total_applicants',
        ) 
        

class JobDetailSerializer(serializers.ModelSerializer):
    has_applied = serializers.BooleanField()
    class Meta:
        model = Job 
        fields = ('id','title', 'company_name', 'employment_type', 'experience_level', 'location','created_at',
       'salary','has_applied', 'deadline', 'description', 'requirements')
        
         

class ApplicationListSerializer(serializers.ModelSerializer):
    
    job = JobSerializer(read_only=True)

    class Meta:
        model = Application 
        fields = ('id','name','email','message','get_resume','created_at',
                  'job', 'status')
   