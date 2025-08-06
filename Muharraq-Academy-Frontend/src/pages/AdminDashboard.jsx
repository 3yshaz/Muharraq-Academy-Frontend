import React from 'react';
import AdminSidebar from '../components/Sidebar';
import '../adminDashboard.css';

const AdminDashboard = () => {

    return (
        <div className='dashboard-container'>
            <AdminSidebar/>

            <div className='dashboard-content'>
            <h1>Welcome, Admin</h1>
            <div className='cards-container'>
                <div className='card'>Card 1</div>
                <div className='card'>Card 2</div>
                <div className='card'>Card 3</div>
                <div className='card'>Card 4</div>
            </div>


            </div>


      </div>
  );

}
export default AdminDashboard;
