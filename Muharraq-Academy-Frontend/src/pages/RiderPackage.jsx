import React, { useEffect, useState} from "react"
import axios from 'axios'



const RiderPackage = () => {
    
    const [bookedPackages, setBookedPackages] = useState([])

    useEffect(() => {
        const fetchBookedPackage = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:3000/api/packages/my/booking', {
                    headers: { Authorization: `Bearer ${token}`}
                })
                console.log('packages:', response.data)
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
            {bookedPackages.map((pkg) => (
              <div key={pkg._id} className="booked-package-card">
                <img src={pkg.imageUrl} alt={pkg.name} className="booked-package-img" />
                <h3>{pkg.name}</h3>
                <p>{pkg.description}</p>
                <p>Sessions: {pkg.sessionsPerMonth}</p>
                <p>Price: {pkg.price} BD</p>
              </div>
            ))}
          </div>
        )}
      </div>
    
    )
}
export default RiderPackage