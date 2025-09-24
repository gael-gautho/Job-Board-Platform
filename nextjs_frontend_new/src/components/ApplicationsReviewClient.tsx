"use client";

import { useState } from "react";
import apiService from "@/libs/apiService";
import { Application } from "@/types";

interface ApplicationsReviewClientProps {
  initialApplications: Application[];
  jobId: string;
}

export default function ApplicationsReviewClient({
  initialApplications,
  jobId
}: ApplicationsReviewClientProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const reviewApplication = async (
    applicationId: string, 
    status: "Accepted" | "Rejected"
  ): Promise<void> => {
    try {
      setIsLoading(prev => ({ ...prev, [applicationId]: true }));

      const response = await apiService.post( `/job/review_application/${applicationId}/${status}/`,'' );
      
      const updatedApp: Application = response.data;

      setApplications(prev => {
        const index = prev.findIndex(app => app.id === updatedApp.id);
        if (index === -1) return prev;
        
        const updated = [...prev];
        updated[index] = updatedApp;
        return updated;
      });
    } catch (error) {
      console.error("Error reviewing application:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, [applicationId]: false }));
    }
  };

  if (applications.length === 0) {
    return (
      <p className="text-gray-600">No applications found for this job.</p>
    );
  }

  const jobInfo = applications[0]?.job;

  return (
    <>
      {jobInfo && (
        <p className="text-lg text-gray-600 mb-6">
          {jobInfo.title} at{" "}
          <span className="font-semibold">{jobInfo.company_name}</span>
        </p>
      )}

      <div className="space-y-6">
        {applications.map((app) => (
          <div key={app.id} className="p-6 bg-white rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-xl font-semibold">{app.name}</h2>
                <p className="text-gray-600 text-sm">{app.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${getStatusStyles(
                  app.status
                )}`}
              >
                {app.status}
              </span>
            </div>

            <p className="text-gray-700 mb-3">{app.message}</p>
            
            <a
              href={app.get_resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm hover:text-blue-800"
            >
              View Resume
            </a>

            {app.status === "Pending" && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => reviewApplication(app.id, "Accepted")}
                  disabled={isLoading[app.id]}
                  className={`px-4 py-2 bg-green-600 text-white rounded-lg transition-colors ${
                    isLoading[app.id]
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-700"
                  }`}
                >
                  {isLoading[app.id] ? "Processing..." : "Accept"}
                </button>
                <button
                  onClick={() => reviewApplication(app.id, "Rejected")}
                  disabled={isLoading[app.id]}
                  className={`px-4 py-2 bg-red-600 text-white rounded-lg transition-colors ${
                    isLoading[app.id]
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-700"
                  }`}
                >
                  {isLoading[app.id] ? "Processing..." : "Reject"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

  const getStatusStyles = (status: Application["status"]): string => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };