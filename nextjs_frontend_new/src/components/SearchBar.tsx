"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/jobs/search?title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <form className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <input
        type="text"
        placeholder="Job title or keyword"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        className="w-full sm:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
