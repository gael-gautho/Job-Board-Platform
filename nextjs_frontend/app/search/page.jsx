"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function JobResultsPage() {

	const router = useRouter();
	const [jobs, setJobs] = useState([]);
	const [title, setTitle] = useState("");
	const [location, setLocation] = useState("");

    const allJobs = [
			{ id: 1, title: "React Developer", position_location: "Paris", company_name: "TechCorp", type: "Full-time", experience: "Mid" },
			{ id: 2, title: "Django Developer", position_location: "Remote", company_name: "CodeWorks", type: "Part-time", experience: "Senior" },
			{ id: 3, title: "UX Designer", position_location: "Lyon", company_name: "Designify", type: "Full-time", experience: "Junior" },
		];


	return (
		<div className="max-w-7xl mx-auto py-12 px-4 flex gap-8">

			<aside className="flex flex-col item-center space-y-4 w-64 bg-white p-6 rounded-lg shadow">
				
				<div className="flex space-x-4">
					<input type="search" placeholder="Find a job..." className="w-full px-6 py-4 rounded-xl"/>

					<button 
						className="px-6 py-4 bg-blue-500 text-white rounded-xl"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
						</svg>
					</button>
				</div>
				
				<h2 className="text-lg font-semibold mb-4">Filters</h2>

				<div className="mb-4">
					<label className="block font-medium mb-2">Job Type</label>
					<select
						className="w-full border border-gray-300 rounded p-2"
					>
						<option value="">All</option>
						<option value="Full-time">Full-time</option>
						<option value="Part-time">Part-time</option>
					</select>
				</div>

				<div className="mb-4">
					<label className="block font-medium mb-2">Experience</label>
					<select
						className="w-full border border-gray-300 rounded p-2"
					>
						<option value="">All</option>
						<option value="Junior">Junior</option>
						<option value="Mid">Mid</option>
						<option value="Senior">Senior</option>
					</select>
				</div>
			</aside>

			<main className="flex-1">
				<h1 className="text-2xl font-bold mb-6">Job Results</h1>
				<p className="text-gray-600 mb-6">
					Results for: <strong>{title || "Any job"}</strong> in <strong>{location || "Any location"}</strong>
				</p>

				{allJobs.length === 0 && <p>No jobs found.</p>}

				<div className="space-y-4">
					{allJobs.map((job) => (
						<div key={job.id}
						className="flex justify-between bg-white p-5 rounded-lg shadow hover:shadow-md transition">
						
							<div>
							<h2 className="text-xl font-semibold">{job.title}</h2>
							<p className="text-gray-600">{job.company_name} – {job.position_location}</p>
							
							
							<span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
								{job.position_location} • {job.date}
							</span>
							</div>
						
							<div
							className='flex flex-col items-center space-y-2 '
							>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
								</svg>

								<Link href="/" className="py-4 px-6 bg-blue-600 text-white rounded-xl">
								Details
								</Link>
							</div>

						</div>
					))}
				</div>
			</main>
		</div>
	);
}
