from django.db import models
import uuid
from account.models import User
from django.utils import timezone
from datetime import timedelta


# Create your models here.
def default_deadline():
    return timezone.now() + timedelta(days=30)


class Job(models.Model):

    EmploymentType = [
    ("Permanent", "Permanent"),
    ("Temporary", "Temporary"),
    ("Freelance", "Freelance"),
    ("Internship", "Internship")
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
    deadline = models.DateField(default=default_deadline)
    requirements = models.JSONField(default=list)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    favorited_by = models.ManyToManyField(User, related_name='favorites', blank=True)