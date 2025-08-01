import React, { useState, useEffect } from "react"
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom"

const EditPackage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [sessions, setSessions] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/packages/${id}`, {
                    headers: { Authorization: `Bearer ${token}`}
                })

                const pkg = res.data 
                setTitle(pkg.title)
                setPrice(pkg.price)
                setSessions(pkg.sessions)
                setDescription(pkg.description)
            } catch (error) {
                console.error('Error fetching package:', error)
                alert('Failed to load package')
            }

        }
        fetchPackage()
    }, [id, token])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:3000/api/packages/${id}`,{
                title,
                price,
                sessions,
                description
        }, {
            headers: {Authorization: `Bearer ${token}`}
        })
        alert('Package updated successfully')
        navigate('/admin/packages')
        } catch (error) {
            console.error('error updating package:', error)
            alert('failed to update package.')
        }
    }


    return (
        <div className="dashboard-container">
          <h2>Edit Package</h2>
          <form onSubmit={handleUpdate} className="form">
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
    
            <label>Price (BHD):</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
    
            <label>Number of Sessions:</label>
            <input type="number" value={sessions} onChange={(e) => setSessions(e.target.value)} required />
    
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
    
            <button type="submit">Update Package</button>
          </form>
        </div>
      )
    
    
}

export default EditPackage