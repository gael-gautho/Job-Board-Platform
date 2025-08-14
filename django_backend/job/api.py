from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .forms import jobForm
from .serializers import JobDetailSerializer, JobListSerializer
from django.http import JsonResponse
from .models import Job


@authentication_classes([])
@permission_classes([])
@api_view(['GET'])
def get_joblist(request):

    jobList = Job.objects.all()
    serializer = JobListSerializer(jobList, many = True)

    return JsonResponse(
        {"data": serializer.data},
    )


@api_view(['GET'])
def get_jobdetail(request, pk):
    
    job = Job.objects.get(id=pk)
    serializer = JobDetailSerializer(job, many = False)

    return JsonResponse(
        {"data": serializer.data},
        safe=False
    )


@api_view(['POST'])
def create_job(request):

    form = jobForm(request.data)

    if form.is_valid():
        job = form.save(commit=False)
        job.created_by = request.user
        job.save()

        return JsonResponse({'status': 'created'})
    else:
        return JsonResponse({'errors': form.errors})


