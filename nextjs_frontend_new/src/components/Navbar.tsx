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
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 flex flex-wrap justify-between items-center gap-x-4 gap-y-3">
            <Link href="/" className="text-xl font-bold text-blue-600">Let&apos;s Work</Link>
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2">
            {refreshToken ? (
                userInfo?.is_recruiter ? (
                <>            
                <Link href="/jobs/create" className="text-sm sm:text-base text-gray-700 hover:text-blue-600">Create Job</Link >
                <Link href="/jobs/myjobs" className="text-sm sm:text-base text-gray-700 hover:text-blue-600">My Jobs</Link >
                <Link href={`/profile/${userInfo?.user_id}`} className="text-sm sm:text-base text-gray-700 hover:text-blue-600">My profile</Link>
                </>  ) : (
                <>            
                <Link href="/jobs/myfavorites" className="text-sm sm:text-base text-gray-700 hover:text-blue-600">My favorites</Link >
                <Link href="/applications/my" className="text-sm sm:text-base text-gray-700 hover:text-blue-600">My applications</Link >
                <Link href={`/profile/${userInfo?.user_id}`} className="text-sm sm:text-base text-gray-700 hover:text-blue-600">My profile</Link>
                </>
                )       
            ) : (

                <>
                <Link href="/login" className="text-sm sm:text-base text-gray-700 hover:text-blue-600">Login</Link >
                <Link href="/signup" className="text-sm sm:text-base text-gray-700 hover:text-blue-600">Signup</Link >
                </>
            )}
            </div>
        </div>
      </nav>
    )
}

export default Navbar;
