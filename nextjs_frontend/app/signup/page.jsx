'use client'
import Link from 'next/link';
import { useState } from "react";
import apiService from '@/app/libs/apiService';


const SignupPage = () => {

	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
	const [messages, setMessages] = useState([]);


	const submitSignup = async () => {

		let tempMessages = [];

        if (!email.trim()) tempMessages.push({message: 'Your e-mail is missing', type:'error'});
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
			password2: password2
		}

		const response = await apiService.postWithoutToken('/signup/', JSON.stringify(formData));

		if (response.status === 201) {
			setMessages([{ message: 'The user is registered. Please check your email to activate your account.', type: 'success' }]);
					
		} else if (response.status === 400) {
			
			const tmpErrors = Object.values(response.data).flat().map((response) => {
				return {
				message: response,
				type: 'error'
			};
			})

			setMessages(tmpErrors);
		}

	}



	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
				<form
				onSubmit={(e) => {
							console.log("submit")
							e.preventDefault();     
							submitSignup();   }}
				>
					<label className="block mb-2 font-medium">Full Name</label>
					<input
						type="text"
						placeholder="John Doe"
						className="w-full p-3 mb-4 border border-gray-300 rounded"
						value={fullname}
						onChange={(e)=>{setFullname(e.target.value)}}
					/>

					<label className="block mb-2 font-medium">Email</label>
					<input
						type="email"
						placeholder="you@example.com"
						className="w-full p-3 mb-4 border border-gray-300 rounded"
						value={email}
						onChange={(e)=>{setEmail(e.target.value)}}
					/>

					<label className="block mb-2 font-medium">Password</label>
					<input
						type="password"
						placeholder="••••••••"
						className="w-full p-3 mb-4 border border-gray-300 rounded"
						value={password1}
						onChange={(e)=>{setPassword1(e.target.value)}}
					/>

					<label className="block mb-2 font-medium">Confirm Password</label>
					<input
						type="password"
						placeholder="••••••••"
						className="w-full p-3 mb-6 border border-gray-300 rounded"
						value={password2}
						onChange={(e)=>{setPassword2(e.target.value)}}
					/>

					{messages.length > 0 && (
						<div className="mb-4">
							{messages.map((msg, index) => (
								<div
									key={index}
									className={`p-3 mb-2 rounded ${
										msg.type === 'error'
											? 'bg-red-100 text-red-700'
											: 'bg-green-100 text-green-700'
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

export default SignupPage;
