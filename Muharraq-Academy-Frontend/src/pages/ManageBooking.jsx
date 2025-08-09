import React, { useEffect, useState} from 'react'
import axios from 'axios'

const AdminPendingBookings = () => {
    const [pending, setPending] = useState([])

    useEffect(() => {
        fetchPendingBookings()
    }, [])
        
    const fetchPendingBookings = async () => {
            try {
            const res = await axios.get('http://localhost:3000/api/booking/pending', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            setPending(res.data)
        } catch (error) {
            console.error('Error fetching pending booking', error)
        }
    }

    const handleConfirm = async (bookingId) => {
        try {
            await axios.patch(`http://localhost:3000/api/booking/${bookingId}/confirm`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            setPending(pending.filter(b => b._id !== bookingId))
        } catch (error) {
            console.error('Failed to confirm booking', error)
        }
    }

    return (
        <div className='pending-bookings'>
            <h2>Pending Rider Bookings</h2>
            {pending.length === 0 ? (
                <p>No pending booking.</p>
            ): (
                <table>
                    <thead>
                        <tr>
                            <th>Rider Name</th>
                            <th>Package</th>
                            <th>Price</th>
                            <th>Booked At</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pending.map((b) => (
                            <tr key={b._id}>
                                <td>{b.user?.name}</td>
                                <td>{b.package?.name}</td>
                                <td>{b.package?.price} BD</td>
                                <td>{new Date(b.bookedAt).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleConfirm(b._id)}>Confirm</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            
            )}
        </div>
    )
 
}

export default AdminPendingBookings