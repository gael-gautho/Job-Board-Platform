"use client";
import apiService from "@/app/libs/apiService";
import { useState, useEffect } from "react";

export default function ApplicationsReviewPage( {params}) {

    const [applications, setApplications] = useState([]);
    
    useEffect(()=>{
        const fetchApplication = async()=>{
        const tmpApps = await apiService.get(`/job/get_jobapplications/${params.id}/`);	
        setApplications(tmpApps.data);
        };
        fetchApplication()	
    }, [])  
   

    // const updateStatus = (id, newStatus) => {
    //     setApplications()
    // };

    return (
    <div className="max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6">Review Applications</h1>

        {applications.length > 0 ? (
        <>
          <p className="text-lg text-gray-600 mb-6">
            {applications[0]?.job?.title} at{" "}
            <span className="font-semibold">
              {applications[0]?.job?.company_name}
            </span>
          </p>

          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-6 bg-white rounded-lg shadow border border-gray-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h2 className="text-xl font-semibold">{app.name}</h2>
                    <p className="text-gray-600 text-sm">{app.email}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      app.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <p className="text-gray-700 mb-3">{app.message}</p>
                <a
                  href={app.get_resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Resume
                </a>

                {app.status === "Pending" && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => updateStatus(app.id, "Accepted")}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, "Rejected")}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600">No applications found for this job.</p>
      )}
    </div>
    );
}
