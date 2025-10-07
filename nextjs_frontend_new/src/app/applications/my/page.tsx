import apiService from "@/libs/apiService";
import { Application } from "@/types";
import Link from "next/link";


export default async function MyApplicationsPage() {
    
    const tmpApplications = await apiService.get(`/job/get_myapplications/`)	
    const applications : Application[] = tmpApplications.data
    console.log(applications)

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">My Applications</h1>
            {applications.length === 0 && <p>No Applications </p>}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">Job Title</th>
                            <th className="p-3">Company</th>
                            <th className="p-3">Date Applied</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">View Job</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{app.job.title}</td>
                                <td className="p-3">{app.job.company_name}</td>
                                <td className="p-3">{app.created_at}</td>
                                <td className={`p-3 font-semibold ${
                                    app.status === "Accepted"
                                        ? "text-green-600"
                                        : app.status === "Rejected"
                                        ? "text-red-600"
                                        : "text-yellow-600"
                                }`}>
                                    {app.status}
                                </td>
                                <td className="p-3">
                                    <Link href={`/jobdetail/${app.job.id}`} className="text-blue-600 underline hover:text-blue-800">
                                        View
                                    </Link> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
