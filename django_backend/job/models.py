from django.db import models
import uuid
from account.models import User

# Create your models here.


class Job(models.Model):

    EmploymentType = [
    ("Full Time", "Full Time"),
    ("Part Time", "Part Time"),
    ("Contract", "Contract")
    ]

    ExperienceLevel = [
    ("Entry Level", "Entry Level"),
    ("Mid Level", "Mid Level"),
    ("Senior", "Senior"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=150)
    company_name =  models.CharField(max_length=150)
    employment_type = models.CharField(max_length=50, choices=EmploymentType)
    experience_level = models.CharField(max_length=50, choices=ExperienceLevel)
    description = models.TextField()
    location =  models.CharField(max_length=255, null=True, blank=True)
    salary = models.CharField(max_length=255)    
    deadline = models.DateField()
    requirements = models.JSONField(default=list)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    