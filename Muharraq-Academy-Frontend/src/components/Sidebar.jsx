import React from 'react';
import { Link } from 'react-router-dom';
import '../adminDashboard.css'

const AdminSidebar = () => {

  const links = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/riders', label: 'Riders Management' },
    { to: '/admin/horses', label: 'Horses Management' },
    { to: '/admin/packages', label: 'Packages Management' },
    { to: '/admin/attendance', label: 'Attendance Records' },
  ];

  return (
    <div className='admin-sidebar'>

      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className='sidebar-links'>
        <li><Link to= '/admin/dashboard'>Dashboard</Link></li>
        <li><Link to= '/admin/manage-riders'>Manage Riders</Link></li>
        <li><Link to= '/admin/manage-packages'>Manage Packages</Link></li>
        <li><Link to= '/admin/manage-attendance'>Manage Attendance</Link></li>
        <li><Link to= '/admin/manage-horses'>Manage Horses</Link></li>
        <li><Link to= '/admin/manage-trainers'>Manage Trainers</Link></li>
      </ul>
     
      </div>
  );
};

export default AdminSidebar;