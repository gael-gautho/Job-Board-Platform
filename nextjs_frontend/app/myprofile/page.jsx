"use client";
import { useEffect, useState } from "react";
import apiService from "../libs/apiService";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
	const router = useRouter()
	const [profile, setProfile] = useState({});
	const [previewPhoto, setPreviewPhoto] = useState(null);

	useEffect(() => {
		const getProfile = async () => {
			const tmpProfile = await apiService.get("/profile/");
			tmpProfile.data &&
				setProfile((prev) => ({
					...prev,
					...tmpProfile.data,
				}));
		};
		getProfile();
	}, []);

	const isOwner = true; 

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setProfile((prev) => ({
			...prev,
			[name]: files ? files[0] : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
        const formData = new FormData();

		profile.new_photo && formData.append('photo', profile.new_photo);
		profile.desired_position && formData.append('desired_position', profile.desired_position);
		profile.experience && formData.append('experience', profile.experience);
		profile.location && formData.append('location', profile.location);
		profile.new_resume && formData.append('resume', profile.new_resume);

		const response = await apiService.post("/editprofile/", formData)
		console.log("Submitting profile update:", formData);
		window.location.reload();
	};

	return (
		<div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 py-6">
			<div className="col-span-1">
				<div className="p-4 bg-white border border-gray-200 text-center rounded-lg">
					<img
						src={previewPhoto || profile.get_photo}
						alt="Profile"
						className="w-28 h-28 rounded-full object-cover mx-auto mb-6"
					/>

					<p className="font-semibold">{profile.name}</p>
					<p className="text-sm text-gray-500">{profile.email}</p>

					<div className="mt-6 space-y-3">
						{isOwner && (
							<>
							<label className="w-full block">
								<span className="w-full inline-block py-2 bg-blue-600 text-white rounded-lg text-xs cursor-pointer hover:bg-blue-700">
									Edit photo
								</span> 
								<input onChange={(e)=>{
									setProfile((prev) => ({ ...prev, "new_photo": e.target.files[0] }))
									setPreviewPhoto(URL.createObjectURL(e.target.files[0]));}} 
								type="file" name="new_photo" accept="image/*" className="hidden" />
							</label>
							
							<button className="w-full py-2 bg-red-600 text-white rounded-lg text-xs">
								Log out
							</button>
							</>
						)}
					</div>
				</div>
			</div>

			<div className="col-span-3 space-y-4">
				<div className="p-6 bg-white border border-gray-200 rounded-lg">
					<form
						onSubmit={handleSubmit}
						className="space-y-6"
					>
						<div>
							<label className="block text-sm font-medium mb-1">
								Desired Position
							</label>
							<input
								type="text"
								name="desired_position"
								value={profile.desired_position || ""}
								onChange={handleChange}
								disabled={!isOwner}
								className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm py-3 px-4 text-base disabled:bg-gray-100"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">
								Years of Experience
							</label>
							<input
								type="number"
								name="experience"
								value={profile.experience || ""}
								onChange={handleChange}
								disabled={!isOwner}
								className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm py-3 px-4 text-base disabled:bg-gray-100"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1">
								Location
							</label>
							<input
								type="text"
								name="location"
								value={profile.location || ""}
								onChange={handleChange}
								disabled={!isOwner}
								className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm py-3 px-4 text-base disabled:bg-gray-100"
							/>
						</div>
						{isOwner ? (<>
						<div>
							<label className="block text-sm font-medium mb-1">
								Resume
							</label>

							{ profile.get_resume && (  
							<a href={profile.get_resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" > View Resume </a>)
							}

							<input type="file" name="new_resume" accept=".pdf,.doc,.docx" onChange={handleChange} disabled={!isOwner} className="mt-1 block w-full py-2 text-base disabled:bg-gray-100" />
						</div>
					
						<button
							type="submit"
							className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base font-medium"
						>
							Save Changes
						</button>
						
						</>
						):( profile.get_resume && (  
						<a href={profile.get_resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" > View Resume </a>)
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
