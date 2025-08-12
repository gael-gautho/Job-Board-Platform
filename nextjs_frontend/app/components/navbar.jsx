import Link from "next/link";
import { cookies } from "next/headers";
import { jwtDecode } from 'jwt-decode';


const Navbar = async () => {

    const accessToken = cookies().get('session_access_token')?.value;
    let userInfo = null;

    console.log("Server cookies:", cookies().getAll()); // côté serveur


    if (accessToken) {
        userInfo = jwtDecode(accessToken)
    }

    console.log(userInfo)
    
    return (
        <nav className="p-4 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">JobBoard+</h1>
            <div className="space-x-6">
            {accessToken ? (
                userInfo.is_recruiter ? (
                <>            
                <Link href="/jobs/create" className="text-gray-700 hover:text-blue-600">Create Job</Link >
                <Link href="/myapplications" className="text-gray-700 hover:text-blue-600">My Jobs</Link >
                <Link href="/jobs/myjobs" className="text-gray-700 hover:text-blue-600">My profile</Link>
                </>  ) : (
                <>            
                <Link href="/myfavorites" className="text-gray-700 hover:text-blue-600">My favorites</Link >
                <Link href="/myapplications" className="text-gray-700 hover:text-blue-600">My applications</Link >
                <Link href="/myprofile" className="text-gray-700 hover:text-blue-600">My profile</Link>
                </>
                )       
            ) : (

                <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link >
                <Link href="/signup" className="text-gray-700 hover:text-blue-600">Signup</Link >
                </>
            )}
            
            
            
            </div>
        </div>
      </nav>
    )
}

export default Navbar;