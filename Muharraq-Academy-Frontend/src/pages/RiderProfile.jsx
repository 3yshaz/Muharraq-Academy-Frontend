import React, { useEffect, useState} from "react"
import axios from 'axios'
import '../riderDashboard.css'
import Footer from '../components/Footer'

import defaultUser from '../images/defaultUser.jpg'


const RiderProfile = () => {
    const [user, setRider] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/auth/profile/me', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
                })
                console.log("rider data:", response.data)
                setRider(response.data)
     
            } catch (error) {
                console.error('Failed to fetch profile:', error)
                
            }
        }
        fetchProfile()
    }, [])
    

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file)
            return alert('Please select an image first')

        const formData = new FormData()
        formData.append('profileImage', file)
        
        try {
            setUploading(true)
            const response = await axios.put('/api/auth/profile/image', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'}
            })

            setRider(response.data)

            alert('Image uploaded syccessfully')

        } catch (error) {
            console.error('Upload failed:', error)
            alert('Failed uploading image!')
        } finally {
            setUploading(false)
        }
    }

    if (!user) return <p> Loading... </p>

    return (
        <div className="profile-page">
        <div className = "profile-container">
            <h1 className="profile-title">Rider Profile</h1>

            <div className="profile-card">
                <div className="profile-img-wrapper">
                    <img src={user.profileImage ? `http://localhost:3000/images/${user.profileImage}` : defaultUser} alt="profile" className="profile-img" />
                </div>

                <input type="file" id='uploadInput' accept="image/*" onChange={handleImageUpload} style={{display: 'none'}} />


                <button onClick={() => document.getElementById('uploadInput').click()} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Change Photo'}
                </button>

                <div className="profile-info">
                    <h2>{user.name || "Name not available"}</h2>
                    <p>{user.email || "Email not available"}</p>

                </div>
            </div>



            <div className="current-package">
                <h3>Current Package</h3>
                {user.selectedPackage ? (
                    <>
                    <p><strong>Package:</strong>
                        {user.selectedPackage.packageId?.name || "name not available"}</p>
                    <p><strong>Sessions Left:</strong> {user.selectedPackage.sessionLeft}</p>
                    </>
                ): (
                    <p>No package booked</p>
                )}
            </div>
            </div>
            <Footer/>
    </div>
        
    )
}
export default RiderProfile