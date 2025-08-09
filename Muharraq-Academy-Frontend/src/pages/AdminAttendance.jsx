import React, { useState, useEffect} from "react"
import axios from "axios"
import Footer from '../components/Footer'


const AdminRiderAttendance = () =>{
    const [riders, setRiders] = useState([])
    const [horses, setHorses] = useState([])
    const [selectedRider, setSelectedRider] = useState('')
    const [selectedHorse, setSelectedHorse] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token')

                const ridersResponse = await axios.get('/api/auth/riders', {
                    headers: { Authorization: `Bearer ${token}`}
                })
                const horsesResponse = await axios.get('/api/horse', {
                    headers: { Authorization: `Bearer ${token}`}
                })


                setRiders(ridersResponse.data)
                setHorses(horsesResponse.data)
            } catch (error) {
                console.error('Error fetching riders/horses', error.response ? error.response.data : error.message)
                alert('Failed to load riders or horses')
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedRider || !selectedHorse) {
            alert('Please select both rider and horse.')
            return
        }

        try {
            const token = localStorage.getItem('token')

            const response = await axios.post('http://localhost:3000/api/attendance', {
                riderId: selectedRider,
                horseId: selectedHorse
            }, { headers: {Authorization: `Bearer ${token}`}})
            alert('Attendance marked successfully')
        } catch (error) {
            console.error('error marking attendance', error.message)
            alert('failed to mark attendance')
            
        }
    }

    return (
        <div className="page-container">
            <h2>Mark Rider Attendance</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rider:</label>
                    <select
                    value={selectedRider}
                    onChange={(e) => setSelectedRider(e.target.value)}
                    >
                        <option value=''>--select rider--</option>
                        {riders.map((rider) => (
                            <option key= {rider._id} value={rider._id}>
                                {rider.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Horse:</label>
                    <select
                    value={selectedHorse}
                    onChange={(e) => setSelectedHorse(e.target.value)}
                    >
                        <option value=''>--select horse--</option>
                        {horses.map((horse) => (
                            <option key={horse._id} value={horse._id}>
                                {horse.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type='submit'> Mark Attendance</button>
            </form>
            <Footer />
        </div>
    )
}

export default AdminRiderAttendance
