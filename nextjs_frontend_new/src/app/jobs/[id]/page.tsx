import { Job } from '@/types';
import apiService from '@/libs/apiService';
import JobApplicationForm from '@/components/JobApplicationForm';
import Link from 'next/link';

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const response = await apiService.get(`/job/get_jobdetail/${id}`);
  const job : Job = response.data; 

  return (
<div className="max-w-7xl mx-auto py-12 px-4">
    
    <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to job listings
    </Link>
    {job && (

    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 py-6">
        <div className="col-span-3 space-y-4">
			<div className="bg-white p-6 rounded-lg shadow mb-8">
				<h1 className="text-3xl font-bold mb-2">{job.title}</h1>
				<p className="text-gray-700 text-lg">{job.company_name} – {job.location}</p>
				<div className="mt-3 flex flex-wrap gap-2">
					<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">{job.employment_type}</span>
					<span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">{job.experience_type}</span>
					<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm">{job.salary}</span>
				</div>
				<p className="text-gray-500 mt-3 text-sm">Posted on {job.created_at}</p>
			</div>

			<div className="bg-white p-6 rounded-lg shadow mb-8">
				<h2 className="text-xl font-semibold mb-4">Job Description</h2>
				<p className="text-gray-700 mb-4 whitespace-pre-line">{job.description}</p>

				<h3 className="text-lg font-semibold mt-6 mb-3">Requirements</h3>
				<ul className="list-disc pl-6 text-gray-700">
					{job.requirements?.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>
		</div>  

      <JobApplicationForm jobId={id} initialHasApplied={job.has_applied} />
    </div>
)};
    
    
    </div>
  );
}
