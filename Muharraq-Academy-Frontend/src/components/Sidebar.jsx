import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/riders', label: 'Riders Management' },
    { to: '/admin/horses', label: 'Horses Management' },
    { to: '/admin/packages', label: 'Packages Management' },
    { to: '/admin/attendance', label: 'Attendance Records' },
  ];

  return (
    <aside className="bg-[#B7905F] w-64 min-h-screen p-6 text-white flex flex-col">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `py-2 px-4 rounded hover:bg-[#87383B] transition ${
                isActive ? 'bg-[#87383B] font-semibold' : ''
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;