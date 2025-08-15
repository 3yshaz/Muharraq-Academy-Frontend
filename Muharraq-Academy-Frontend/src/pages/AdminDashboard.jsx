import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/Sidebar';
import '../css/adminDashboard.css';
import Footer from '../components/Footer'


const AdminDashboard = () => {
    const [user, setUser] = useState('')


    useEffect(() => {
        const user = localStorage.getItem('user')
        setUser(JSON.parse(user).name)

    })

    return (
        <div className='dashboard-container'>
            <AdminSidebar/>

            <div className='dashboard-content'>
            <h1>Welcome, <span className='rider-name'>{user}</span> !</h1>
            <p>This is your dashboard. Here you can add packages, register horses, mark attendance, and more.</p>
            </div>
            <div className='academy-info'>
            <img src='/images/Logo.jpg' alt='Academy Logo' className='academy-logo'/>
            <p className='academy-name'>Muharraq Equestrian Academy</p>
            </div>        
            <div className='cards-container'>
                {/* <div className='card'>Card 1</div>
                <div className='card'>Card 2</div>
                <div className='card'>Card 3</div>
                <div className='card'>Card 4</div> */}
            </div>

            <Footer />


      </div>
  );

}
export default AdminDashboard;
