from rest_framework.decorators import api_view, authentication_classes, permission_classes
from datetime import timedelta
from .forms import jobForm
from .serializers import JobDetailSerializer, JobListSerializer
from django.http import JsonResponse
from .models import Job
from django.db.models import Exists, OuterRef
from django.utils import timezone



@authentication_classes([])
@permission_classes([])
@api_view(['GET'])
def get_joblist(request):

    jobList = Job.objects.all().annotate(
        has_favorited=Exists(
            Job.favorited_by.through.objects.filter(
                job_id=OuterRef('pk'),
                user_id=request.user.pk
            )
        )
    )
    serializer = JobListSerializer(jobList, many = True)

    return JsonResponse(
        {"data": serializer.data},
    )


@api_view(['GET'])
def get_myjobs(request):

    jobList = Job.objects.filter(created_by=request.user)
    serializer = JobListSerializer(jobList, many = True)

    return JsonResponse(
        {"data": serializer.data},
    )


@api_view(['GET'])
def get_myfavorites(request):

    favorites = Job.objects.filter(favorited_by__in = [request.user]).annotate(
        has_favorited=Exists(
            Job.favorited_by.through.objects.filter(
                job_id=OuterRef('pk'),
                user_id=request.user.pk
            )
        )
    )
    serializer = JobListSerializer(favorites, many = True)

    return JsonResponse(
        {"data": serializer.data},
    )


@api_view(['GET'])
def get_jobdetail(request, pk):
    
    job = Job.objects.filter(id=pk).annotate(
        has_favorited=Exists(
            Job.favorited_by.through.objects.filter(
                job_id=OuterRef('pk'),
                user_id=request.user.pk
            )
        )
    ).first()
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


@api_view(['DELETE'])
def delete_job(request, pk):
    job = Job.objects.get(pk=pk, created_by=request.user)
    job.delete()

    return JsonResponse({'status': 'deleted'})


@api_view(['POST'])
def toggle_favorite(request, pk):
    job = Job.objects.get(pk=pk)

    print(request.user)
    print(job)

    if request.user in job.favorited_by.all():
        job.favorited_by.remove(request.user)
    else:
        job.favorited_by.add(request.user)

    job.save()
    
    job = Job.objects.filter(pk=pk).annotate(
        has_favorited=Exists(
            Job.favorited_by.through.objects.filter(
                job_id=OuterRef('pk'),
                user_id=request.user.pk
            )
        )
    ).first()

    serializer = JobDetailSerializer(job, many = False)
    
    return JsonResponse({'data': serializer.data})


@authentication_classes([])
@permission_classes([])
@api_view(['GET'])
def search(request):

    title = request.GET.get('title')
    location = request.GET.get('location')
    job_type = request.GET.get('jobType')
    experience = request.GET.get('experience')
    date_posted = request.GET.get('datePosted')

    if title:
        job = Job.objects.filter(title__icontains = title).annotate(
        has_favorited=Exists(
            Job.favorited_by.through.objects.filter(
                job_id=OuterRef('pk'),
                user_id=request.user.pk
            )
        )
    )
    
    if location and location!="all":
        job = job.filter(location__icontains = location)
    
    if job_type and job_type!="all":
        job = job.filter(employment_type = job_type)

    if experience and experience!="all":
        job = job.filter(experience_level = experience)

    if date_posted and date_posted!="all":
        cutoff = timezone.now() - timedelta(days=int(date_posted))
        print(cutoff)
        job = job.filter(created_at__gte = cutoff)

    serializer = JobListSerializer(job, many = True)

    return JsonResponse({'data': serializer.data})

    