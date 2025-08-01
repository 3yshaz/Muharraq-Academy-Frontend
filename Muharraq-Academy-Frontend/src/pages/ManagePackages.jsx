import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'


const ManagePackages = () => {
    const [packages, setPackages ] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/packages', {
                    headers: { Authorization: `Bearer ${token}`}
                })

                setPackages(response.data)
            } catch (error) {
                console.error('Error fetchinc packages: ', error)
                alert('Failed to load packages')
            }
        }
        fetchPackages
    }, [token])

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this package?'))
            return 
        try {
            await axios.delete(`http://localhost:3000/api/packages/${id}`, {

                headers: { Authorization: `Bearer ${token}`}
            })
            setPackages(packages.filter(pkg => pkg._id !== id))
        } catch (error) {
            console.error('Error deleting package:' , error)
            alert('Failed to delete package.')
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/packages/edit/${id}`)
    }

    const handleAdd = () => {
        navigate('/admin/packages/new')
    }

    return (
        <div className="dashboard-container">
        <h1>Manage Packages</h1>
        <button onClick={handleAdd} style={{ marginBottom: '20px' }}>Add New Package</button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Sessions</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(pkg => (
              <tr key={pkg._id}>
                <td>{pkg.title}</td>
                <td>{pkg.price}</td>
                <td>{pkg.sessions}</td>
                <td>{pkg.description}</td>
                <td>
                  <button onClick={() => handleEdit(pkg._id)}>Edit</button>
                  <button onClick={() => handleDelete(pkg._id)} style={{marginLeft:'8px',color:'red'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    )
}