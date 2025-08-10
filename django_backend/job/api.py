from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import JobDetailSerializer, JobListSerializer
from django.http import JsonResponse
from .models import Job


@authentication_classes([])
@permission_classes([])
@api_view(['GET'])
def get_joblist(request):

    jobList = Job.objects.all()
    Serializer = JobListSerializer(jobList, many = True)

    return JsonResponse(
        Serializer.data,
        safe=False
    )


@api_view(['GET'])
def get_jobdetail(request, pk):
    
    job = Job.objects.get(id=pk)
    Serializer = JobDetailSerializer(job, many = False)

    return JsonResponse(
        Serializer.data,
        safe=False
    )