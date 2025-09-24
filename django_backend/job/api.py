from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import AccessToken
from datetime import timedelta
from .forms import applicationForm, jobForm
from .serializers import ApplicationListSerializer, JobDetailSerializer, JobListSerializer
from django.http import JsonResponse
from .models import Application, Job, User
from django.db.models import Exists, OuterRef, Value, BooleanField
from django.utils import timezone
from rest_framework import status


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_joblist(request):

    # Auth
    try:
        token = request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
        token = AccessToken(token)
        user_id = token.payload['user_id']
        user = User.objects.get(pk=user_id)
    except Exception as e:
        print("Erreur lors du décodage du token:", e)
        user = None

    if user:
        jobList = Job.objects.all().annotate(
            has_favorited=Exists(
                Job.favorited_by.through.objects.filter(
                    job_id=OuterRef('pk'),
                    user_id=user_id
                )
            )
        )
    else:
        jobList = Job.objects.all().annotate(
            has_favorited=Value(False, output_field=BooleanField())
        )
    serializer = JobListSerializer(jobList, many = True)

    return JsonResponse(
        {"data": serializer.data},
    )


@api_view(['GET'])
def get_myjobs(request):

    jobList = Job.objects.filter(created_by=request.user).annotate(
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
def get_myapplications(request):
    applications = Application.objects.filter(created_by = request.user)

    serializer = ApplicationListSerializer(applications, many = True)

    return JsonResponse(
        {"data": serializer.data},
    )

@api_view(['GET'])
def get_jobapplications(request, pk):

    applications = Application.objects.filter(job__id = pk)

    serializer = ApplicationListSerializer(applications, many = True)

    return JsonResponse(
        {"data": serializer.data},
    )


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_jobdetail(request, pk):
    
    # Auth
    try:
        token = request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
        token = AccessToken(token)
        user_id = token.payload['user_id']
        user = User.objects.get(pk=user_id)
    except Exception as e:
        print("Erreur lors du décodage du token:", e)
        user = None

    job = Job.objects.filter(id=pk)
    
    if user:
        job = job.annotate(
            has_applied=Exists(
                Application.objects.filter(
                    job_id=OuterRef('pk'),
                    created_by=user
                )
            )
        )
    else:
        job = job.annotate(has_applied=Value(False, output_field=BooleanField()))

    job = job.first()
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
        message = form.errors
        return JsonResponse( message,
                            status=status.HTTP_400_BAD_REQUEST, safe=False)


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

    serializer = JobListSerializer(job, many = False)
    
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def search(request):

    # Auth
    try:
        token = request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
        token = AccessToken(token)
        user_id = token.payload['user_id']
        user = User.objects.get(pk=user_id)
    except Exception as e:
        print("Erreur lors du décodage du token:", e)
        user = None

    title = request.GET.get('title')
    location = request.GET.get('location')
    job_type = request.GET.get('jobType')
    experience = request.GET.get('experience')
    date_posted = request.GET.get('datePosted')

    job = Job.objects.all()

    if user:
        job = job.annotate(
            has_favorited=Exists(
                Job.favorited_by.through.objects.filter(
                    job_id=OuterRef('pk'),
                    user_id=user_id
                )
            )
        )
    else:
        job = job.annotate( has_favorited=Value(False, output_field=BooleanField()) )

    if title:
        job = Job.objects.filter(title__icontains = title)
    
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



@api_view(['POST'])
def create_application(request, pk):

    job = Job.objects.get(pk=pk)
    form = applicationForm(request.POST, request.FILES)
    existing_application = Application.objects.filter(created_by = request.user, job=job)

    if not existing_application and form.is_valid():
        application = form.save(commit=False)
        application.created_by = request.user
        application.job = job
        application.save()

        return JsonResponse({'status': 'created'})
    else:
        message = form.errors
        return JsonResponse( message,
                            status=status.HTTP_400_BAD_REQUEST, safe=False)

@api_view(['POST'])
def review_application(request, pk, status):

    application = Application.objects.get(id=pk)
   
    if application.status == 'Pending':
        application.status = status
        application.save()

    serializer = ApplicationListSerializer(application, many = False)

    return JsonResponse(
        {"data": serializer.data},
    )
        



    
    