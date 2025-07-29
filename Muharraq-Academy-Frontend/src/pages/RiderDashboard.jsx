import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles.css';

const RiderDashboard = () => {
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')

        if (!token || role !== 'rider') {
            navigate('/login')
        } else {
            setUserRole(role)
        }
    }, [navigate])

    const handleLougout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/login')
    }
  

  return (
    <div className="dashboard-container">
        <div className="dashboard-card">
            <h1>Welcome, Rider!</h1>
            <p>This is your dashboard. Here you can view your lessons, attendance, horses, and more.</p>

            <div className= "dashboard-links">
                <button onClick={() => navigate('/rider-profile')}>My Profile</button>
                <button onClick={() => navigate('/rider-attendance')}>Attendance</button>
                <button onClick={() => navigate('/rider-horses')}>Assigned Horses</button>
                <button onClick={() => navigate('/rider-package')}>My Package</button>
            </div>

            <button onClick={handleLougout} className= "logout-vutton">Logout</button>
            </div>
            </div>
  );
};

export default RiderDashboard;


