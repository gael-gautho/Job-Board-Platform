import JobForm from '@/components/JobForm';
import apiService from '@/libs/apiService';
import { Job } from '@/types';

interface EditJobPageProps {
    params: Promise<{ id: string }>;
}


export default async function EditJobPage({ params }: EditJobPageProps) {
    const id = (await params).id;
    const response = await apiService.get(`/job/get_jobdetail/${id}`);
    const job : Job = response.data; 


    return <JobForm mode="edit" jobId={id} initialData={job} />;
}