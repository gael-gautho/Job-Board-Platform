"use client"

import { useState } from 'react';
import JobListItem from './JobListItem';
import { Job } from '@/types';
import apiService from '@/libs/apiService';

export default function JobList({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const toggleFavorite = async (jobId: string) => {
    try {
      const response = await apiService.post(`/job/toggle_favorite/${jobId}`,'');
      setJobs(jobs.map(job => job.id === jobId ? response.data : job));
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="space-y-4">
      {jobs.map(job => (
        <div key={job.id} className="flex justify-between bg-white p-5 rounded-lg shadow hover:shadow-md transition">
          <JobListItem job={job} onToggleFavorite={toggleFavorite} />
        </div>
      ))}
    </div>
  );
}
