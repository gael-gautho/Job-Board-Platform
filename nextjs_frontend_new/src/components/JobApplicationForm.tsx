"use client"

import { useState, FormEvent, ChangeEvent } from "react";
import apiService from "@/libs/apiService";
import { toast } from "sonner";

type FormData = {
  fullname: string;
  email: string;
  message: string;
  resume: File | null;
};

export default function JobApplicationForm({
  jobId,
  initialHasApplied
}: {
  jobId: string;
  initialHasApplied: boolean
}) {
  const [form, setForm] = useState<FormData>({
    fullname: "",
    email: "",
    message: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [hasApplied, setHasApplied] = useState(initialHasApplied);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    const file = e.target.files?.[0];
    if (file) {
    setForm(prev => ({ ...prev, resume: file }));
    }
  
    
    // if (e.target.files && e.target.files.length > 0 ) {
    //   setForm(prev => ({ ...prev, resume: e.target.files[0] }));
    // }
  
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);


      const formData = new FormData();
      formData.append('name', form.fullname);
      formData.append('email', form.email);
      formData.append('message', form.message);
      if (form.resume) { formData.append('resume', form.resume); }

      const response = await apiService.fetch_proxy('POST', `/job/create_application/${jobId}`, formData,);

      if (response.status === 'created'){

        toast.success("Application submitted successfully!" );
        setHasApplied(true);

        setForm({
        fullname: "",
        email: "",
        message: "",
        resume: null,
      });

      } else {
        toast.error("Failed to submit application. Please try later.")
      }
    
      setIsSubmitting(false);

  };

  return (
    <div className="col-span-1">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-4 sticky top-20"
      >
        <h2 className="text-xl font-semibold mb-4">Apply for this job</h2>

        {submitStatus && (
          <div className={`p-3 rounded ${
            submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <div>
          <label htmlFor="fullname" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={form.fullname}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
            required
            disabled={hasApplied}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
            required
            disabled={hasApplied}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2"
            rows={4}
            required
            disabled={hasApplied}
          />
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm font-medium">Resume (PDF/DOC)</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="mt-1 block w-full"
            required={!hasApplied}
            disabled={hasApplied}
          />
        </div>

        {hasApplied ? (
          <p className="text-gray-600 font-medium">✅ Already applied</p>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 rounded-lg ${
              isSubmitting ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        )}
      </form>
    </div>
  );
}
