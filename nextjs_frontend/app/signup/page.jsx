import Link from 'next/link';


export default function SignupPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
				<form>
					<label className="block mb-2 font-medium">Full Name</label>
					<input
						type="text"
						placeholder="John Doe"
						className="w-full p-3 mb-4 border border-gray-300 rounded"
					/>

					<label className="block mb-2 font-medium">Email</label>
					<input
						type="email"
						placeholder="you@example.com"
						className="w-full p-3 mb-4 border border-gray-300 rounded"
					/>

					<label className="block mb-2 font-medium">Password</label>
					<input
						type="password"
						placeholder="••••••••"
						className="w-full p-3 mb-4 border border-gray-300 rounded"
					/>

					<label className="block mb-2 font-medium">Confirm Password</label>
					<input
						type="password"
						placeholder="••••••••"
						className="w-full p-3 mb-6 border border-gray-300 rounded"
					/>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
					>
						Sign Up
					</button>

					<p className="mt-4 text-center text-sm text-gray-600">
						Already have an account?{" "}
						<Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
