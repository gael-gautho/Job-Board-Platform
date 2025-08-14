from django.forms import ModelForm
from .models import Job

class jobForm(ModelForm):
    class Meta:
        model= Job
        fields= (
'title', 'company_name', 'salary', 'description', 'employment_type', 'experience_level', 'location','requirements',
        )