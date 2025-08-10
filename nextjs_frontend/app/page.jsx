"use client"

import { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import apiService from '@/app/libs/apiService';



export default function Home() {
	const [title, setTitle] = useState('');
	const [location, setLocation] = useState('');
	const [jobs, setJobs] = useState([]);	

	const getJobs = async () => {
        let url = '/get_joblist/';
		const tmpJobs = await apiService.get(url)
		console.log(tmpJobs)
		tmpJobs && setJobs(tmpJobs.map((job) => {
			return job
		console.log(jobs)
		}));
	}
	
	useEffect( 
		()=>{
			getJobs();
		}
		,[])

	return (
<div className="min-h-screen bg-gray-50">

	<section className="py-16 px-4 text-center">
		<h2 className="text-4xl font-bold text-gray-800 mb-4">
			Find your next opportunity
		</h2>
		<p className="text-gray-600 mb-8">
			Browse the latest job listings and apply in seconds.
		</p>

		<div className="max-w-3xl mx-auto">
			<form className="flex flex-col sm:flex-row gap-4 items-center justify-center">
				<input
					type="text"
					placeholder="Job title or keyword"
					value={title}
					onChange={e => setTitle(e.target.value)}
					className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<input
					type="text"
					placeholder="Location"
					value={location}
					onChange={e => setLocation(e.target.value)}
					className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					type="submit"
					className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
					onClick={e => e.preventDefault()}
				>
					Search
				</button>
			</form>
		</div>
	</section>

	<section className="max-w-4xl mx-auto px-4 pb-16">
		<h3 className="text-2xl font-semibold mb-6">Recent Job Listings</h3>

		<div className="space-y-4">
			{jobs.length > 0 ? (
			jobs.map(job => (
				<div key={job.id}
				className="flex justify-between bg-white p-5 rounded-lg shadow hover:shadow-md transition">
					<div>
					<h2 className="text-xl font-semibold">{job.title}</h2>
					<p className="text-gray-600">{job.company_name} – {job.location}</p>
					
					
					<span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
						{job.experience_level} • {job.created_at}
					</span>
					</div>
				
					<div
					className='flex flex-col items-center space-y-2 '
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
						</svg>

                    	<Link href={`/jobs/${job.id}`} className="py-4 px-6 bg-blue-600 text-white rounded-xl">
						Details
						</Link>
					</div>

				</div>
			))
			) : (	<p>No jobs found.</p> )}

		</div>
	</section>
</div>
	);
}
