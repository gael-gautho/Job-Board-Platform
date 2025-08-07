import Link from "next/link";
import { getUserId } from '@/app/libs/actions';


const Navbar = async () => {

    const userId = await getUserId();

    return (
        <nav className="p-4 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">JobBoard+</h1>
            <div className="space-x-6">
            {userId ? (
                <>            
                <Link href="/myfavorites" className="text-gray-700 hover:text-blue-600">My favorites</Link >
                <Link href="/myapplications" className="text-gray-700 hover:text-blue-600">My applications</Link >
                <Link href="/myprofile" className="text-gray-700 hover:text-blue-600">My profile</Link>

                </>                ) : (

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