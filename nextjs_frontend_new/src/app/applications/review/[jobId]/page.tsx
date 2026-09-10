import apiService from "@/libs/apiService";
import ApplicationsReviewClient from "@/components/ApplicationsReviewClient";
import { Job, Application } from "@/types";

interface ApplicationsReviewPageProps {
  params: {
    jobId: string;
  };
}

export default async function ApplicationsReviewPage({ 
  params 
}: ApplicationsReviewPageProps) {

const id = (await params).jobId
const response = await apiService.get(`/job/get_jobapplications/${id}/`);
const applications: Application[] = response.data || [];

  return (
    <div className="max-w-5xl mx-auto py-8 sm:py-10 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Review Applications</h1>

      <ApplicationsReviewClient 
        initialApplications={applications}
        jobId={id}
      />
    </div>
  );
}
