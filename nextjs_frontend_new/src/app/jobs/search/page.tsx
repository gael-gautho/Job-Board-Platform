import JobList from '@/components/JobList';
import JobFilters from '@/components/JobFilters';
import apiService from '@/libs/apiService';
import { Job } from '@/types';

type JobResultsPageProps = {
  searchParams: {
    title?: string;
    location?: string;
    datePosted?: string;
    experience?: string;
    jobType?: string;
  };
};

export default async function JobResultsPage({ searchParams }: JobResultsPageProps) {

    const title = (await searchParams).title || "";
    const location = (await searchParams).location || "";
    const datePosted = (await searchParams).datePosted || "all";
    const experience = (await searchParams).experience || "all";
    const jobType = (await searchParams).jobType || "all";

    const response = await apiService.get(
      `/job/search/?title=${title}&location=${location}&jobType=${jobType}&experience=${experience}&datePosted=${datePosted}`
    );
    const jobs: Job[] = response.data;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 flex gap-8">
            <JobFilters />
            <main className="flex-1">
                <h1 className="text-2xl font-bold mb-6">Job Results</h1>
                <p className="text-gray-600 mb-6">
                    Results for: <strong>{title || "Any job"}</strong> in <strong>{location || "Any location"}</strong>
                </p>
                
                {jobs?.length === 0 ? (
                    <p>No jobs found.</p>
                ) : (
                    <div className="space-y-4">
                        <JobList initialJobs={jobs} />
                    </div>
                )}
            </main>
        </div>
    );
}