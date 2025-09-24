'use client'
import { useState } from "react";
import Link from "next/link";
import apiService from "@/libs/apiService";
import { Job } from "@/types";
import { toast } from "sonner";

interface JobsTableProps {
  initialJobs: Job[];
}

export default function JobsTable({ initialJobs }: JobsTableProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const response = await apiService.delete(`/job/delete_job/${id}`);
      console.log(response);
      
      if (response.status === 'deleted') {
        setJobs(prev => prev.filter(job => job.id !== id));
        toast.success('Job deleted successfully')
      }
    
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Date Posted</th>
            <th className="p-3">Total Applicants</th>
            <th className="p-3">View Applicants</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((job) => (
            <tr key={job.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{job.title}</td>
              <td className="p-3">{job.created_at}</td>
              <td className="p-3">{job.total_applicants}</td>
              <td className="p-3">
                <Link 
                  href={`/applications/review/${job.id}`} 
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View
                </Link>
              </td>
              <td className="p-3 space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(job.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}