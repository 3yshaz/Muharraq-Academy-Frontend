import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../riderDashboard.css'
import axios from 'axios'

const RiderDashboard = () => {
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState('')
    const [packages, setPackages] = useState([])
    const [riderName, setRiderName ] = useState('')


    useEffect(() => {

        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        const user = localStorage.getItem('user')

        if (!token || role !== 'rider' || !user) {
            navigate('/login')
        } else {
            setUserRole(role)
            setUserRole(JSON.parse(user))
            setRiderName(JSON.parse(user).name)
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
            const user = JSON.parse(localStorage.getItem('user'))


            await axios.post (
                `http://localhost:3000/api/packages/${packageId}/book`,
            {
                riderId: user._id,
                packageId: packageId
            },

                {headers: { Authorization: `Bearer ${token}`}}
            )
            alert('Package booked successfully!')
            navigate('/rider-package', { state: { packageId}})
        } catch (error) {
            console.error('Booking failed:', error)
            alert('Failed to book package')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('userId')
        navigate('/')
    }

  return (

    <div className="rider-dashboard">
        
    
        <div className="sidebar">
            <h2>Welcome Rider</h2>
            <ul>
                <li onClick={() => navigate('/rider-profile')}>My Profile</li>
                <li onClick={() => navigate('/rider-attendance')}>Attendance</li>
                <li onClick={() => navigate('/rider-horses')}>Assigned Horses</li>
                <li onClick={() => navigate('/rider-package')}>My Package</li>
                <li onClick={handleLogout} className='logout'>Logout</li>
            </ul>
            </div>
            <div className='academy-info'>
            <img src='/images/Logo.jpg' alt='Academy Logo' className='academy-logo'/>
            <p className='academy-name'>Muharraq Equestrian Academy</p>
            </div>


            <div className='main-content'>
            <h1>Welcome, <span className='rider-name'>{riderName}</span> !</h1>
            <p>This is your dashboard. Here you can view your lessons, attendance, horses, and more.</p>

            {/* ✨Packages Section✨ */}
            <div className='packages-section'>
                <h2>Available Packages</h2>

                {packages.length === 0 ? (
                    <p>No packages available at the moment. </p>
                ): (
                <div className='packages-grid'>
                    {packages.map((pkg) => (
                        <div key={pkg._id} className='package-card'> 
                        <img src={pkg.imageUrl} alt={pkg.name} className='package-img' />
                        <h3>{pkg.name} </h3>
                        <p>{pkg.description}</p>
                        <p>Sessions: {pkg.sessionsPerMonth}</p>
                        <p>Price: {pkg.price} BD</p>
                        <button onClick={() => handleBookPackage(pkg._id)}>Book Now</button>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>  
    </div>
)
  
}

export default RiderDashboard;


