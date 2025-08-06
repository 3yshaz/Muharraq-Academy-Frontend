import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../adminDashboard.css';


const ManagePackages = () => {
    const [packages, setPackages ] = useState([])
    const [view, setView] = useState('manage')
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [sessions, setSessions] = useState('')
    const [description, setDesecription] = useState('')
    // const navigate = useNavigate()
    
    const token = localStorage.getItem('token')

    useEffect(() => {

      if( view === 'manage'){

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
        fetchPackages() }
    }, [view, token]) 

    const resetForm = () => {
      setTitle('')
      setPrice('')
      setSessions('')
      setDesecription('')
      setSelectedPackage(null)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this package?'))
            return 
        try {
            await axios.delete(`http://localhost:3000/api/packages/${id}`, {

                headers: { Authorization: `Bearer ${token}`}
            })
            setPackages(packages.filter((pkg) => pkg._id !== id))
        } catch (error) {
            console.error('Error deleting package:' , error)
            alert('Failed to delete package.')
        }
    }

    const handleEditClick = (pkg) => {
      setSelectedPackage(pkg)
      setTitle(pkg.name)
      setPrice(pkg.price)
      setSessions(pkg.session)
      setDesecription(pkg.description)
      setView('edit')
    }

    const handleAddClick = () => {
      resetForm()
      setView('add')
    }


    const handleAddSubmit = async (e) => {
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
          setView('manage')
      } catch (error) {
          console.error('Error adding package', error)
          alert('Filed to add package.')
          
      }
    }


    const handleEditSubmit = async (e) => {
      e.preventDefault()
      try {
          await axios.put(`http://localhost:3000/api/packages/${selectedPackage._id}`,{
              title,
              price,
              sessions,
              description
      }, {
          headers: {Authorization: `Bearer ${token}`}
      })
      alert('Package updated successfully')
      setView('manage')
      } catch (error) {
          console.error('error updating package:', error)
          alert('failed to update package.')
      }
    }

    return (
      <div className='managePack-container'>
        {view === 'manage' && (
        <>
        <h1>Manage Packages</h1>
        <div className='top-actionns'>
        <button onClick={handleAddClick}>Add New Package</button>
        </div>
        <table className='package-table'>
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
                <td>{pkg.name}</td>
                <td>{pkg.price}</td>
                <td>{pkg.session}</td>
                <td>{pkg.description}</td>
                <td>
                  <button onClick={() => handleEditClick(pkg)}>Edit</button>
                  <button onClick={() => handleDelete(pkg._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        </>
        )}

        {(view === 'add' || view === 'edit') && (
          <>
          <h2> {view === 'add' ? 'Add new package' : 'Edit Package'}</h2>
          <form onSubmit={view === 'add' ? handleAddSubmit : handleEditSubmit} className='form'>
            <label>Title:</label>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Price (BD):</label>
            <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} required />
            
            <label>Number of Sessions:</label>
            <input type='number' value={sessions} onChange={(e) => setSessions(e.target.value)} required />
            
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDesecription(e.target.value)} required />

              <button type='submit'> {view === 'add' ? 'Add Package' : 'Update Package'}</button>
              <button type='button' onClick={() => setView('manage')}>Cancel</button>
            
          </form>
          </>
        )}
        </div>
    )
}

export default ManagePackages