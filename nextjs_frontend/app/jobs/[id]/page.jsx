import Link from "next/link";

export default function JobDetailPage() {
    
	const job = {
		id: 1,
		title: "React Developer",
		company: "TechCorp",
		location: "Paris, France",
		type: "Full-time",
		experience: "Mid",
		salary: "€45,000 - €55,000 / year",
		description: `
			We are looking for a passionate React Developer to join our growing tech team.
			You will work closely with designers and backend developers to create amazing user experiences.
		`,
		responsibilities: [
			"Develop and maintain React applications",
			"Collaborate with UX/UI designers",
			"Write clean, maintainable code",
			"Participate in code reviews"
		],
		requirements: [
			"2+ years of React experience",
			"Good knowledge of JavaScript (ES6+)",
			"Familiar with REST APIs",
			"Team player and good communicator"
		],
		postedDate: "July 28, 2025"
	};

	return (
		<div className="max-w-5xl mx-auto py-12 px-4">
			<Link href="/jobs" className="text-blue-600 hover:underline mb-6 inline-block">
				← Back to job listings
			</Link>

			<div className="bg-white p-6 rounded-lg shadow mb-8">
				<h1 className="text-3xl font-bold mb-2">{job.title}</h1>
				<p className="text-gray-700 text-lg">{job.company} – {job.location}</p>
				<div className="mt-3 flex flex-wrap gap-2">
					<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">{job.type}</span>
					<span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">{job.experience}</span>
					<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm">{job.salary}</span>
				</div>
				<p className="text-gray-500 mt-3 text-sm">Posted on {job.postedDate}</p>
			</div>

			<div className="bg-white p-6 rounded-lg shadow mb-8">
				<h2 className="text-xl font-semibold mb-4">Job Description</h2>
				<p className="text-gray-700 mb-4 whitespace-pre-line">{job.description}</p>

				<h3 className="text-lg font-semibold mt-6 mb-3">Responsibilities</h3>
				<ul className="list-disc pl-6 text-gray-700">
					{job.responsibilities.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>

				<h3 className="text-lg font-semibold mt-6 mb-3">Requirements</h3>
				<ul className="list-disc pl-6 text-gray-700">
					{job.requirements.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</div>

			<div className="flex gap-4">
				<button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
					Apply Now
				</button>
				<button className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
					Save Job
				</button>
			</div>
		</div>
	);
}
