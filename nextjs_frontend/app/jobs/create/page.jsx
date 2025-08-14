'use client'
import { useState } from "react";
import apiService from "@/app/libs/apiService";
import { useRouter } from 'next/navigation';


export default function NewJobPage() {
	
	const router = useRouter()
    const [title, setTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
	const [location, setLocation] = useState("");
	const [salary, setSalary] = useState("");
	const [employmentType, setEmploymentType] = useState("");
	const [experienceLevel, setExperienceLevel] = useState("");
	const [description, setDescription] = useState("");
	const [requirements, setRequirements] = useState("");
	const [messages, setMessages] = useState([]);


    const handleSubmit = async () => {

		let tempMessages = [];

		if (!title.trim()) tempMessages.push({ message: 'Title is missing', type: 'error' });
		if (!companyName.trim()) tempMessages.push({ message: 'Company name is missing', type: 'error' });
		if (!location.trim()) tempMessages.push({ message: 'Location is missing', type: 'error' });
		if (!employmentType.trim()) tempMessages.push({ message: 'Employment type is missing', type: 'error' });
		if (!experienceLevel.trim()) tempMessages.push({ message: 'Experience level is missing', type: 'error' });
		if (!salary.trim()) tempMessages.push({ message: 'Salary is missing', type: 'error' });
		if (!description.trim()) tempMessages.push({ message: 'Description is missing', type: 'error' });
		if (!requirements.trim()) tempMessages.push({ message: 'Requirements are missing', type: 'error' });

		if (tempMessages.length > 0) {
			setMessages(tempMessages);
			return;
		}

        const formData = {
			title,
            company_name: companyName,
			location,
			salary,
			employment_type: employmentType,
			experience_level: experienceLevel,
			description,
			requirements: requirements.split("\n").filter(line => line.trim() !== "")
		};

        const response = await apiService.post('/job/create_job/', JSON.stringify(formData))
        console.log(response)
		
		if (response.status) {
			setMessages([{ message: 'Job created ! You will be redirected ', type: 'success' }]);			
			router.push('jobs/myjobs')
		} else if (response.errors) {
			const tmpErrors = Object.values(response.errors).map((response) => {
				return {
				message: response,
				type: 'error'
			};
			})
			setMessages(tmpErrors);
		}
    }
    
    

    
    
    return (
		<div className="py-10 px-6">
			<h1 className="mb-6 text-2xl font-bold">Create Job</h1>

			<form 
            className="space-y-4"
            onSubmit={(e) => {
                console.log("submit")
                e.preventDefault();     
                handleSubmit();   }}
            >
				<div>
					<label className="block font-medium">Title</label>
					<input
                        value={title}
						onChange={(e)=>{setTitle(e.target.value)}}
						type="text"
						className="w-full mt-2 p-4 rounded-xl bg-gray-100"
					/>
				</div>

				<div>
					<label className="block font-medium">Company name</label>
					<input
                        value={companyName}
						onChange={(e)=>{setCompanyName(e.target.value)}}
						type="text"
						className="w-full mt-2 p-4 rounded-xl bg-gray-100"
					/>
				</div>

				<div>
					<label className="block font-medium">Location</label>
					<input
                        value={location}
						onChange={(e)=>{setLocation(e.target.value)}}
						type="text"
						className="w-full mt-2 p-4 rounded-xl bg-gray-100"
					/>
				</div>

				<div>
					<label className="block font-medium">Employment type</label>
					<select 
                    value={employmentType}
					onChange={(e)=>{setEmploymentType(e.target.value)}}
                    className="w-full mt-2 p-4 rounded-xl bg-gray-100">
						<option value="">Select type</option>
						<option value="Full Time">Full Time</option>
						<option value="Part Time">Part Time</option>
						<option value="Contract">Contract</option>
					</select>
				</div>

				<div>
					<label className="block font-medium">Experience type</label>
					<select 
                    value={experienceLevel}
					onChange={(e)=>{setExperienceLevel(e.target.value)}}
                    className="w-full mt-2 p-4 rounded-xl bg-gray-100">
						<option value="">Select experience</option>
						<option value="Entry Level">Junior</option>
						<option value="Mid Level">Mid</option>
						<option value="Senior">Senior</option>
					</select>
				</div>

				<div>
					<label className="block font-medium">Salary</label>
					<input
                        value={salary}
						onChange={(e)=>{setSalary(e.target.value)}}
						type="text"
						className="w-full mt-2 p-4 rounded-xl bg-gray-100"
					/>
				</div>

				<div>
					<label className="block font-medium">Description</label>
					<textarea
                        value={description}
						onChange={(e)=>{setDescription(e.target.value)}}
						className="w-full mt-2 p-4 rounded-xl bg-gray-100"
						rows="5"
					></textarea>
				</div>

				<div>
					<label>Requirements</label>
					<div className="flex mt-2">
						<div className="bg-gray-200 text-gray-700 px-3 py-2 text-right select-none rounded-l-xl">
							{[1, 2, 3, 4, 5, 6].map((n) => (
								<div key={n} className="leading-[1.5rem]">{n}</div>
							))}
						</div>

						<textarea
							value={requirements}
							onChange={(e) => setRequirements(e.target.value)}
							className="flex-1 p-3 font-mono bg-gray-100 outline-none resize-none rounded-r-xl"
							rows={6}
							placeholder="Enter one requirement per line..."
						/>
					</div>
				</div>

				{messages.length > 0 && (
					<div className="mb-4">
						{messages.map((msg, index) => (
							<div
								key={index}
								className={`p-3 mb-2 rounded ${
									msg.type === 'error'
										? 'bg-red-100 text-red-700'
										: 'bg-green-100 text-green-700'
								}`}
							>
								{msg.message}
							</div>
						))}
					</div>
				)}

				<button
					type="submit"
					className="py-4 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
