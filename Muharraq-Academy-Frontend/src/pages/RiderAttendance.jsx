import React, { useEffect, useState} from "react"
import axios from 'axios'
import '../css/riderAttendance.css'
import Footer from '../components/Footer'



const RiderAttendance = () => {
    const [attendance, setAttendance] = useState([])
    const [sessionLeft, setSessionLeft] = useState(null)

    useEffect(()=> {
        const fetchAttendance = async () => {
            try {
                const token = localStorage.getItem('token')
                const user = JSON.parse(localStorage.getItem('user'))
                const userId = user?._id

                if (!userId) {
                  console.error('User ID is missing  from localStorage')
                  alert('User not logged in properly')
                  return
                }

                const response = await axios.get(`/api/attendance/rider/${userId}`, {
                    headers: { Authorization: `Bearer ${token}`}
                })
                setAttendance(response.data)

                const userRes = await axios.get(`/api/users/${userId}`, {
                  headers: { Authorization: `Bearer ${token}`}
                })

                const userData = userRes.data

                const totalSessions = userData.selectedPackage?.sessionLeft || 0
                setSessionLeft(totalSessions )

            } catch (error) {
                console.error('Error fetching attendance record:', error)
                alert('Failed to load attendance data.')
            }
        }

        fetchAttendance()
    }, [])


    return (
     <div className="page-container">
      <h2>Your Attendance</h2>

      {sessionLeft !== null && (
        <p><strong>Sessions Left:</strong> {sessionLeft}</p>)}
      {attendance.length > 0 ? (
        <ul>
          {attendance.map((record, index) => (
            <li key={index}>
              Date: {new Date(record.createdAt).toLocaleDateString()}<br />
              Horse: {record.horse?.name || 'N/A'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No attendance records yet.</p>
      )}
      <Footer/>
    </div>
  )
}

export default RiderAttendance
