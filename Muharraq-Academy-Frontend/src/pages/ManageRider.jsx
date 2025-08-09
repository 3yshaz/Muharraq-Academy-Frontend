import react, {use, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'


const ManageRiders = () => {

    const [riders, setRiders] = useState([])
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchRiders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/auth', {
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
            await axios.delete(`http://localhost:3000/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}`}
            })

            setRiders(riders.filter(rider => rider.userId !== id))
        } catch (error) {
            console.error('Error deleting rider:', error)
            alert('Failed to delete rider')
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/riders/edit/${id}`)
    }

    return (
        <>
        <AdminNavbar />

    <div className='dashboard-container'>
        <h1>Manage Riders</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {riders.map(rider => (
                    <tr key={rider.userId}>
                        <td>{rider.name}</td>
                        <td>{rider.email}</td>
                        <td>{rider.phone || '-'}</td>
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
    </>
    )
}


export default ManageRiders