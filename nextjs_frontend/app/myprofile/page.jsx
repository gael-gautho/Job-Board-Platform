"use client";
import { useEffect, useState } from "react";
import apiService from "../libs/apiService";

export default function ProfilePage() {
	const [profile, setProfile] = useState({
		desired_position: "",
		location: "",
		years_of_experience: "",
		cv: null,
	});

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

	const isOwner = false; 

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setProfile((prev) => ({
			...prev,
			[name]: files ? files[0] : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Submitting profile update:", profile);
	};

	return (
		<div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 py-6">
			<div className="col-span-1">
				<div className="p-4 bg-white border border-gray-200 text-center rounded-lg">
					<img
						src={profile.get_photo}
						alt="Profile"
						className="w-28 h-28 rounded-full object-cover mx-auto mb-6"
					/>

					<p className="font-semibold">{profile.name}</p>
					<p className="text-sm text-gray-500">{profile.email}</p>

					<div className="mt-6 space-y-3">
						{isOwner && (
							<button className="w-full py-2 bg-red-600 text-white rounded-lg text-xs">
								Log out
							</button>
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
								name="years_of_experience"
								value={profile.years_of_experience || ""}
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
								Upload CV
							</label>
							<input
								type="file"
								name="cv"
								accept=".pdf,.doc,.docx"
								onChange={handleChange}
								disabled={!isOwner}
								className="mt-1 block w-full py-2 text-base disabled:bg-gray-100"
							/>
						</div>
					
						<button
							type="submit"
							className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base font-medium"
						>
							Save Changes
						</button>
						
						</>
						):( profile.resume && (  
						<a
							href={profile.cv} // ← Assure-toi que ton backend renvoie bien une URL
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 underline"
						>
							View CV
						</a>)
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
