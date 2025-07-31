

const Navbar = async () => {

    return (
        <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">JobBoard+</h1>
          <div className="space-x-6">
            <a href="/myprofile" className="text-gray-700 hover:text-blue-600">Jobs</a>
            <a href="/myfavorites" className="text-gray-700 hover:text-blue-600">Employers</a>
            <a href="/login" className="text-gray-700 hover:text-blue-600">Login</a>
            <a href="/signup" className="text-gray-700 hover:text-blue-600">Signup</a>
            <a href="/myapplications" className="text-gray-700 hover:text-blue-600">My applications</a>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;