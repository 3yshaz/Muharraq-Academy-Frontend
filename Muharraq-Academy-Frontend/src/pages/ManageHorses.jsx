import React, { useState, useEffect} from "react";
import axios from "axios"
import '../css/manageHorses.css';
import Footer from "../components/Footer";



const ManageHorses = () => {
    const [horses, setHorses] = useState([])
    const [formData, setFormData ] = useState({
        name: '',
        breed: '',
        age: '',
        image: null
    })

    const [preview, setPreview] = useState(null)
    const token = localStorage.getItem('token')

    useEffect(() => {
        fetchHorses()
    }, [])

    const fetchHorses = async () => {
        try {
            const response = await axios.get('/api/horse', {
                headers: {Authorization: `Bearer ${token}`}
            })
            console.log('Fetched horses:', response.data)

            setHorses(response.data)            


        } catch (error) {
            console.error('Failed to fetch horses', error)
            // alert('Failed to load horses')
        }
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target 
        if (name === 'image') {
            setFormData((prev) => ({ ...prev, image: files[0] }))
            setPreview(URL.createObjectURL(files[0]))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value}))
        }
    }

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const data = new FormData()
        data.append('name', formData.name)
        data.append('breed', formData.breed)
        data.append('age', formData.age)

        if(formData.image) data.append('image', formData.image)

        await axios.post('/api/horse', data, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}
        })

        setFormData({ name: '', breed: '', age: '', image: null})
        setPreview(null)
        fetchHorses()
    } catch (error) {
        console.error('Error adding horse', error)
        alert('Failed to add horse')
    }
}

const handleDelete = async (id) => {
    try {
        await axios.delete(`/api/horse/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        setHorses(horses.filter((h) => h._id !== id))
    } catch (error) {
        console.error('Error deleting horse:', error)
        alert('Failed to delete horse')
        
    }
}

return (
    <div className="manage-horse-page">
    <div className="manage-horses-container">
        <h2>Manage Horses</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="horse-form">
            <input type='text' name='name' placeholder="Horse Name" value={formData.name} onChange={handleChange} required />
            <input type='text' name='breed' placeholder="Breed" value={formData.breed} onChange={handleChange}/>
            <input type='number' name='age' placeholder="Age" value={formData.age} onChange={handleChange}/>
            <input type='file' name='image' accept='image/*' onChange={handleChange} />
            {preview && <img src={preview} alt='Preview' className="preview-image" />}
            <button type='submit' className="btn-submit">Add Horse</button>
        </form>

        <div className="horse-cards-container">
            {horses.map((horse) => (
                <div key={horse._id} className="horse-card">
                    <img 
                    src={`http://localhost:3000/images/${horse.image || 'default-horse.jpg'}`}
                    alt={horse.name}
                    className="horse-image"
                    />
                    <div className="horse-info"> 
                        <h3>{horse.name}</h3>
                    <div className="horse-meta">
                        <p><b>Age:</b>{horse.age || 'N/A'}</p>
                        <p><b>Breed:</b>{horse.breed || 'N/A'}</p>
                    </div>
                        <button onClick={() => handleDelete(horse._id)} className="btn-delete">Delete</button>
                    </div>
                </div>


            ))}
        </div>
    </div>
    <Footer/>
    </div>
)
}
export default ManageHorses