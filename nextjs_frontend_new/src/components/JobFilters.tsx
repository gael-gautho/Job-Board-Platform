"use client"; 

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FormEvent, ChangeEvent } from 'react';

export default function JobFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [title, setTitle] = useState<string>(searchParams.get('title') || "");
    const [location, setLocation] = useState<string>(searchParams.get('location') || "");
    const [datePosted, setDatePosted] = useState<string>(searchParams.get('datePosted') || "all");
    const [experience, setExperience] = useState<string>(searchParams.get('experience') || "all");
    const [jobType, setJobType] = useState<string>(searchParams.get('jobType') || "all");

    
    const updateSearchParams = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('title', title);
        params.set('location', location);
        params.set('datePosted', datePosted);
        params.set('experience', experience);
        params.set('jobType', jobType);
        
        router.push(`/jobs/search?${params.toString()}`);
    };

    useEffect(() => {
        const hasChanged = searchParams.get('datePosted') !== datePosted || 
                           searchParams.get('experience') !== experience || 
                           searchParams.get('jobType') !== jobType;
        
        if (hasChanged) {
            updateSearchParams();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datePosted, experience, jobType]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateSearchParams();
    };

    return (
        <aside className="flex flex-col item-center space-y-4 w-64 bg-white p-6 rounded-lg shadow">
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-4">
                    <input
                        type="search"
                        placeholder="Find a job..."
                        value={title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        className="w-full px-6 py-4 rounded-xl border"
                    />
                    <button type='submit' className="px-6 py-4 bg-blue-500 text-white rounded-xl">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>

                <h2 className="text-lg font-semibold my-4">Filters</h2>

                <div className="mb-4">
                    <label className="block font-medium mb-2">Location</label>
                    <input
                        type="text"
                        placeholder="e.g. Paris"
                        value={location}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block font-medium mb-2">Date posted</label>
                    <select value={datePosted} onChange={(e: ChangeEvent<HTMLSelectElement>) => setDatePosted(e.target.value)} className="w-full border border-gray-300 rounded p-2">
                        <option value="all">Any time</option>
                        <option value="1">Last 24 hours</option>
                        <option value="3">Last 3 days</option>
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                    </select>
                </div>
                
                 <div className="mb-4">
                    <label className="block font-medium mb-2">Experience</label>
                    <select value={experience} onChange={(e: ChangeEvent<HTMLSelectElement>) => setExperience(e.target.value)} className="w-full border border-gray-300 rounded p-2">
                        <option value="all">All</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-2">Employment Type</label>
                    <select value={jobType} onChange={(e: ChangeEvent<HTMLSelectElement>) => setJobType(e.target.value)} className="w-full border border-gray-300 rounded p-2">
                        <option value="all">All</option>
                        <option value="Permanent">Permanent</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
            </form>
        </aside>
    );
}