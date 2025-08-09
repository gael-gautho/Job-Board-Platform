from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import JobListSerializer
from django.http import JsonResponse
from .models import Job


@api_view(['GET'])
def get_joblist(request):

    jobList = Job.objects.all()

    Serializer = JobListSerializer(jobList, many = True)

    return JsonResponse(
        Serializer.data,
        safe=False
    )