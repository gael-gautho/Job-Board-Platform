
import apiService from '@/libs/apiService';
import SearchBar from '@/components/SearchBar';
import JobList from '@/components/JobList';
import { Job } from '@/types';


export default async function Home() {

  const response = await apiService.get('/job/get_joblist/');
  const jobs: Job[] = response.data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Find your next opportunity
        </h2>
        <p className="text-gray-600 mb-8">
          Browse the latest job listings and apply in seconds.
        </p>
        <div className="max-w-3xl mx-auto">
          <SearchBar
          />
        </div>
      </section>

      {/* Jobs */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h3 className="text-2xl font-semibold mb-6">Recent Job Listings</h3>
        
        <div className="space-y-4">
        <JobList initialJobs={jobs} />
        </div>
      </section>
    </div>
  );
}
