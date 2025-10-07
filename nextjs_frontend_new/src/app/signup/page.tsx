"use client"

import Link from 'next/link';
import { useState, FormEvent } from "react";
import apiService from '@/libs/apiService';

// Type pour les messages d'erreur/succès
type Message = {
  message: string;
  type: 'error' | 'success';
};

export default function SignupPage() {
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecruiter, setIsRecruiter] = useState<boolean>(false); 


  const submitSignup = async (e: FormEvent) => {
    e.preventDefault();
    const tempMessages: Message[] = [];

    if (!email.trim()) tempMessages.push({ message: 'Your e-mail is missing', type: 'error' });
    if (!fullname.trim()) tempMessages.push({ message: 'Your name is missing', type: 'error' });
    if (!password1) tempMessages.push({ message: 'Your password is missing', type: 'error' });
    if (password1 !== password2) tempMessages.push({ message: 'The password does not match', type: 'error' });

    if (tempMessages.length > 0) {
      setMessages(tempMessages);
      return;
    }

    const formData = {
      name: fullname,
      email: email,
      password1: password1,
      password2: password2,
      is_recruiter: isRecruiter, 

    };

    try {
      const response = await apiService.postWithoutToken('/signup/', JSON.stringify(formData));
      if (response.status === 201) {
        setMessages([{ message: 'The user is registered. You can go ahead and login', type: 'success' }]);
      } else if (response.status === 400) {
        const tmpErrors: Message[] = Object.values(response.data)
          .flat()
          .map((error: any) => ({ message: error, type: 'error' }));
        setMessages(tmpErrors);
      }
    } catch (error) {
      setMessages([{ message: 'An error occurred. Please try again.', type: 'error' }]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
        <form onSubmit={submitSignup}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 border border-gray-300 rounded"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isRecruiter"
              className="mr-2"
              checked={isRecruiter}
              onChange={(e)=>setIsRecruiter(e.target.checked)}
            />
            <label htmlFor="isRecruiter" className="text-sm text-gray-700">
              I am a recruiter
            </label>
          </div>


          {messages.length > 0 && (
            <div className="mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 mb-2 rounded ${
                    msg.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
