"use client"
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import JobListItem from '../../components/JobListItem';
import apiService from '../../libs/apiService';


export default function JobResultsPage() {
	const router = useRouter();
	const searchParams = useSearchParams()
	const [jobs, setJobs] = useState([]);
	const [title, setTitle] = useState(searchParams.get('title') || "");
	const [location, setLocation] = useState(searchParams.get('location') || "");
	const [datePosted, setDatePosted] = useState("all");
	const [experience, setExperience] = useState("all");
	const [jobType, setJobType] = useState("all");

	
	const performSearch = async() => {
	const tmpjobs = await apiService.get(`/job/search/?title=${title}&location=${location}&jobType=${jobType}&experience=${experience}&datePosted=${datePosted}`)
	setJobs(tmpjobs.data)
}
	
	useEffect(() => {
		performSearch();

	}, [datePosted, experience, jobType]);
	
	 

	return (
		<div className="max-w-7xl mx-auto py-12 px-4 flex gap-8">

			{/* Sidebar Filters */}
			<aside className="flex flex-col item-center space-y-4 w-64 bg-white p-6 rounded-lg shadow">
				
				<form 
				onSubmit={(e)=>{
					e.preventDefault();
					performSearch();}}
				>
				{/* Search by Title */}
				<div className="flex space-x-4">
					<input 
						type="search" 
						placeholder="Find a job..." 
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full px-6 py-4 rounded-xl border"
					/>
					<button
					type='submit' 
					className="px-6 py-4 bg-blue-500 text-white rounded-xl">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
						</svg>
					</button>
				</div>
				
				<h2 className="text-lg font-semibold mb-4">Filters</h2>

				{/* Location */}
				<div className="mb-4">
					<label className="block font-medium mb-2">Location</label>
					<input
						type="text"
						placeholder="e.g. Paris"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						className="w-full border border-gray-300 rounded p-2"
					/>
				</div>

				{/* Date Posted */}
				<div className="mb-4">
					<label className="block font-medium mb-2">Date posted</label>
					<select
						value={datePosted}
						onChange={(e) => setDatePosted(e.target.value)}
						className="w-full border border-gray-300 rounded p-2"
					>
						<option value="">Any time</option>
						<option value="1">Last 24 hours</option>
						<option value="3">Last 3 days</option>
						<option value="7">Last 7 days</option>
						<option value="30">Last 30 days</option>
					</select>
				</div>

				{/* Experience */}
				<div className="mb-4">
					<label className="block font-medium mb-2">Experience</label>
					<select
						value={experience}
						onChange={(e) => setExperience(e.target.value)}
						className="w-full border border-gray-300 rounded p-2"
					>
						<option value="">All</option>
						<option value="Entry Level">Entry Level</option>
						<option value="Mid Level">Mid Level</option>
						<option value="Senior">Senior</option>
					</select>
				</div>

				{/* Job Type */}
				<div className="mb-4">
					<label className="block font-medium mb-2">Employment Type</label>
					<select
						value={jobType}
						onChange={(e) => setJobType(e.target.value)}
						className="w-full border border-gray-300 rounded p-2"
					>
						<option value="">All</option>
						<option value="Permanent">Permanent</option>
						<option value="Temporary">Temporary</option>
						<option value="Freelance">Freelance</option>
						<option value="Internship">Internship</option>
					</select>
				</div>
				</form>
			</aside>

			{/* Job Results */}
			<main className="flex-1">
				<h1 className="text-2xl font-bold mb-6">Job Results</h1>
				<p className="text-gray-600 mb-6">
					Results for: <strong>{title || "Any job"}</strong> in <strong>{location || "Any location"}</strong>
				</p>

				{jobs?.length === 0 && <p>No jobs found.</p>}

				<div className="space-y-4">
					{jobs?.map((job) => (
						<div key={job.id}
						className="flex justify-between bg-white p-5 rounded-lg shadow hover:shadow-md transition">
							<JobListItem jobProp={job}/>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
