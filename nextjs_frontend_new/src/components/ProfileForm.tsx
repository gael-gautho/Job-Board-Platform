"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiService from "@/libs/apiService";
import type { ProfileType } from "@/types"; 
import { toast } from "sonner";
import { logoutUser } from "@/libs/actions";

interface ProfileFormProps {
    initialProfile: ProfileType;
    isOwner: boolean;
}

export default function ProfileForm({ initialProfile, isOwner }: ProfileFormProps) {
    const router = useRouter();
    const [profile, setProfile] = useState<ProfileType>(initialProfile);
    const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };
    
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfile((prev) => ({ ...prev, new_photo: file }));
            setPreviewPhoto(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);     

        const formData = new FormData();

        if (profile.new_photo) formData.append('photo', profile.new_photo);
        if (profile.desired_position) formData.append('desired_position', profile.desired_position);
        if (profile.experience) formData.append('experience', String(profile.experience));
        if (profile.location) formData.append('location', profile.location);
        if (profile.new_resume) formData.append('resume', profile.new_resume);

        await apiService.post("/editprofile/", formData);
        toast.success('Profile updated successfully');

        setIsSaving(false);     
        
        //window.location.reload()
        router.refresh();
    };


    const handleLogout = async () => {
    
        setIsLoading(true);     
        await logoutUser();
        toast.success('Successfully logged out');
        setIsLoading(false);

        //window.location.href = '/';
                    
        };

    return (
        <>
            <div className="col-span-1">
                <div className="p-4 bg-white border border-gray-200 text-center rounded-lg">
                    <img
                        src={previewPhoto || profile.get_photo}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover mx-auto mb-6"
                    />
                    <p className="font-semibold">{profile.name}</p>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                    
                    {isOwner && (
                        <div className="mt-6 space-y-3">
                            <label className="w-full block">
                                <span className="w-full inline-block py-2 bg-blue-600 text-white rounded-lg text-xs cursor-pointer hover:bg-blue-700">
                                    Edit photo
                                </span>
                                <input onChange={handlePhotoChange} type="file" name="new_photo" accept="image/*" className="hidden" />
                            </label>
                            <button 
                            onClick={handleLogout}
                            className="w-full py-2 bg-red-600 text-white rounded-lg text-xs"
                            disabled = {isLoading}
                            >                                
                            {isLoading ? "Logging out" : "Logout"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="col-span-3 space-y-4">
                <div className="p-6 bg-white border border-gray-200 rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="desired_position" className="block text-sm font-medium mb-1">Desired Position</label>
                            <input
                                id="desired_position"
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
                        
                        <div>
                            <label className="block text-sm font-medium mb-1">Resume</label>
                            {profile.get_resume && (
                                <a href={profile.get_resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                    View Resume
                                </a>
                            )}
                            {isOwner && (
                                <input type="file" name="new_resume" accept=".pdf,.doc,.docx" onChange={handleChange} className="mt-1 block w-full py-2 text-base" />
                            )}
                        </div>
                        
                        {isOwner && (
                            <button type="submit" 
                            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-base font-medium"
                            disabled = {isSaving}                            
                            >
                                {isSaving ? "Saving changes" : "Save changes"}
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}