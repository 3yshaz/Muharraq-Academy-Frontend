import react, {use, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import '../css/manageRider.css'


const ManageRiders = () => {

    const [riders, setRiders] = useState([])
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchRiders = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth`, {
                headers: { Authorization: `Bearer ${token}`}

            })

            const onlyRiders = response.data.filter(user => user.role === 'rider')
            setRiders(onlyRiders)
        } catch (error) {
            console.error('Error fetching riders', error)
            alert('Failed to load riders.')
        }}
        fetchRiders()
    }, [token])

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this rider?'))
            return 
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            })

            setRiders(riders.filter(rider => rider.userId !== id))
        } catch (error) {
            console.error('Error deleting rider:', error)
            alert('Failed to delete rider')
        }
    }

    const handleEdit = (id) => {
        navigate(`${import.meta.env.VITE_BACKEND_URL}/admin/riders/edit/${id}`)
    }

    return (

    <div className='dashboard-container'>
        <h1>Manage Riders</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Weight</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {riders.map(rider => (
                    <tr key={rider.userId}>
                        <td>{rider.name}</td>
                        <td>{rider.email}</td>
                        <td>{rider.age}</td>
                        <td>{rider.weight}</td>
                        <td>{rider.contactNumber || '-'}</td>
                        <td>
                            <button onClick={() => handleEdit(rider.userId)}>Edit</button>
                            <button onClick={() => handleDelete(rider.userId)} style ={{marginLeft:'8px', color:'red'}}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Footer/>
    </div>
    
    )
}


export default ManageRiders