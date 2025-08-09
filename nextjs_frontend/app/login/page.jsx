'use client'
import Link from 'next/link';
import { useState } from "react";
import apiService from '@/app/libs/apiService';
import { handleLogin } from '../libs/actions';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';


export default function LoginPage() {


	const router = useRouter()
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const [messages, setMessages] = useState([]);


	const submitLogin = async () => {
			
		let tempMessages = [];

        if (!email.trim()) tempMessages.push({message: 'Your e-mail is missing', type:'error'});
		if (!password) tempMessages.push({ message: 'Your password is missing', type: 'error' });
        if (tempMessages.length > 0) {
            setMessages(tempMessages);
            return;
        }
		
		const formData = {
			email: email,
			password: password
		}

		const response = await apiService.postWithoutToken('/login/', JSON.stringify(formData))
		console.log("------", response)

		if (response.data.access) {
			console.log(jwtDecode(response.data.access))
			handleLogin(jwtDecode(response.data.access).user_id, response.data.access, response.data.refresh);	
			setMessages([{ message: 'Login success ! You will be redirected ', type: 'success' }]);			
			router.push('/')

		} else {
			const tmpErrors = Object.values(response.data).map((response) => {
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
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
				<h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
				<form
					onSubmit={(e) => {
						console.log("submit")
						e.preventDefault();     
						submitLogin();   }}
				>
					<input
						type="email"
						placeholder="Email"
						className="w-full p-3 mb-4 border border-gray-300 rounded"
						value={email}
						onChange={(e)=>{setEmail(e.target.value)}}
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full p-3 mb-6 border border-gray-300 rounded"
						value={password}
						onChange={(e)=>{setPassword(e.target.value)}}
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
						className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
					>
						Log In
					</button>
				</form>


                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline">Sign up</Link>
                </p>

			</div>
		</div>
	);
}
