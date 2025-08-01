import Link from 'next/link';

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
				<h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
				<form>
					<input
						type="email"
						placeholder="Email"
						className="w-full p-3 mb-4 border border-gray-300 rounded"
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full p-3 mb-6 border border-gray-300 rounded"
					/>
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
