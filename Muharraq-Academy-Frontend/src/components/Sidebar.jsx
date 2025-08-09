import React from 'react';
import { Link } from 'react-router-dom';
import '../adminDashboard.css'

const AdminSidebar = () => {

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/manage-riders', label: 'Manage Riders' },
    { to: '/admin/manage-packages', label: 'Manage Packages' },
    { to: '/admin/manage-bookings', label: 'Manage Bookings' },
    { to: '/admin/manage-attendance', label: 'Manage Attendance' },
    { to: '/admin/manage-horses', label: 'Manage Horses' },
    { to: '/admin/manage-trainers', label: 'Manage Trainers' },

  ];

  return (
    <div className='admin-sidebar'>

      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className='sidebar-links'>
        {links.map(link => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
     
      </div>
  );
};

export default AdminSidebar;