import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles.css'
import axios from 'axios'

const RiderDashboard = () => {
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState('')
    const [packages, setPackages] = useState([])


    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')

        if (!token || role !== 'rider') {
            navigate('/login')
        } else {
            setUserRole(role)
            fetchPackages()
        }

    }, [navigate])

    const fetchPackages = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/packages', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setPackages(response.data)

        } catch (error) {
            console.error('error fetching package:', error.response?.data || error.message)
        }
    }

    const handleBookPackage = async (packageId) => {
        try {
            const token = localStorage.getItem('token')
            await axios.post(
                `http://localhost:3000/api/packages/${packageId}/book`,
                {}, 
                {headers: { Authorization: `Bearer ${token}`}}
            )
            alert('Package booked successfully!')
            navigate('/rider-package')
        } catch (error) {
            console.error('Booking failed:', error)
            alert('Failed to book package')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('userId')
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

            <button onClick={handleLogout} className= "logout-button">Logout</button>
            </div>

            {/* ✨Packages Section✨ */}
            <div className='packages-section'>
                <h2>Available Packages</h2>

                {packages.length === 0 ? (
                    <p>No packages available at the moment. </p>
                ): (
                <div className='packages-grid'>
                    {packages.map((pkg) => (
                        <div key={pkg._id} className='package-card'> 
                        <h3>{pkg.name} </h3>
                        <p>{pkg.description}</p>
                        <p>{pkg.sessionsPerMonth}</p>
                        <p>Price: {pkg.price} BD</p>
                        <button onClick={() => handleBookPackage(pkg._id)}>Book Now</button>
                        </div>

                    ))}
                </div>
                )}
            </div>
        </div>  
);
  
};

export default RiderDashboard;


