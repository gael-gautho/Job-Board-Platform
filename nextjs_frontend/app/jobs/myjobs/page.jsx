export default function RecruiterJobsPage() {
	const jobs = [
		{
			id: 1,
			title: "Frontend Developer",
			datePosted: "2025-07-15",
			status: "Open",
			applicants: 12
		},
		{
			id: 2,
			title: "Backend Developer",
			datePosted: "2025-07-10",
			status: "Closed",
			applicants: 8
		},
		{
			id: 3,
			title: "UI/UX Designer",
			datePosted: "2025-06-28",
			status: "Open",
			applicants: 5
		}
	];

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<h1 className="text-3xl font-bold mb-6">My Job Posts</h1>
			<div className="bg-white rounded-lg shadow-lg p-6">
				<table className="w-full table-auto">
					<thead>
						<tr className="bg-gray-200 text-left">
							<th className="p-3">Title</th>
							<th className="p-3">Date Posted</th>
							<th className="p-3">Status</th>
							<th className="p-3">Total Applicants</th>
							<th className="p-3">View Applicants</th>
							<th className="p-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{jobs.map((job) => (
							<tr key={job.id} className="border-b hover:bg-gray-50">
								<td className="p-3 font-medium">{job.title}</td>
								<td className="p-3">{job.datePosted}</td>
								<td className={`p-3 font-semibold ${job.status === "Open" ? "text-green-600" : "text-red-600"}`}>
									{job.status}
								</td>
								<td className="p-3">{job.applicants}</td>
								<td className="p-3">
									<a href={`/recruiter/jobs/${job.id}/applicants`} className="text-blue-600 underline hover:text-blue-800">
										View
									</a>
								</td>
								<td className="p-3 space-x-2">
									<button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
										Edit
									</button>
									<button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
