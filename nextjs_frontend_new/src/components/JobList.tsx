"use client"

import { useEffect, useState } from 'react';
import JobListItem from './JobListItem';
import { Job } from '@/types';
import apiService from '@/libs/apiService';

export default function JobList({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  const toggleFavorite = async (jobId: string) => {
    
      const response = await apiService.fetch_proxy('POST',`/job/toggle_favorite/${jobId}/`,'');
      setJobs(jobs.map(job => job.id === jobId ? response.data : job));
   
  };

  return (
    <>
      {jobs?.map(job => (
        <div key={job.id} className="flex justify-between bg-white p-5 rounded-lg shadow hover:shadow-md transition">
          <JobListItem job={job} onToggleFavorite={toggleFavorite} />
        </div>
      ))}
    </>
  );
}
