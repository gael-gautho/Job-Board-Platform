import Link from "next/link";
import { cookies } from "next/headers";
import { jwtDecode } from 'jwt-decode';
import { MyJwtPayload } from "@/types";


const Navbar = async () => {

    const refreshToken = (await cookies()).get('session_refresh_token')?.value;
    
    let userInfo = null;

    if (refreshToken) {
        userInfo = jwtDecode<MyJwtPayload>(refreshToken)
    }

    console.log(userInfo)
    
    return (
        <nav className="p-4 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">Let's Work</Link>
            <div className="space-x-6">
            {refreshToken ? (
                userInfo?.is_recruiter ? (
                <>            
                <Link href="/jobs/create" className="text-gray-700 hover:text-blue-600">Create Job</Link >
                <Link href="/jobs/myjobs" className="text-gray-700 hover:text-blue-600">My Jobs</Link >
                <Link href={`/profile/${userInfo?.user_id}`} className="text-gray-700 hover:text-blue-600">My profile</Link>
                </>  ) : (
                <>            
                <Link href="/myfavorites" className="text-gray-700 hover:text-blue-600">My favorites</Link >
                <Link href="/applications/my" className="text-gray-700 hover:text-blue-600">My applications</Link >
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