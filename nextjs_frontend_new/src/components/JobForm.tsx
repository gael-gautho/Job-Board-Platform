'use client';

import { useState } from "react";
import type { FormEvent, ChangeEvent } from 'react'; 
import apiService from "@/libs/apiService";
import { useRouter } from 'next/navigation';
import { Job } from "@/types";

interface Message {
  message: string;
  type: 'error' | 'success';
}



interface JobFormProps {
    mode: 'create' | 'edit';
    jobId?: string;
    initialData?: Partial<Job>;
}

export default function JobForm({ mode, jobId, initialData }: JobFormProps) {
    const router = useRouter();

    // États du formulaire
    const [title, setTitle] = useState<string>(initialData?.title || "");
    const [companyName, setCompanyName] = useState<string>(initialData?.company_name || "");
    const [location, setLocation] = useState<string>(initialData?.location || "");
    const [salary, setSalary] = useState<string>(initialData?.salary || "");
    const [employmentType, setEmploymentType] = useState<string>(initialData?.employment_type || "");
    const [experienceLevel, setExperienceLevel] = useState<string>(initialData?.experience_level || "");
    const [description, setDescription] = useState<string>(initialData?.description || "");
    const [requirements, setRequirements] = useState<string>(
        initialData?.requirements ? initialData.requirements.join("\n") : ""
    );
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    

    const validateForm = (): Message[] => {
        const tempMessages: Message[] = [];
        if (!title.trim()) tempMessages.push({ message: 'Title is missing', type: 'error' });
        if (!companyName.trim()) tempMessages.push({ message: 'Company name is missing', type: 'error' });
        if (!location.trim()) tempMessages.push({ message: 'Location is missing', type: 'error' });
        if (!employmentType.trim()) tempMessages.push({ message: 'Employment type is missing', type: 'error' });
        if (!experienceLevel.trim()) tempMessages.push({ message: 'Experience level is missing', type: 'error' });
        if (!salary.trim()) tempMessages.push({ message: 'Salary is missing', type: 'error' });
        if (!description.trim()) tempMessages.push({ message: 'Description is missing', type: 'error' });
        if (!requirements.trim()) tempMessages.push({ message: 'Requirements are missing', type: 'error' });
        return tempMessages;
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setMessages([]); 

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setMessages(validationErrors);
            setIsLoading(false);
            return;
        }

        const formData: Partial<Job> = {
            title,
            company_name: companyName,
            location,
            salary,
            employment_type: employmentType,
            experience_level: experienceLevel,
            description,
            requirements: requirements.split("\n").filter(line => line.trim() !== "")
        };

        try {
            const endpoint = mode === 'create' 
                ? '/job/create_job/' 
                : `/job/edit_job/${jobId}/`;
            
            const method = mode === 'create' ? 'post' : 'put';

            const response = await apiService[method](endpoint, formData);
            
            if (response.success) {
                const successMessage = mode === 'create' 
                    ? 'Job created! You will be redirected...'
                    : 'Job updated! You will be redirected...';
                
                setMessages([{ message: successMessage, type: 'success' }]);
                
                setTimeout(() => {
                    router.push('/jobs/myjobs');
                }, 2000);
            } else if (response.errors) {
                const tmpErrors: Message[] = Object.values(response.errors).map((errorMsg: any) => ({
                    message: errorMsg,
                    type: 'error'
                }));
                setMessages(tmpErrors);
            }
        } catch (error) {
            console.error("API call failed:", error);
            setMessages([{ 
                message: `An unexpected error occurred while ${mode === 'create' ? 'creating' : 'updating'} the job. Please try again.`, 
                type: 'error' 
            }]);
        } finally {
            if (!messages.some(m => m.type === 'success')) {
               setIsLoading(false);
            }
        }
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
    };
    
    const pageTitle = mode === 'create' ? 'Create Job' : 'Edit Job';
    const submitButtonText = mode === 'create' ? 'Create Job' : 'Update Job';
    const loadingText = mode === 'create' ? 'Creating...' : 'Updating...';
    
    return (
        <div className="py-10 px-6">
            <h1 className="mb-6 text-2xl font-bold">{pageTitle}</h1>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div>
                    <label className="block font-medium">Title</label>
                    <input
                        value={title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)}}
                        type="text"
                        className="w-full mt-2 p-4 rounded-xl bg-gray-100"
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label className="block font-medium">Company name</label>
                    <input
                        value={companyName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {setCompanyName(e.target.value)}}
                        type="text"
                        className="w-full mt-2 p-4 rounded-xl bg-gray-100"
                        disabled={isLoading}
                    />
                </div>
                
                <div>
                    <label className="block font-medium">Location</label>
                    <input
                        value={location}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {setLocation(e.target.value)}}
                        type="text"
                        className="w-full mt-2 p-4 rounded-xl bg-gray-100"
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label className="block font-medium">Employment type</label>
                    <select 
                        value={employmentType}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {setEmploymentType(e.target.value)}}
                        className="w-full mt-2 p-4 rounded-xl bg-gray-100"
                        disabled={isLoading}
                    >
                        <option value="">Select type</option>
                        <option value="Permanent">Permanent</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium">Experience level</label>
                    <select 
                        value={experienceLevel}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {setExperienceLevel(e.target.value)}}
                        className="w-full mt-2 p-4 rounded-xl bg-gray-100"
                        disabled={isLoading}
                    >
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
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {setSalary(e.target.value)}}
                        type="text"
                        className="w-full mt-2 p-4 rounded-xl bg-gray-100"
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {setDescription(e.target.value)}}
                        className="w-full mt-2 p-4 rounded-xl bg-gray-100"
                        rows={5}
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label className="block font-medium">Requirements</label>
                    <textarea
                        value={requirements}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setRequirements(e.target.value)}
                        className="w-full mt-2 p-4 font-mono bg-gray-100 outline-none resize-none rounded-xl"
                        rows={6}
                        placeholder="Enter one requirement per line..."
                        disabled={isLoading}
                    />
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
                    className="py-4 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
                    disabled={isLoading}
                >
                    {isLoading ? loadingText : submitButtonText}
                </button>
            </form>
        </div>
    );
}