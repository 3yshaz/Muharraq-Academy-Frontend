import React from 'react';
import { useNavigate} from 'react-router-dom'
import '../Styles.css';

const AdminDashboard = () => {

    const navigate = useNavigate()

    return (
        <div className ="admin-dashboard">
            <h1>Welcome, Admin</h1>
        <div className ="cards-container"> 
        <div className ="card" onClick={()=> navigate('/admin/riders')}>
            <h2>Manage Riders</h2>
            <p>View and manage all registered riders.</p>
            </div>
            <div className ="card" onClick ={() => navigate('/admin/package')}>
                <h2>Manage Packages</h2>
                <p>Add, edit, or delete training packages.</p>
            </div>
            <div className= "card" onClick={() => navigate('/admin/horses')}>
                <h2>Manage Horses</h2>
                <p>View horse info and assignments.</p>
            </div>
            <div className ="card" onClick={() => navigate('/admin/attendance')}>
                <h2>Manage Attendance</h2>
                <p>Track attendance records for riders.</p>
            </div>
            </div>
            </div>
    )
}



export default AdminDashboard;
