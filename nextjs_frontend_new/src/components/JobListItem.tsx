"use client"

import Link from 'next/link';
import { Job } from '@/types';

interface JobListItemProps {
  job: Job;
  onToggleFavorite: (jobId: string) => void;
}

export default function JobListItem({ job, onToggleFavorite }: JobListItemProps) {
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold">{job.title}</h2>
        <p className="text-gray-600">{job.company_name} – {job.location}</p>
        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {job.experience_level} • {job.created_at}
        </span>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <svg
          className={`w-6 h-6 cursor-pointer ${job.has_favorited ? 'fill-red-600' : 'fill-none'}`}
          onClick={() => onToggleFavorite(job.id)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <Link href={`/jobs/${job.id}`} className="py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Details
        </Link>
      </div>
    </>
  );
}
