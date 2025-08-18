import React, { useEffect, useState} from "react"
import axios from 'axios'
import Footer from '../components/Footer'
import '../css/riderPacks.css'




const RiderPackage = () => {
    
    const [bookedPackages, setBookedPackages] = useState([])

    useEffect(() => {
        const fetchBookedPackage = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return
                const response = await axios.get('http://localhost:3000/api/booking/my/booking', {
                    headers: { Authorization: `Bearer ${token}`}
                })
                console.log('booking:', response.data)
                setBookedPackages(response.data)

            } catch (error) {
                console.error('Failed to fetch booked packages:', error)
            }
        }
        fetchBookedPackage()
    }, [])
    return (

        <div className="packages-page">
        <h2 className="booked-title">Your Booked Packages</h2>
        {bookedPackages.length === 0 ? (
          <p>You have not booked any packages yet.</p>
        ) : (
          <div className="booked-packages-grid">
            {bookedPackages.map((booking) => (
              <div key={booking._id} className="booked-package-card">
                <img src={booking.package.imageUrl} alt={booking.package.name} className="booked-package-img" />
                <h3>{booking.package.name}</h3>
                <p>Sessions: {booking.package.sessionsPerMonth}</p>
                <p>Price: {booking.package.price} BD</p>
                <span className={`status-style ${booking.status}`}> 
                  {booking.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}
        <Footer/>
      </div>
    
    )
}
export default RiderPackage