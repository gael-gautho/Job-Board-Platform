'use client'
import Link from "next/link";
import apiService from "@/app/libs/apiService";
import { useEffect, useState } from "react";

const JobDetailPage = ({params}) => {

	const [form, setForm] = useState({ fullname: "", email: "", message: "", resume: null, });
	const [job, setJob] = useState(null);
	const getJob = async () => {
			const tmpJob = await apiService.get(`/job/get_jobdetail/${params.id}`)	
			setJob(tmpJob.data)
			console.log(job)
		};

	useEffect(() => {
		getJob();
	}, []);
	
	
	const handleSubmit = async (e) => {
		e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.fullname);
        formData.append('email', form.email);
        formData.append('message', form.message);
        formData.append('resume', form.resume);

		const response = await apiService.post(`/job/create_application/${params.id}`, formData);
		console.log(response);
		window.location.reload();

	}



	return (
		<div className="max-w-7xl mx-auto py-12 px-4">
			<Link href="/jobs" className="text-blue-600 hover:underline mb-6 inline-block">
				← Back to job listings
			</Link>
			{job && (
			<>
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

		<div className="col-span-1">
			<form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow space-y-4 sticky top-20"
            >
              <h2 className="text-xl font-semibold mb-4">Apply for this job</h2>

              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={form.fullname}
                  onChange={(e)=>{setForm((prev) => ({ ...prev, "fullname": e.target.value }))}  }
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e)=>{setForm((prev) => ({ ...prev, "email": e.target.value }))}  }
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(e)=>{setForm((prev) => ({ ...prev, "message": e.target.value }))}  }
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
                  rows={4}
				  required
				/>
              </div>

              <div>
                <label className="block text-sm font-medium">Resume (PDF/DOC)</label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={(e)=>{setForm((prev) => ({ ...prev, "resume": e.target.files[0] }))}  }
                  className="mt-1 block w-full"
                  required
				/>
              </div>
			{job.has_applied ? (
				  <p className="text-gray-600 font-medium">✅ Already applied</p>
				):
              (<button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Submit Application
              </button>)
			  }
            </form>

		</div>



		</div>
			</>
			)};

		</div>
	);
}


export default JobDetailPage;