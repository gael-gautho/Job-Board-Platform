import JobList from "@/components/JobList";
import apiService from "@/libs/apiService";
import { Job } from "@/types";

export default async function MyfavoritesPage() {

    const tmpJob = await apiService.get(`/job/get_myfavorites/`)	
    const jobs : Job[] = tmpJob.data
    console.log(jobs)


    return (
    <div className="flex-1 px-6">
        <h1 className="text-2xl font-bold mb-6">My favorites</h1>
    
        {jobs.length === 0 && <p>No Favorites </p>}

        <div className="space-y-4 px-4">
            <JobList initialJobs={jobs} />
        </div>
    </div>
    );
}
