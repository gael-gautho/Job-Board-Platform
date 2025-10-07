import uuid
from django.utils import timezone
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager


# Create your models here.

class CustomUserManager(UserManager):

    def _create_user(self, name, email, password, **extra_fields):
        if not email:
            raise ValueError("You have not provided a valid e-mail address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    

    def create_user(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(name, email, password, **extra_fields)
    
    def create_superuser(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(name, email, password, **extra_fields)

        
class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, default='')
    is_recruiter = models.BooleanField(default=False)
    desired_position = models.CharField(max_length=255, blank=True, null=True)
    experience = models.PositiveIntegerField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True , null=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_photo(self):
        if self.photo:
            return settings.WEBSITE_URL + self.photo.url
        else:
            return settings.WEBSITE_URL + '/media/photos/blank-profile.png'


    def get_resume(self):
        if self.resume:
            return settings.WEBSITE_URL + self.resume.url
        else:
            return 'no resume'