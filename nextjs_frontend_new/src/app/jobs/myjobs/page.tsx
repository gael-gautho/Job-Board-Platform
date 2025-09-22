import apiService from "@/libs/apiService";
import JobsTable from "@/components/JobsTable";
import { Job } from "@/types";


export default async function RecruiterJobsPage() {
    
    const response = await apiService.get(`/job/get_myjobs/`);
    const jobs : Job[] = response.data

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">My Job Posts</h1>
      <JobsTable initialJobs={jobs} />
    </div>
  );
}