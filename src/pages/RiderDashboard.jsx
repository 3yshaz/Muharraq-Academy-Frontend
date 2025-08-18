import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/riderDashboard.css'
import Footer from '../components/Footer'
import axios from 'axios'

const RiderDashboard = () => {
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState('')
    const [userData, setUserData ] = useState('')
    const [packages, setPackages] = useState([])
    const [bookings, setBookings] = useState([])


    useEffect(() => {

        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        const user = localStorage.getItem('user')

        if (!token || role !== 'rider' || !user) {
            navigate('/login')
            return
        } else {
            setUserRole(role)
            setUserData(JSON.parse(user))

            fetchPackages(token)
            fetchUserBookings(token)
        }

    }, [navigate])

    const fetchPackages = async (token) => {
        try {
            const response = await axios.get('http://localhost:3000/api/packages', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setPackages(response.data)

        } catch (error) {
            console.error('error fetching package:', error.response?.data || error.message)
        }
    }

    const fetchUserBookings = async (token) => {
        try {
            const response = await axios.get('http://localhost:3000/api/booking/my/booking', {
                headers: {Authorization: `Bearer ${token}`}
            })
            setBookings(response.data)
        } catch (error) {
            console.error('Failed to fetch booked package:', error.response?.data || error.message)
            
        }
    }

    const handleBookPackage = async (packageId) => {
        if (!userData) return


        const hasBooked = bookings.some(
            (booking) => booking.package._id === packageId && booking.status !== 'expired'
        )

        if (hasBooked ) {
            alert('You have already booked this package.')
            return
        }

        try {
           
            const token = localStorage.getItem('token')

            await axios.post(
                `http://localhost:3000/api/booking/book`,
            { packageId },
            {headers: { Authorization: `Bearer ${token}`}}
            )
            alert('Package booked successfully!')
            fetchUserBookings(userData._id, token)
        } catch (error) {
            console.error('Booking failed:', error.response?.data || error.message)
            alert('Failed to book package')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('user')
        navigate('/')
    }

  return (

    <div className="rider-dashboard">
        
    
        <div className="sidebar">
            <h2>Rider Panel</h2>
            <ul>
                <li onClick={() => navigate('/rider-profile')}>My Profile</li>
                <li onClick={() => navigate('/rider-attendance')}>Attendance</li>
                <li onClick={() => navigate('/rider-horses')}>Assigned Horses</li>
                <li onClick={() => navigate('/rider-package')}>My Package</li>
                <li onClick={() => navigate('/about')}>About</li>
                <li onClick={handleLogout} className='logout'>Logout</li>
            </ul>
            </div>
            <div className='academy-info'>
            <img src='/images/Logo.jpg' alt='Academy Logo' className='academy-logo'/>
            <p className='academy-name'>Muharraq Equestrian Academy</p>
            </div>


            <div className='main-content'>
            <h1>Welcome, <span className='rider-name'>{userData?.name || ''}</span> !</h1>
            <p>This is your dashboard. Here you can view your lessons, attendance, horses, and more.</p>

            <div className='packages-section'>
                <h2>Available Packages</h2>

                {packages.length === 0 ? (
                    <p>No packages available at the moment. </p>
                ): (
                <div className='packages-grid'>
                    {packages.map((pkg) => {

                        const booking = bookings.find(
                            (b) => b.package._id === pkg._id && b.status !== 'expired'
                        )

                        return (
                    
                        <div key={pkg._id} className='package-card'> 
                        <img src={pkg.imageUrl} alt={pkg.name} className='package-img' />
                        <h3>{pkg.name} </h3>
                        <p>{pkg.description}</p>
                        <p>Sessions: {pkg.sessionsPerMonth}</p>
                        <p>Price: {pkg.price} BD</p>
                        {booking ? (
                            <button disabled>
                                {booking.status === 'pending' ? 'Pending Approval' : 'Active'}
                            </button>
                        ): (

                            <button onClick={() => handleBookPackage(pkg._id)}>Book Now</button>
                        )}
                        </div>
                    ) })}
                </div>
                )}
                <Footer/>
            </div>

        </div>  
        
    </div>
)
  
}

export default RiderDashboard;


