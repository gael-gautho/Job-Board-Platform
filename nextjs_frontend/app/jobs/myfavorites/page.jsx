import Link from 'next/link';



export default function MyfavoritesPage() {

    const allJobs = [
			{ id: 1, title: "React Developer", position_location: "Paris", company_name: "TechCorp", type: "Full-time", experience: "Mid" },
			{ id: 2, title: "Django Developer", position_location: "Remote", company_name: "CodeWorks", type: "Part-time", experience: "Senior" },
			{ id: 3, title: "UX Designer", position_location: "Lyon", company_name: "Designify", type: "Full-time", experience: "Junior" },
		];

	return (
	<div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">My favorites</h1>
    
        {allJobs.length === 0 && <p>No Favorites </p>}

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
    </div>
	);
}
