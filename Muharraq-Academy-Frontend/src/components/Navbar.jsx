import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-[#87383B]">
        Muharraq Equestrian Academy
      </div>

      <div className="space-x-4">
        <Link to="/dashboard" className="text-[#B7905F] font-medium hover:text-[#87383B] transition">
          Dashboard
        </Link>
        <Link to="/logout" className="bg-[#87383B] text-white px-4 py-2 rounded-xl hover:bg-[#B7905F] transition">
          Logout
        </Link>
      </div>
    </nav>
  )
}

export default Navbar