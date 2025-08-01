import React, { use, useState} from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddPackage = () => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [sessions, setSessions] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3000/api/packages', {
                title,
                price,
                sessions,
                description
            }, {
                headers: { Authorization: `Bearer ${token}`}
            })
            alert('Package added successfully!')
            navigate('/admin/package')
        } catch (error) {
            console.error('Error adding package')
            alert('Filed to add package.')
            
        }
    }

    return (
        <div className="dashboard-container">
          <h2>Add New Package</h2>
          <form onSubmit={handleSubmit} className="form">
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
    
            <label>Price (BHD):</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
    
            <label>Number of Sessions:</label>
            <input type="number" value={sessions} onChange={(e) => setSessions(e.target.value)} required />
    
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
    
            <button type="submit">Add Package</button>
          </form>
        </div>
      )

}

export default AddPackage