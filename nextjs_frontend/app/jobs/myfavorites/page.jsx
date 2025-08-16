import JobListItem from "@/app/components/JobListItem";
import apiService from "@/app/libs/apiService";

export default async function MyfavoritesPage() {

    const tmpJob = await apiService.get(`/job/get_myfavorites/`)	
	const jobs = tmpJob.data
	console.log(jobs)


	return (
	<div className="flex-1 px-6">
        <h1 className="text-2xl font-bold mb-6">My favorites</h1>
    
        {jobs.length === 0 && <p>No Favorites </p>}

        <div className="space-y-4 px-4">
            {jobs.map((job) => (
                <div key={job.id}
                className="flex justify-between bg-white p-5 rounded-lg shadow hover:shadow-md transition">
                    <JobListItem jobProp={job}/>
                </div>
            ))}
        </div>
    </div>
	);
}
