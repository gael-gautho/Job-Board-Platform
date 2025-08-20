"use client"

import { useState } from 'react';
import { useEffect } from 'react';
import apiService from '@/app/libs/apiService';
import JobListItem from './components/JobListItem';
import { useRouter } from 'next/navigation';


export default function Home() {
	const router = useRouter()
	const [title, setTitle] = useState('');
	const [location, setLocation] = useState('');
	const [jobs, setJobs] = useState([]);	

	const getJobs = async () => {
        let url = '/job/get_joblist/';
		const tmpJobs = await apiService.get(url)
		console.log(tmpJobs)
		setJobs(tmpJobs.data?.map((job) => {
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
					onClick={(e) =>{ e.preventDefault()
				 	router.push(`/jobs/search?title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}`)		
					}}
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
					<JobListItem jobProp={job}/>
				</div>
			))
			) : (	<p>No jobs found.</p> )}

		</div>
	</section>
</div>
	);
}
