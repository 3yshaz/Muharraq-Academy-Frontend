import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios' 


const Dashboard = ({ user }) => {

    const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://localhost:300/api/${user.role}/dashboard`, {
                headers: {
                    Authorization: `Berarer ${token}`
                }
            })
            setData(res.data)
        } catch (error) {
            console.error('Error Fetching dashboard data:', err)
            
        }
    }
    if (user?.role) fetchData()
}, [user])
if (!user) return <div className="dashboard">Loading user...</div>
if (!data) return <div className ="dashboard">Loading dashboard</div>


return (
    <div className="dashboard">
      <h2>Welcome, {user.fullName}</h2>
      <h3>Role: {user.role}</h3>

      {user.role === 'admin' ? (
        <div className="admin-section">
          <h4>Admin Dashboard</h4>
          {/* Admin-specific content */}
          <p>Total Riders: {data.totalRiders}</p>
          <p>Recent Registrations: {data.recentRegistrations}</p>
          {/* Add more admin features here */}
        </div>
      ) : (
        <div className="rider-section">
          <h4>Rider Dashboard</h4>
          {/* Rider-specific content */}
          <p>Age: {data.age}</p>
          <p>Weight: {data.weight}</p>
          <p>Upcoming Sessions: {data.sessions?.length}</p>
          {/* Add more rider features here */}
        </div>
      )}
    </div>
  );
};


export default Dashboard;
